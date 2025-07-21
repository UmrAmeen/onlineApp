"use server";
import { stringify } from "querystring";
import db from "./lib/sqlite/db";

export async function CreateProductForm(
  prevFormState: any,
  formData: FormData
) {
  const name = formData.get("name");
  const image = formData.get("image") as File;
  const categoryId = formData.get("category");
  const price = formData.get("price");
  const slug = formData.get("slug");
  const description = formData.get("description");

  const imageBytes = await image.arrayBuffer();

  const buffer = Buffer.from(imageBytes);

  const insert = db.prepare(
    "INSERT INTO products(name,image,categoryId,price,slug,description) VALUES(?,?,?,?,?,?)"
  );

  const result = insert.run(name, buffer, categoryId, price, slug, description);

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
