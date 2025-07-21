import db from "../lib/sqlite/db";
import ProductList from "./productList";

export default function Products() {
  const rows = db.prepare("SELECT * FROM products where id = ?").all(20);
  console.log("rows", rows);
  const rowsWithBase64Images = rows.map((row) => {
    // Convert the BLOB data (Buffer) into a Base64 string
    const base64Image = row.image.toString("base64");

    // Add a 'base64Image' field to the row with the Base64 string
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
