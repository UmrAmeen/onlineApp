"use server";
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

  const imageBuffer = Buffer.from(await image.arrayBuffer());
  const imageType = image.type;
  const insertImage = db.prepare(
    "INSERT INTO images (image, imageType) VALUES (?, ?)"
  );
  const imageResult = insertImage.run(imageBuffer, imageType);
  const imageId = imageResult.lastInsertRowid;

  const update = db.prepare(`
    UPDATE products 
    SET name = ?, image_id = ?, categoryId = ?, price = ?, slug = ?, description = ?
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

  return result.changes > 0
    ? { success: true, message: "Product updated successfully" }
    : { success: false, error: "No changes were made" };
}
