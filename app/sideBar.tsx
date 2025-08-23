import Link from "next/link";

export default function SideBar() {
  return (
    <>
      <ul className="sidebar-ul">
        <Link href="/categorys">
          <li className="sidebar-li">categorys</li>
        </Link>
        <Link href="/product">
          <li className="sidebar-li"> products</li>
        </Link>
        <Link href="/product/productForm/newProductForm">
          <li className="sidebar-li"> New product Form</li>
        </Link>
        <Link href="/categorys/categoryForm">
          <li className="sidebar-li">New Category Form</li>
        </Link>
        <Link href="/signUpForm">
          <li className="sidebar-li">signUp</li>
        </Link>
      </ul>
    </>
  );
}
