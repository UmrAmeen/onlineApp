import db from "@/app/lib/sqlite/db";
import CategoryList from "../categoryList";
import { notFound } from "next/navigation";
import ProductList from "@/app/products/productList";

export default async function CategoryId({ params }: { params: any }) {
  const categoryId = (await params).categoryId;
  console.log("categoryId", categoryId);

  const categoryRow = db
    .prepare(`SELECT * FROM category WHERE slug = ?`)
    .get(categoryId);
  console.log("categoryRow", categoryRow);

  if (!categoryRow) {
    notFound();
  }

  const productRows = db
    .prepare(`SELECT * FROM products WHERE categoryId = ? `)
    .all(categoryId);
  console.log("productRow", productRows);

  const rows = db
    .prepare(`SELECT * FROM category WHERE parent_id = ? `)
    .all(categoryId);
  console.log("rows", rows);

  return (
    <>
      <div>
        <div>
          <h1 style={{ fontSize: " xx-large", textAlign: "center" }}>
            {categoryRow.name}
          </h1>
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
