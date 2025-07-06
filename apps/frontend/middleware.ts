import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  //TODO handle more secure when building the backend
  const isConnected = request.cookies.get("walletConnected")?.value === "true";

  const isProtected =
    request.nextUrl.pathname.startsWith("/home") ||
    request.nextUrl.pathname.startsWith("/assets") ||
    request.nextUrl.pathname.startsWith("/transactions") ||
    request.nextUrl.pathname.startsWith("/address-book") ||
    request.nextUrl.pathname.startsWith("/settings");

  if (isProtected && !isConnected) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home/:path*",
    "/assets/:path*",
    "/transactions/:path*",
    "/address-book/:path*",
    "/settings/:path*",
  ],
};
