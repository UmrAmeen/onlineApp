import Link from "next/link";
import ProductCard from "./productCard";
interface RowType {
  [key: string]: any;
}
export default function ProductList({ rows }: any) {
  
  return (
    <div className="productsDiv">
      {rows.map((row: RowType) => (
        <Link key={row.id} href={`/products/${row.slug}`}>
          <div>
            <ProductCard row={row} />
          </div>
        </Link>
      ))}
    </div>
  );
}
