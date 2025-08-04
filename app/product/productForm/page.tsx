"use server";

import db from "@/app/lib/sqlite/db";
import NewProductForm from "./newProductForm/page";
import EditProductForm from "./[editProductForm]/page";

export default function ProductForm() {
  // const product = db.prepare("SELECT * FROM products WHERE id = ?").get(2);

  return (
    <>
      <NewProductForm />
      <EditProductForm />
    </>
  );
}
