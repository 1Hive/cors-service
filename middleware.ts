// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";
import { createEdgeRouter } from "next-connect";

const app = createEdgeRouter<NextRequest, NextFetchEvent>();

app.use(async (request, event, next) => {
  // logging request example
  // console.log(`Middleware: ${request.method} ${request.url}`);
  return next();
});

app.all(() => {
  // default if none of the above matches
  const res = NextResponse.next();
  // add the CORS headers to the response
  res.headers.append("Access-Control-Allow-Credentials", "true");
  res.headers.append("Access-Control-Allow-Origin", "*"); // replace this your actual origin
  res.headers.append(
    "Access-Control-Allow-Methods",
    "GET,DELETE,PATCH,POST,PUT"
  );
  res.headers.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  // console.log("Cors added via Middleware");
  return res;
});

export function middleware(request: NextRequest, event: NextFetchEvent) {
  return app.run(request, event);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/(.*)",
  ],
};
