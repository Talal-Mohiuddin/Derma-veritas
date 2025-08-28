// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const url = new URL(request.url);
  const refCode = url.searchParams.get("ref");

  if (refCode) {
    // Create a response to set the cookie
    const response = NextResponse.next();
    // Set cookie with referral code (expires in 30 days)
    response.cookies.set("referralCode", refCode, {
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
      httpOnly: true, // Prevent client-side access
      secure: process.env.NODE_ENV === "production", // Secure in production
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signup", "/"], // Apply middleware to signup page and homepage
};
