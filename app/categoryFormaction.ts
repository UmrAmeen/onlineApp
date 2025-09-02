"use server";
import { revalidatePath } from "next/cache";
import { insertImage } from "./action";
import db from "./lib/sqlite/db";
import { redirect } from "next/navigation";

export async function CreateCategoryForm(
  prevFormState: any,
  formData: FormData
) {
  const name = formData.get("name");
  const parentIdRaw = formData.get("parentId");
  const image = formData.get("image") as File;
  const slug = formData.get("slug");

  const imageId = await insertImage(image);
  const parentId = parentIdRaw === "" ? null : parentIdRaw;

  const insert = db.prepare(
    "INSERT INTO category(name, parent_id,image_id,slug) VALUES(?,?,?,?)"
  );
  const result = insert.run(name, parentId, imageId, slug);
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

export async function UpdateCategoryForm(
  prevFormState: any,
  formData: FormData
) {
  const id = Number(formData.get("id"));
  const name = formData.get("name");
  const image = formData.get("image") as File;
  const parentIdRaw = formData.get("parentId");
  const slug = formData.get("slug");
  
  const parentId = parentIdRaw === "" ? null : parentIdRaw;

  const existingProduct = db
    .prepare("SELECT * FROM category WHERE id = ?")
    .get(id);

  if (!existingProduct) {
    return { success: false, error: "category not found in database" };
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
  UPDATE category 
  SET name = ?, image_id = ?, parent_Id = ?, slug = ?
  WHERE id = ?
`);

  const result = update.run(name, imageId, parentId, slug, id);
  console.log("result", result);

  if (result.changes > 0) {
    return { success: true };
  }
  return { success: false, error: "No changes were made" };
}
