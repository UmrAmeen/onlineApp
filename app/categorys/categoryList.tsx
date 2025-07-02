import Link from "next/link";
import CategoryCard from "./categoryCard";



export default function CategoryList({ rows }: any) {
  
  
  return (
    <>
      <div className="productsDiv">
        {rows.map((row) => (
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
