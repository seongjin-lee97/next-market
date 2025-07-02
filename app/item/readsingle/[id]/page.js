import Image from "next/image";
import Link from "next/link";

const getSingleItem = async (id) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`,
    { cache: "no-store" }
  );
  const jsonData = await response.json();
  const singleItem = jsonData.singleItem;
  return singleItem;
};

// const ReadSingleItem = async (context) => {
//   const singleItem = await getSingleItem(context.params.id);
//   console.log(singleItem);
//   return <h1>개별 아이템 페이지</h1>;
// };

const ReadSingleItem = async (context) => {
  const { id } = await context.params; // ✅ 핵심 포인트!
  const singleItem = await getSingleItem(id);
  return (
    <div className="grid-container-si">
      <div>
        <Image
          src={singleItem.image}
          width={750}
          height={500}
          alt="item-image"
          priority
        />
      </div>
      <div>
        <h1>{singleItem.title}</h1>
        <h2>\{singleItem.price}</h2>
        <hr />
        <p>{singleItem.description}</p>
        <div>
          <Link href={`/item/update/${singleItem._id}`}>아이템 수정</Link>
          <Link href={`/item/delete/${singleItem._id}`}>아이템 삭제</Link>
        </div>
      </div>
    </div>
  );
};

export default ReadSingleItem;
