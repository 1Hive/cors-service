import { NextRequest } from "next/server";
import pinataSDK from "@pinata/sdk";
import { env } from "~/env.mjs";
import { Stream } from "stream";

const pinata = new pinataSDK({ pinataJWTKey: env.PINATA_JWT });

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    let f = formData.get("file") as File | null | undefined;

    if (!f) {
      return Response.json({ error: "No file found" }, { status: 400 });
    }
    const streamReads = Stream.Readable.from(f.stream());

    const response = await pinata.pinFileToIPFS(streamReads, {
      pinataMetadata: { name: f.name },
    });

    return Response.json(response, {
      status: 200,
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
