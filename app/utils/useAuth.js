import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtVerify } from "jose";

const useAuth = () => {
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const router = useRouter(); // 페이지 이동시키는 메서드인듯?

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/user/login"); // token이 없을 때 로그인 페이지로 이동
      }

      try {
        const secretKey = new TextEncoder().encode("next-market-app-book");
        const decodedJWt = await jwtVerify(token, secretKey);
        setLoginUserEmail(decodedJWt.payload.email); // 디코드된 정보는 payload로 확인되는 듯?
      } catch (err) {
        console.error("토큰 검증 중 에러:", err);
        router.push("/user/login");
      }
    };
    checkToken();
  }, [router]); // 즉, 컴포넌트가 처음 렌더링될 때 한 번 실행되고, 그 후에는 router 값이 바뀌지 않는 한 다시 실행되지 않아요.

  return loginUserEmail;
};

export default useAuth;
