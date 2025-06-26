import db from "@/app/lib/sqlite/db";
import ProductForm from "./productForm";

export default function Form() {
  const rows = db.prepare("SELECT * FROM products").all();
  return (
    <>
      <ProductForm rows={rows} />
    </>
  );
}
