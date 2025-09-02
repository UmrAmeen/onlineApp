import Link from "next/link";
import CategoryCard from "./categoryCard";

interface RowType {
  [key: string]: any;
}
export default function CategoryList({ rows }: { rows: RowType[] }) {
  return (
    <>
      <div className="productsDiv">
        {rows.map((row: RowType) => (
          <Link key={row.id} href={`/categorys/${row.slug}`}>
            <div>
              <CategoryCard row={row} />
              
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
