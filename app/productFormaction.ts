"use server";
import db from "./lib/sqlite/db";

export async function CreateProductForm(
  prevFormState: any,
  formData: FormData
) {
  const name = formData.get("name");
  const image_id = formData.get("image") as File;
  const categoryId = formData.get("category");
  const price = formData.get("price");
  const slug = formData.get("slug");
  const description = formData.get("description");

  const imageBytes = await image_id.arrayBuffer();
  const buffer = Buffer.from(imageBytes);

  const insert = db.prepare(
    "INSERT INTO products(name,image_id,categoryId,price,slug,description) VALUES(?,?,?,?,?,?)"
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

export async function UpdateProductForm(
  prevFormState: any,
  formData: FormData
) {
  const id = Number(formData.get("id"));
  const name = formData.get("name");
  const image_id = formData.get("image") as File;
  const categoryId = Number(formData.get("categoryId"));
  const price = Number(formData.get("price"));
  const slug = formData.get("slug");
  const description = formData.get("description");

  const existingProduct = db
    .prepare("SELECT * FROM products WHERE id = ?")
    .get(id);
  console.log(
    "Query result:",
    db.prepare("SELECT * FROM products WHERE id = ?").all(id)
  );
  if (!existingProduct) {
    console.log("Product not found in database");
    return {
      success: false,
      error: "Product not found in database",
    };
  }

  let buffer: Buffer | null = null;

  if (image_id && image_id.size > 0 && image_id.name !== "undefined") {
    const imageBytes = await image_id.arrayBuffer();
    buffer = Buffer.from(imageBytes);
  } else {
    buffer = existingProduct.image_id;
  }

  const updateProduct = db.prepare(
    `UPDATE products 
     SET name = ?,  image_id = COALESCE(?, image_id) , categoryId = ?, price = ?, slug = ?, description = ?
     WHERE id = ?`
  );
  const result = updateProduct.run(
    name,
    buffer,
    categoryId,
    price,
    slug,
    description,
    id
  );

  if (result.changes > 0) {
    return {
      success: true,
      message: "Product updated successfully",
    };
  } else {
    return {
      success: false,
      error: "No changes were made",
    };
  }
}
