import Link from "next/link";

export default function SideBar() {
  return (
    <>
      <ul className="sidebar-ul">
        <Link href="/products">
          <li className="sidebar-li">products</li>
        </Link>
        <Link href="/signUpForm">
          <li className="sidebar-li">signUp</li>
        </Link>
        <Link href="/addProducts">
          <li className="sidebar-li">add products</li>
        </Link>

        <li className="sidebar-li">four</li>
        <li className="sidebar-li">five</li>
      </ul>
    </>
  );
}
