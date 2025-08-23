import db from "@/app/lib/sqlite/db";
import NewProduct from "./productForm";

interface RowType {
  [key: string]: any;
}

export default function NewProductForm() {
  const categoryRows = db.prepare("SELECT * FROM category").all();

  return (
    <>
      <h1>Create Product</h1>
      <NewProduct categoryRows={categoryRows} />
    </>
  );
}
