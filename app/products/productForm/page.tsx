import db from "@/app/lib/sqlite/db";
import ProductForm from "./productForm";

export default function Form() {
  const rows = db.prepare("SELECT * FROM category").all();
  return (
    <>
      <h1>Create Product</h1>
      <ProductForm rows={rows} />
    </>
  );
}
