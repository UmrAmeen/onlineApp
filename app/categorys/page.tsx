
import db from "@/app/lib/sqlite/db";
import CategoryList from "./categoryList";

interface RowType {
  [key: string]: any;
}

export default function CategoryPage() {
  const rows = db
    .prepare(`
      SELECT * 
      FROM category 
      LEFT JOIN images ON category.image_id = images.id 
      WHERE category.parent_id IS NULL
    `)
    .all();

  const rowsWithBase64Images = rows.map((row: RowType) => {
    const base64Image = row.image
      ? `data:image/jpeg;base64,${row.image.toString("base64")}`
      : null;

    return {
      ...row,
      base64Image,
    };
  });

  return <CategoryList rows={rowsWithBase64Images} />;
}
