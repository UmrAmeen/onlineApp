import Link from "next/link";
import CategoryCard from "./categoryCard";

export default function CategoryList({ rows }: any) {
   interface RowType {
    [key: string]: any;
  }
  return (
    <>
      <div className="productsDiv">
        {rows.map((row:RowType) => (
          <Link key={row.id} href={`/categorys/${row.id}`}>
            <div>
              <CategoryCard row={row} />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
