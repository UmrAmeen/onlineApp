import db from "../lib/sqlite/db";
import ProductList from "./productList";

interface RowType {
  [key: string]: any;
}
export default function Products() {
  const rows = db
    .prepare(`SELECT * FROM products join images on products.image_id `)
    .all();
  const rowsWithBase64Images = rows.map((row: RowType) => {
    const base64Image = row.image.toString("base64");

    return {
      ...row,
      base64Image: `data:image/jpeg;base64,${base64Image}`,
    };
  });

  return (
    <div className="productsDiv">
      <ProductList rows={rowsWithBase64Images} />
    </div>
  );
}
