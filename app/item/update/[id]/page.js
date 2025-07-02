import UpdateItem from "@/components/UpdateItem";

export default async function Page(context) {
  const { id } = await context.params; // ✅ 핵심 포인트!
  return <UpdateItem id={id} />;
}
