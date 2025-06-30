import db from "../lib/sqlite/db";
import ProductList from "./productList";

export default function Products() {
  const rows = db.prepare("SELECT * FROM products").all();

  return (
    <div className="productsDiv">
      <ProductList rows={rows} />
    </div>
  );
}
