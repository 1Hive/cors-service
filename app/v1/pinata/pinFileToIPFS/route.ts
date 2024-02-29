import { NextRequest, NextResponse } from "next/server";
import pinataSDK from "@pinata/sdk";
import { env } from "~/env.mjs";
import { Stream } from "stream";

const pinata = new pinataSDK({ pinataJWTKey: env.PINATA_JWT });

async function parseMultipartFormData(request: NextRequest) {
  const body = request.body;

  if (!body) {
    return NextResponse.json({ error: "No form data found" }, { status: 400 });
  }
  console.log(body);

  const reader = body.getReader();

  let formDataString = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    formDataString += new TextDecoder().decode(value);
  }

  console.log(formDataString);

  const boundary = formDataString.split("\n")[0].trim();

  const parts = formDataString.split(boundary);
  const formData = new FormData();

  parts.forEach((part) => {
    if (part.includes("filename")) {
      const nameMatch = part.match(/name="([^"]+)"/);
      const filenameMatch = part.match(/filename="([^"]+)"/);
      const contentTypeMatch = part.match(/Content-Type: ([^\s]+)/);

      if (nameMatch && filenameMatch && contentTypeMatch) {
        const name = nameMatch[1];
        const filename = filenameMatch[1];
        const contentType = contentTypeMatch[1];
        let content = part.split("\n").slice(4, -2).join("\n"); // Extracting content

        const blob = new Blob([content], { type: contentType });
        formData.append(name, blob, filename);
      }
    }
  });

  return formData;
}

export async function POST(request: NextRequest) {
  try {
    // Parse the string into FormData
    // const formData = await parseMultipartFormData(request);
    const formData = await request.formData();

    // Get the file from FormData
    const file = formData.get("file");

    console.log("File:", file);

    let f = formData.get("file") as File | null | undefined;
    if (!f) {
      return NextResponse.json({ error: "No file found" }, { status: 400 });
    }
    const streamReads = Stream.Readable.from(f.stream());

    const resPinata = await pinata.pinFileToIPFS(streamReads, {
      pinataMetadata: { name: f.name },
    });
    return NextResponse.json(resPinata, { status: 200 });
    // return NextResponse.json({ result: formDataString }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
