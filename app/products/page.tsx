import db from "../lib/sqlite/db";
import ProductList from "./productList";

interface RowType {
  [key: string]: any;
}
export default function Products() {
  const rows = db.prepare("SELECT * FROM products ").all();
  // console.log("rows", rows);
  const rowsWithBase64Images = rows.map((row:RowType) => {
    const base64Image = row.image.toString("base64");

    return {
      ...row,
      base64Image: `data:image/jpeg;base64,${base64Image}`, // You can adjust MIME type if necessary (image/jpeg, image/png, etc.)
    };
  });

  return (
    <div className="productsDiv">
      <ProductList rows={rowsWithBase64Images} />
    </div>
  );
}
