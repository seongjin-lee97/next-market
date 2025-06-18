import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function GET() {
  try {
    await connectDB();
    const allItems = await ItemModel.find();
    return NextResponse.json({
      message: "아이템 읽기 성공(모두)",
      allItems: allItems,
    });
  } catch {
    return NextResponse.json({ message: "아이템 읽기 실패(모두)" });
  }
}

export const revalidate = 0;
