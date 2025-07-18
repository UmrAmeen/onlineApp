import db from "@/app/lib/sqlite/db";
import Link from "next/link";
import ProductIdList from "../prodctIdList";

export default async function ProductPage({ params }: { params: any }) {
  const productSlug = (await params).productSlug;
console.log("productSlug",productSlug)
  const rows = db
    .prepare(`SELECT * FROM products WHERE slug = ? `)
    .all(productSlug)
 
  return (
    <div className="productsDiv">
      {rows.length > 0 ? (
        <ProductIdList rows={rows} />
      ) : (
        <div className="AddToProducts">
          <Link href="/products/productForm">
            <button className="AddToProductsButton">add to products</button>
          </Link>
        </div>
      )}
    </div>
  );
}
