import Link from "next/link";

export default function CategoryCard({ row }: any) {
  return (
    <div className="myproduct">
      <img src={row.base64Image} />
      <p>{row.name}</p>
      <Link href={`/categorys/${row.slug}/edit`}>
        <button className="add-to-cart-btn">edit</button>
      </Link>
    </div>
  );
}
