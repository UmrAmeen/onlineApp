import db from "../lib/sqlite/db";
import CategoryList from "./categoryList";

interface RowType {
  [key: string]: any;
}
export default function Categorys() {
  const rows = db
    .prepare(
      `SELECT * FROM category join images on category.image_id =images.id WHERE parent_id IS NULL `
    )
    .all();
  const rowsWithBase64Images = rows.map((row: RowType) => {
    const base64Image = row.image.toString("base64");

    return {
      ...row,
      base64Image: `data:image/jpeg;base64,${base64Image}`,
    };
  });
  return (
    <>
      <CategoryList rows={rowsWithBase64Images} />
    </>
  );
}
