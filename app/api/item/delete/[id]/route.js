import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function DELETE(request, context) {
  const params = await context.params;
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(context.params.id);
    if (singleItem.email === requestToBodyStream.email) {
      await ItemModel.deleteOne({ _id: params.id });
      return NextResponse.json({ message: "아이템 삭제 성공" });
    } else {
      return NextResponse.json({
        message: "다른 사용자가 작성한 아이템입니다.",
      });
    }
  } catch {
    return NextResponse.json({ message: "아이템 삭제 실패" });
  }
}
