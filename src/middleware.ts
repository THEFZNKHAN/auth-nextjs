import { NextRequest, NextResponse } from "next/server";

// LOGIC PART
export const middleware = (request: NextRequest) => {
    const path = request.nextUrl.pathname;

    const isPublicPath =
        path === "/login" || path === "/signup" || path === "/verifyemail";

    const token = request.cookies.get("token")?.value || "";

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
};

// MATCHING PART
export const config = {
    matcher: [
        "/",
        "/profile",
        "/profile/:path*",
        "/login",
        "/signup",
        "/verifyemail",
    ],
};
