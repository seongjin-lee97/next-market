import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware() {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImR1bW15QGdtYWlsLmNvbSIsImV4cCI6MTc1MDMxMjA3MX0.OhD7Kwhm8XD65LbozcdSvzLrCVuYsaEsvIbQDNvg-uM";
  // const token = await request.headers.get("Authorization")?.split("")[1];

  if (!token) {
    return NextResponse.json({ message: "토큰이 없습니다." });
  }

  try {
    const secretKey = new TextEncoder().encode("next-market-app-book");
    const decodedJWt = await jwtVerify(token, secretKey);
    return NextResponse.next();
  } catch {
    return NextResponse.json({
      message: "토큰이 올바르지 않습니다. 로그인 해주십시오.",
    });
  }
}

export const config = {
  matcher: [
    "/api/item/create",
    "/api/item/update/:path*",
    "/api/item/delete/:path*",
  ],
};
