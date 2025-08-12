import db from "../lib/sqlite/db";
import ProductList from "./productList";

interface RowType {
  [key: string]: any;
}

export default function Products() {
  const rows = db
    .prepare(
      `
      SELECT products.*, images.image
      FROM products
      JOIN images ON products.image_id = images.id
    `
    )
    .all();

  const rowsWithBase64Images = rows.map((row: RowType) => {
    const base64Image = row.image
      ? `data:image/jpeg;base64,${Buffer.from(row.image).toString("base64")}`
      : null;

    return {
      ...row,
      base64Image,
    };
  });

  return (
    <div className="productsDiv">
      <ProductList rows={rowsWithBase64Images} />
    </div>
  );
}
