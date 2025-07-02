import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

// export async function GET(request, { params }) {
//   try {
//     await connectDB();
//     const singleItem = await ItemModel.findById(params.id);
//     return NextResponse.json({
//       message: "아이템 읽기 성공(하나)",
//       singleItem: singleItem,
//     });
//   } catch {
//     console.error("에러 발생:", error);
//     return NextResponse.json({ message: "아이템 읽기 실패(하나)" });
//   }
// }

export async function GET(request, context) {
  try {
    await connectDB();
    // const params = await context.params;
    // const { id } = params;
    // const params = await context.params;
    const { id } = await context.params; // ✅ 핵심 포인트!
    const singleItem = await ItemModel.findById(id);
    return NextResponse.json({
      message: "아이템 읽기 성공(하나)",
      singleItem: singleItem,
    });
  } catch (err) {
    console.log("에러 발생:", err);
    return NextResponse.json({ message: "아이템 읽기 실패(하나)" });
  }
}
