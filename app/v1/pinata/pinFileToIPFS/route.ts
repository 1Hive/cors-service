import { NextRequest, NextResponse } from "next/server";
import pinataSDK from "@pinata/sdk";
import { env } from "~/env.mjs";
import { Stream } from "stream";

const pinata = new pinataSDK({ pinataJWTKey: env.PINATA_JWT });

export async function POST(request: NextRequest) {
  // try {
  const formData = request.body;

  if (!formData) {
    return NextResponse.json({ error: "No form data found" }, { status: 400 });
  }
  console.log(formData);

  const reader = formData.getReader();

  let result = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += new TextDecoder().decode(value);
  }

  console.log(result);

  // const streamReads = Stream.Readable.from(formData);
  // const formData = await request.formData();

  // let f = formData.get("file") as File | null | undefined;
  // if (!f) {
  // return NextResponse.json({ error: "No file found" }, { status: 400 });
  // }
  // const streamReads = Stream.Readable.from(f.stream());

  // const resPinata = await pinata.pinFileToIPFS(streamReads, {
  // pinataMetadata: { name: f.name },
  // });
  // return NextResponse.json(resPinata, { status: 200 });
  return NextResponse.json({}, { status: 200 });
  // } catch (error) {
  // console.error(error);
  // return NextResponse.json({ error }, { status: 500 });
  // }
}
