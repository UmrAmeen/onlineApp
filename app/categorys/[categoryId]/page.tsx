import db from "@/app/lib/sqlite/db";
import CategoryList from "../categoryList";
import { notFound } from "next/navigation";

import ProductList from "@/app/products/productList";
import Link from "next/link";

export default async function CategoryId({ params }: { params: any }) {
  const categoryId = (await params).categoryId;

  const categoryRow = db
    .prepare(`SELECT * FROM category WHERE  id = ?`)
    .get(categoryId);
  if (!categoryRow) {
    notFound();
  }
  // console.log("categoryRow",categoryRow)
  const productRows = db
    .prepare(`SELECT * FROM products WHERE categoryId = ? `)
    .all(categoryId);
  // console.log("productRow", productRows);

  if (productRows.length === 0) {
    return <p>no products</p>;
  }
  const rows = db
    .prepare(`SELECT * FROM category WHERE parent_id = ? `)
    .all(categoryId);
  // console.log("rows", rows);

  return (
    <>
      <div>
        <div>
          <h1>{categoryRow.name}</h1>
        </div>
        <div className="productsDiv">
          {rows.length > 0 ? (
            <CategoryList rows={rows} />
          ) : (
            <div>
              <ProductList rows={productRows} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
