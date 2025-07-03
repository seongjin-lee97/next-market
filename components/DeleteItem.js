"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useAuth from "@/app/utils/useAuth";

const DeleteItem = ({ id }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const loginUserEmail = useAuth();

  useEffect(() => {
    const getSingleItem = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`,
        { cache: "no-store" }
      );
      const jsonData = await response.json();
      const singleItem = jsonData.singleItem;
      setTitle(singleItem.title);
      setPrice(singleItem.price);
      setImage(singleItem.image);
      setDescription(singleItem.description);
      setEmail(singleItem.email);
      setLoading(true);
    };

    if (id) getSingleItem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/item/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            email: loginUserEmail,
          }),
        }
      );

      const jsonData = await response.json();
      alert(jsonData.message);
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("삭제 중 에러 발생:", err);
      alert("아이템 삭제 실패");
    }
  };
  if (loading) {
    if (loginUserEmail === email) {
      return (
        <div>
          <h1 className="page-title">아이템 삭제</h1>
          <form onSubmit={handleSubmit}>
            <h2>{title}</h2>
            {/* ✅ 방법 1: image가 유효할 때만 <Image /> 렌더링, 
            즉, image 값이 빈 문자열("")이 아니고 유효할 때만 이미지 태그를 렌더링합니다.
            이게 가장 안전한 방식입니다.
            */}
            {image && (
              <Image
                src={image}
                width={750}
                height={500}
                alt="item-image"
                priority
              />
            )}
            <h3>{price}</h3>
            <p>{description}</p>
            <button>삭제</button>
          </form>
        </div>
      );
    } else {
      return <h1>권한이 없습니다</h1>;
    }
  } else {
    return <h1>로딩 중...</h1>;
  }
};

export default DeleteItem;
