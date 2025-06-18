import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";

export async function POST(request) {
  const reqBody = await request.json();
  try {
    await connectDB();
    const savedUserData = await UserModel.findOne({ email: reqBody.email });
    if (savedUserData) {
      if (reqBody.password === savedUserData.password) {
        const secretKey = new TextEncoder().encode("next-market-app-book");

        const payload = {
          email: reqBody.email,
        };

        const token = await new SignJWT(payload)
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("1d")
          .sign(secretKey);

        console.log(token);

        return NextResponse.json({ message: "로그인 성공", token: token });
      } else {
        return NextResponse.json({
          message: "로그인 실패 : 비밀번호가 올바르지 않습니다",
        });
      }
    } else {
      return NextResponse.json({
        message: "로그인 실패 : 사용자를 등록하십시오",
      });
    }
  } catch {
    return NextResponse.json({ message: "로그인 실패" });
  }
}
