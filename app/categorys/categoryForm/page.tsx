import db from "@/app/lib/sqlite/db";
import NewCategory from "./categoryForm";

interface RowType {
  [key: string]: any;
}

export default function CategoryForm() {
  const categoryRows = db
    .prepare(
      `SELECT * 
     FROM category 
     LEFT JOIN images ON category.image_id = images.id 
     WHERE category.parent_id IS NULL`
    )
    .all();
  const rowsWithBase64Images = categoryRows.map((row:RowType) => {
    let base64Image = null;

    if (row.image && row.imageType) {
      base64Image = `data:${row.imageType};base64,${row.image.toString("base64")}`;
    }

    const { image, imageType, ...rest } = row;

    return {
      ...rest,
      base64Image,
    };
  });

  return (
    <>
      <NewCategory categoryRows={rowsWithBase64Images} />
    </>
  );
}
