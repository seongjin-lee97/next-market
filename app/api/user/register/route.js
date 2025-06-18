import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";

export async function POST(request) {
  const reqBody = await request.json();

  try {
    await connectDB();
    await UserModel.create(reqBody);
    return NextResponse.json({ message: "사용자 등록 성공" });
  } catch {
    return NextResponse.json({ message: "사용자 등록 실패" });
  }
}
