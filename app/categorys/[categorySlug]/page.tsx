import db from "@/app/lib/sqlite/db";
import CategoryList from "../categoryList";
import { notFound } from "next/navigation";
import ProductList from "@/app/products/productList";

export default async function CategoryId({ params }: { params: any }) {
  const categorySlug = await params.categorySlug;
  // console.log("categoryId", categorySlug);

  const categoryRow = db
    .prepare(`SELECT * FROM category WHERE slug = ?`)
    .get(categorySlug);
  // console.log("categoryRow", categoryRow);

  if (!categoryRow) {
    notFound();
  }

  const subcategories = db
    .prepare(`SELECT * FROM category WHERE parent_id = ?`)
    .all(categoryRow.id);

  const productRows = db
    .prepare(`SELECT * FROM products WHERE categoryId = ?`)
    .all(categoryRow.id);

  //  console.log("rows", rows);

  return (
    <>
      <div>
        <div>
          <h1 style={{ fontSize: " xx-large", textAlign: "center" }}>
            {categoryRow.name}
          </h1>
        </div>
        <div className="productsDiv">
          {subcategories.length > 0 ? (
            <CategoryList rows={subcategories} />
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
