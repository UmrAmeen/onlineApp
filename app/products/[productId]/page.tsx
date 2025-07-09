import db from "@/app/lib/sqlite/db";
import ProductList from "../productList";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProductIdList from "../prodctIdList";

export default async function ProductPage({ params }: { params: any }) {
  const productId = (await params).productId;

  const rows = db
    .prepare(`SELECT * FROM products WHERE id = ? `)
    .all(productId);

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
