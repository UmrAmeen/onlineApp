import db from "@/app/lib/sqlite/db";
import CategoryList from "../categoryList";
import ProductList from "@/app/product/productList";
import { notFound } from "next/navigation";

interface RowType {
  [key: string]: any;
}

export default async function CategoryId({ params }: { params: any }) {
  const categorySlug = (await params).categorySlug;

  const categoryRow = db
    .prepare(
      `SELECT * FROM category JOIN images ON category.image_id = images.id WHERE slug = ?`
    )
    .get(categorySlug);
    
  // console.log("categoryRow", categoryRow);
  if (!categoryRow) {
    notFound();
  }

  const subcategories = db
    .prepare(
      `SELECT * FROM category JOIN images ON category.image_id = images.id WHERE parent_id = ?`
    )
    .all(categoryRow.id.toString());
  // console.log("subcategorys", subcategories);

  const productRows = db
    .prepare(
      `SELECT * FROM products JOIN images ON products.image_id = images.id WHERE categoryId = ?`
    )
    .all(categoryRow.id.toString());

  // console.log("✅ productRows", productRows);

  const subcategoryRowsWithBase64Images = subcategories.map((row: RowType) => {
    const base64Image = row.image
      ? Buffer.from(row.image).toString("base64")
      : null;

    return {
      ...row,
      base64Image: base64Image ? `data:image/jpeg;base64,${base64Image}` : null,
    };
  });

  const productRowsWithBase64Images = productRows.map((row: RowType) => {
    const base64Image = row.image
      ? Buffer.from(row.image).toString("base64")
      : null;

    return {
      ...row,
      base64Image: base64Image ? `data:image/jpeg;base64,${base64Image}` : null,
    };
  });

  return (
    <div>
      <h1 style={{ fontSize: "xx-large", textAlign: "center" }}>
        {categoryRow.name}
      </h1>

      <div className="productsDiv">
        {subcategoryRowsWithBase64Images.length > 0 ? (
          <CategoryList rows={subcategoryRowsWithBase64Images} />
        ) : (
          <ProductList rows={productRowsWithBase64Images} />
        )}
      </div>
    </div>
  );
}
