import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const requireAuthPaths = [
  "/profile",
  "/profile/edit",
  "/setting/app",
  "/user",
];

export default async function middleware(
  req: NextRequest,
  _event: NextFetchEvent
) {
  const pathname = req.nextUrl.pathname;

  if (requireAuthPaths.some((path) => pathname.startsWith(path))) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const loginUrl = new URL("/", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}