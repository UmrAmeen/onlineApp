import db from "@/app/lib/sqlite/db";
import NewProduct from "./productForm";


export default function NewProductForm() {
  const categoryRows = db.prepare("SELECT * FROM category").all();
  const rows = db.prepare(`SELECT * FROM images`).all();

 const seen = new Set<string>();
  const images = [];

  for (const row of rows) {
    const base64 = Buffer.from(row.image).toString("base64");
    const url = `data:${row.imageType};base64,${base64}`;

    if (!seen.has(url)) {
      seen.add(url);
      images.push({ id: row.id, url });
    }
  }
  return (
    <>
      <h1>Create Product</h1>
      <NewProduct categoryRows={categoryRows} Images={images} />
    </>
  );
}
