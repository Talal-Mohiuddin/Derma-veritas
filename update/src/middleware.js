// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  // Remove referral link functionality - we only use manual codes now
  return NextResponse.next();
}

export const config = {
  matcher: [], // Disable middleware since we're not using referral links
};
