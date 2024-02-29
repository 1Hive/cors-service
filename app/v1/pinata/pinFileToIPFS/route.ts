import { NextResponse } from "next/server";
import pinataSDK from "@pinata/sdk";
import { env } from "~/env.mjs";
import { Stream } from "stream";

export const runtime = "nodejs";

const pinata = new pinataSDK({ pinataJWTKey: env.PINATA_JWT });

async function parseMultipartFormData(request: Request) {
  const blobMulti = await request.blob();

  console.log("Blob:", blobMulti);
  const formDataString = await blobMulti.text();
  console.log("Text:", formDataString);
  console.log(formDataString);

  const boundary = formDataString.split("\n")[0].trim();

  const parts = formDataString.split(boundary);
  // const formData = new FormData();

  let name = undefined;
  let filename = undefined;
  let contentType = undefined;
  let content = undefined;
  let blob: Blob | undefined = undefined;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.includes("filename")) {
      const nameMatch = part.match(/name="([^"]+)"/);
      const filenameMatch = part.match(/filename="([^"]+)"/);
      const contentTypeMatch = part.match(/Content-Type: ([^\s]+)/);

      if (nameMatch && filenameMatch && contentTypeMatch) {
        name = nameMatch[1];
        filename = filenameMatch[1];
        contentType = contentTypeMatch[1];
        content = part.split("\n").slice(4, -2).join("\n"); // Extracting content

        blob = new Blob([content], { type: contentType });
        // formData.append(name, blob, filename);
      }
    }
  }

  return { name, filename, contentType, content, blob };
}
export async function POST(request: Request) {
  const { filename, content } = await parseMultipartFormData(request);

  if (!content) {
    return NextResponse.json(
      { error: "No file found in request" },
      { status: 400 }
    );
  }
  if (!filename) {
    return NextResponse.json(
      { error: "No filename found in request" },
      { status: 400 }
    );
  }
  const resPinata = await pinata.pinFileToIPFS(Stream.Readable.from(content), {
    pinataMetadata: { name: filename },
  });

  return NextResponse.json(resPinata, { status: 200 });
}
