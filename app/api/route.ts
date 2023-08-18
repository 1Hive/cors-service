import { NextRequest, NextResponse } from "next/server";

import { env } from "~/env.mjs";

export async function GET(request: NextRequest) {
  return new NextResponse(env.VERSION ?? "0.0.0");
}
