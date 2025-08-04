import db from "@/app/lib/sqlite/db";
import CategoryList from "../categoryList";
import { notFound } from "next/navigation";
import ProductList from "@/app/product/productList";

interface RowType {
  [key: string]: any;
}
export default async function CategoryId({ params }: { params: any }) {
  const categorySlug = (await params).categorySlug;
  //  console.log("categoryId", categorySlug);

  const categoryRow = db
    .prepare(`SELECT * FROM category WHERE slug = ?`)
    .get(categorySlug);
  // console.log("categoryRow", categoryRow);

  if (!categoryRow) {
    notFound();
  }

  const subcategories = db
    .prepare(`SELECT * FROM category WHERE parent_id = ?`)
    .all(categoryRow.id.toString());

  const productRows = db
    .prepare(`SELECT * FROM products WHERE categoryId = ?`)
    .all(categoryRow.id.toString());

  const subcategoriRowsWithBase64Images = subcategories.map((row: RowType) => {
    const base64Image = row.image.toString("base64");

    return {
      ...row,
      base64Image: `data:image/jpeg;base64,${base64Image}`,
    };
  });
  const productRowWithBase64Image = productRows.map((row: RowType) => {
    const base64Image = row.image.toString("base64");

    return {
      ...row,
      base64Image: `data:image/jpeg;base64,${base64Image}`,
    };
  });

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
            <CategoryList rows={subcategoriRowsWithBase64Images} />
          ) : (
            <div>
              <ProductList rows={productRowWithBase64Image} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
