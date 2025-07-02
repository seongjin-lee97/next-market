"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../utils/useAuth";
import ImgInput from "../../components/ImgInput";

const CreateItem = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();
  const loginUserEmail = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/item/create`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title: title,
            price: price,
            image: image,
            description: description,
            email: loginUserEmail, // UseAuth에서 return한 login 이메일
          }),
        }
      );
      const jsonData = await response.json();
      alert(jsonData.message);
      router.push("/");
      router.refresh();
    } catch {
      alert("아이템 작성 실패");
    }
  };
  if (loginUserEmail) {
    return (
      <div>
        <h1 className="page-title">아이템 작성</h1>
        <ImgInput setImage={setImage} />
        <form onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="title"
            placeholder="아이템명"
            required
          />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            name="price"
            placeholder="가격"
            required
          />
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            type="text"
            name="image"
            placeholder="이미지"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            rows={15}
            placeholder="상품 설명"
            required
          />
          <button>작성</button>
        </form>
      </div>
    );
  }
};

export default CreateItem;
