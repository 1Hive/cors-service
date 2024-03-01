import { NextResponse } from "next/server";
import pinataSDK from "@pinata/sdk";
import { env } from "~/env.mjs";
import { Stream } from "stream";

export const runtime = "nodejs";

const pinata = new pinataSDK({ pinataJWTKey: env.PINATA_JWT });

async function parseMultipartFormData(request: Request) {
  const blobMulti = await request.blob();

  console.log("Blob:", blobMulti);
  let formDataString = await blobMulti.text();

  //   formDataString =
  //     '------WebKitFormBoundary2oXH2A8TNB4oBEIR\n\
  // Content-Disposition: form-data; name="file"; filename="Covenant.md"\n\
  // Content-Type: text/markdown\n\
  // \n\
  // Our vision is to create abundance for every human.\n\
  // ------WebKitFormBoundary2oXH2A8TNB4oBEIR--';

  // formDataString =
  //   '------WebKitFormBoundary0HArAFcbFXjWZWie\r\nContent-Disposition: form-data; name="file"; filename="Covenant.md"\r\nContent-Type: text/markdown\r\n\r\n\r\n------WebKitFormBoundary0HArAFcbFXjWZWie--\r\n';

  console.log("Text:", formDataString);
  console.log(formDataString);

  const boundary = formDataString.split("\n")[0].trim();

  console.log("Boundary:", boundary);

  const parts = formDataString.split(boundary);

  console.log("Parts:", parts);
  // const d = parts.join("").split("\r\n");
  // console.log("D:", d);
  // const formData = new FormData();

  let name = undefined;
  let filename = undefined;
  let contentType = undefined;
  let content = undefined;
  let blob: Blob | undefined = undefined;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.includes("filename")) {
      // console.log("PartFor:", part);
      const nameMatch = part.match(/name="([^"]+)"/);
      const filenameMatch = part.match(/filename="([^"]+)"/);
      const contentTypeMatch = part.match(/Content-Type: ([^\s]+)/);
      // console.log("Name:", nameMatch);
      // console.log("Filename:", filenameMatch);

      if (nameMatch && filenameMatch) {
        name = nameMatch[1];
        filename = filenameMatch[1];
      }
      if (contentTypeMatch) {
        contentType = contentTypeMatch[1];
        console.log("Content-Type:", contentType);
        const newLocal = part.split("\n");
        // console.log("newLocal:", newLocal);
        const cont = newLocal.slice(4).filter((c) => c != "" && c != "\r");
        console.log("Cont:", cont);
        content = cont.join("\n"); // Extracting content
        // console.log("ContentInner:", content);
        blob = new Blob([content], { type: contentType });
      }
    }
  }

  return { name, filename, contentType, content, blob };
}
export async function POST(request: Request) {
  const { filename, content } = await parseMultipartFormData(request);

  // console.log("Content:", content);
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
