"use server";
import db from "./lib/sqlite/db";

export async function CreateCategoryForm(
  prevFormState: any,
  formData: FormData
) {
  const name = formData.get("name");
  const parentIdRaw = formData.get("parentId");
  const image = formData.get("image") as File;
  const slug = formData.get("slug");

  const imageBuffer = Buffer.from(await image.arrayBuffer());
  const imageType = image.type;
  const insertImage = db.prepare(
    "INSERT INTO images (image, imageType) VALUES (?, ?)"
  );
  const imageResult = insertImage.run(imageBuffer, imageType);
  const imageId = imageResult.lastInsertRowid;
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
