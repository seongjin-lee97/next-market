import DeleteItem from "@/components/DeleteItem";

export default async function Page(context) {
  const { id } = await context.params; // ✅ 핵심 포인트!
  return <DeleteItem id={id} />;
}
