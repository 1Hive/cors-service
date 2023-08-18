import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, pathname } = new URL(request.url);
  // console.log(request);
  let urlToFetch = searchParams.get("url");
  if (!urlToFetch) {
    urlToFetch = pathname.split("/cors/")[1];
    if (!urlToFetch) {
      return new Response("url query param not provided", {
        status: 400,
      });
    }
  }

  if (!urlToFetch?.startsWith("http")) {
    urlToFetch = `https://${urlToFetch}`;
  }

  console.log(urlToFetch);

  const res = await fetch(urlToFetch);
  const product = await res.text();

  return new Response(`${product}`, {
    status: 200,
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    //   "Access-Control-Allow-Headers": "Content-Type, Authorization",
    // },
  });
}
