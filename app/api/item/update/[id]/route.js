import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function PUT(request, context) {
  const reqBody = await request.json();
  // const params = await context.params;
  const { id } = await context.params; // ✅ 핵심 포인트!
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(id);

    console.log("singleItem.email: ", singleItem.email);
    console.log("reqBody.email: ", reqBody.email);

    if (singleItem.email === reqBody.email) {
      await ItemModel.updateOne({ _id: id }, reqBody);
      return NextResponse.json({ message: "아이템 수정 성공" });
    } else {
      return NextResponse.json({
        message: "다른 사용자가 작성한 아이템입니다.",
      });
    }
  } catch {
    return NextResponse.json({ message: "아이템 수정 실패" });
  }
}
