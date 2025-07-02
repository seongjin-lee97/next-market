import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function DELETE(request, context) {
  const reqBody = await request.json();
  // const params = await context.params;
  const { id } = await context.params; // ✅ 핵심 포인트!
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(id);
    if (singleItem.email === reqBody.email) {
      await ItemModel.deleteOne({ _id: id });
      return NextResponse.json({ message: "아이템 삭제 성공" });
    } else {
      return NextResponse.json({
        message: "다른 사용자가 작성한 아이템입니다.",
      });
    }
  } catch (err) {
    console.log(`백엔드에서 오류 발생 :`, err);
    return NextResponse.json({ message: "아이템 삭제 실패" });
  }
}
