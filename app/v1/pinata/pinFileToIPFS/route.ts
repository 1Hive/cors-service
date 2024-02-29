import { NextRequest, NextResponse } from "next/server";
import pinataSDK from "@pinata/sdk";
import { env } from "~/env.mjs";
import { Stream } from "stream";
import { NextApiResponse } from "next";

const pinata = new pinataSDK({ pinataJWTKey: env.PINATA_JWT });

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    let f = formData.get("file") as File | null | undefined;
    if (!f) {
      return NextResponse.json({ error: "No file found" }, { status: 400 });
    }
    const streamReads = Stream.Readable.from(f.stream());

    const resPinata = await pinata.pinFileToIPFS(streamReads, {
      pinataMetadata: { name: f.name },
    });
    return NextResponse.json(resPinata, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
