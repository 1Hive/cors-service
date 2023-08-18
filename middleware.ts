// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";
import { createEdgeRouter } from "next-connect";

const app = createEdgeRouter<NextRequest, NextFetchEvent>();

app.use(async (request, event, next) => {
  // logging request example
  console.log(`${request.method} ${request.url}`);
  return next();
});

app.get("/api/cors/(.*)", function (req: NextRequest, event: NextFetchEvent) {
  console.log(req.url);
  console.log(req.nextUrl.pathname.startsWith("/api/cors"));
  const url = req.nextUrl.pathname.split("/api/cors/")[1];
  console.log(url);
  return NextResponse.redirect(new URL(`/api/cors?url=${url}`, req.url));
});

app.all(() => {
  // default if none of the above matches
  return NextResponse.next();
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
