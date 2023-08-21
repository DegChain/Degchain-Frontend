import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isPublic = pathname == "/signup" || pathname == "/login";
  const token = req.cookies.get("token")?.value || "";

  if (isPublic || token) {
    return NextResponse.redirect("/");
  }

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.redirect(new URL("/login", req.url));
}
//match the route (matching part)
export const config = {
  matcher: ["/", "/admin/*", "/login", "/signup", "/user/*", "/support/*"],
};
