import Link from "next/link";
import ProductCard from "./productCard";

export default function ProductList({ rows }: any) {
  return (
    <div className="productsDiv">
      {rows.map((row) => (
        <Link key={row.id} href={`/products/${row.id}`}>
        <div >
          <ProductCard row={row}  />
        </div>
        </Link>
        
      ))}
    </div>
  );
}
