import db from "@/app/lib/sqlite/db";
import NewProduct from "./productForm";
import TailwindCss from "./tailWindmodalPopup/page";

interface RowType {
  [key: string]: any;
}

export default function NewProductForm() {
  const categoryRows = db.prepare("SELECT * FROM category").all();
  const rows = db.prepare(`SELECT * FROM images`).all();

  const images = rows.map((row: RowType) => {
    const base64 = Buffer.from(row.image).toString("base64");
    const url = `data:${row.imageType};base64,${base64}`;
    return {
      id: row.id,
      url,
    };
  });
  return (
    <>
      <TailwindCss />
      <h1>Create Product</h1>
      <NewProduct categoryRows={categoryRows} Images={images} />
    </>
  );
}
