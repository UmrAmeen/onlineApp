import Link from "next/link";
import ProductCard from "./productCard";

export default function ProductList({ rows }: any) {
  interface RowType {
    [key: string]: any;
  }
  return (
    <div className="productsDiv">
      {rows.map((row: RowType) => (
        <Link key={row.id} href={`/products/${row.id}`}>
          <div>
            <ProductCard row={row} />
          </div>
        </Link>
      ))}
    </div>
  );
}
