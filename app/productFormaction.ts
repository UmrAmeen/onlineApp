"use server";
import { redirect } from "next/navigation";
import db from "./lib/sqlite/db";
import { insertImage } from "./action";
import { revalidatePath } from "next/cache";

export async function CreateProductForm(
  prevFormState: any,
  formData: FormData
) {
  const name = formData.get("name");
  const image = formData.get("image") as File;
  const categoryId = formData.get("categoryId");
  const price = formData.get("price");
  const slug = formData.get("slug");
  const description = formData.get("description");
  const selectedImageId = formData.get("selectedImageId");
  const imageId = selectedImageId || (await insertImage(image));

  const insert = db.prepare(
    "INSERT INTO products(name,image_id,categoryId,price,slug,description) VALUES(?,?,?,?,?,?)"
  );

  const result = insert.run(
    name,
    imageId,
    categoryId,
    price,
    slug,
    description
  );

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

export async function UpdateProductForm(
  prevFormState: any,
  formData: FormData
) {
  const id = Number(formData.get("id"));
  const name = formData.get("name");
  const image = formData.get("image") as File;
  const categoryId = Number(formData.get("categoryId"));
  const price = Number(formData.get("price"));
  const slug = formData.get("slug");
  const description = formData.get("description");

  const existingProduct = db
    .prepare("SELECT * FROM products WHERE id = ?")
    .get(id);

  if (!existingProduct) {
    return { success: false, error: "Product not found in database" };
  }

  let imageId = existingProduct.image_id;

  if (image && image.size > 0) {
    imageId = await insertImage(image);

    if (existingProduct.image_id) {
      db.prepare("DELETE FROM images WHERE id = ?").run(
        existingProduct.image_id
      );
    }
  }

  const update = db.prepare(`
    UPDATE products 
    SET name = ?, image_id = ?, categoryId = ?, price = ?, slug = ?, description = ?, 
    WHERE id = ?
  `);

  const result = update.run(
    name,
    imageId,
    categoryId,
    price,
    slug,
    description,
    id
  );
  console.log("result", result);

  return result.changes > 0
    ? (revalidatePath(`/product/${slug}`), redirect(`/product/${slug}`))
    : { success: false, error: "No changes were made" };
}
