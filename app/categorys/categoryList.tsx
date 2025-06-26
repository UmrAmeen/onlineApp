import Link from "next/link";
import ProductCard from "./productCard";

export default function CategoryList({ rows, categoryId }: any) {
  console.log(categoryId);
  return (
    <>
      <div className="productsDiv">
        {rows.map((row) => (
          <Link key={row.id} href={`/${categoryId}/${row.id}`}>
            <div>
              <ProductCard row={row} />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
