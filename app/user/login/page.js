import MyPage from "./myPage";

export const metadata = {
  title: "로그인 페이지",
  description: "Next Market 로그인 페이지입니다.",
};

const Login = (context) => {
  return <MyPage {...context} />;
};

export default Login;
