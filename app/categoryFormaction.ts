"use server";
import { insertImage } from "./action";
import db from "./lib/sqlite/db";

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
