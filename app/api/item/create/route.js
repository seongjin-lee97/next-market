import { NextResponse } from "next/server";
import connectDB from "../../../utils/database";
import { ItemModel } from "../../../utils/schemaModels";

export async function POST(request) {
  const reqBody = await request.json();

  try {
    await connectDB();
    await ItemModel.create(reqBody);
    return NextResponse.json({ message: "아이템 작성 성공" });
  } catch {
    return NextResponse.json({ message: "아이템 작성 실패" });
  }
}
