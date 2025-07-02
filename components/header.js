import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div>
        <Link href="/">
          <Image
            src="/header.svg"
            width={1330}
            height={148}
            alt="header-image"
            priority
          />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/user/register">등록</Link>
          </li>
          <li>
            <Link href="/user/login">로그인</Link>
          </li>
          <li>
            <Link href="/item/create">아이템 작성</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
