import db from "@/app/lib/sqlite/db";
import ProductForm from "./productForm";

export default function Form() {
  return (
    <>
      <h1>Create Product</h1>
      <ProductForm />
    </>
  );
}
