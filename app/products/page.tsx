import db from "../lib/sqlite/db";
import ProductList from "./productList";

export default function Products() {
  const rows = db.prepare("SELECT * FROM products").all();
  console.log("productRow", rows);
  return (
    <div className="productsDiv">
      {rows.map((row) => (
        <div key={row.id}>
          <ProductList row={row} />
        </div>
      ))}
    </div>
  );
}
