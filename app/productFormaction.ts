"use server";
import db from "./lib/sqlite/db";

export async function CreateProductForm(
  prevFormState: any,
  formData: FormData
) {
  const name = formData.get("name");
  const image = formData.get("image");
  const categoryId = formData.get("category");
  const price = formData.get("price");
  const description = formData.get("description");

  const insert = db.prepare(
    "INSERT INTO products(name,image,categoryId,price,description) VALUES(?,?,?,?,?)"
  );
  //   console.log("name", name);
  const result = insert.run(name, image, categoryId, price, description);

  if (result.lastInsertRowid) {
    return {
      success: true,
      error: "",
    };
  }
  return {
    success: false,
    error: "Something went wrong!",
  };
}
