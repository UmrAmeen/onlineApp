import db from "@/app/lib/sqlite/db";
import CategoryList from "../categoryList";
import { notFound } from "next/navigation";
import ProductList from "@/app/product/productList";

interface RowType {
  [key: string]: any;
}

export default async function CategoryId({ params }: { params: any }) {
  const categorySlug = (await params).categorySlug;

  const categoryRows = db
    .prepare(
      `SELECT * FROM category join images on category.image_id = images.id WHERE slug = ?`
    )
    .all(categorySlug);
  // console.log("categoryRow", categoryRows);
  if (!categoryRows) {
  notFound();
}

  const categoryRow = categoryRows[0];
  const subcategories = db
    .prepare(
      `SELECT * FROM category join images on category.image_id = images.id WHERE parent_id = ?`
    )
    .all(categoryRow.id.toString());

  const productRows = db
    .prepare(
      `SELECT * FROM products join images on products.image_id = images.id WHERE categoryId = ?`
    )
    .all(categoryRow.id.toString());

  const subcategoryRowsWithBase64Images = subcategories.map((row: RowType) => {
    const base64Image = row.image.toString("base64");
    return {
      ...row,
      base64Image: `data:image/jpeg;base64,${base64Image}`,
    };
  });

  const productRowsWithBase64Images = productRows.map((row: RowType) => {
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
          <h1 style={{ fontSize: "xx-large", textAlign: "center" }}>
            {categoryRow.name}
          </h1>
        </div>
        <div className="productsDiv">
          {subcategoryRowsWithBase64Images.length > 0 ? (
            <CategoryList rows={subcategoryRowsWithBase64Images} />
          ) : (
            <ProductList rows={productRowsWithBase64Images} />
          )}
        </div>
      </div>
    </>
  );
}
