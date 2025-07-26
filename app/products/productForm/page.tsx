import db from "@/app/lib/sqlite/db";
import NewProductForm from "./productForm";

interface RowType {
  [key: string]: any;
}
export default function Form() {
  const categoryRows = db.prepare("SELECT * FROM category").all();

  const categoryRowsWithBase64Images = categoryRows.map((row: RowType) => {
    const base64Image = row.image.toString("base64");
    const { image, ...rest } = row;

    return {
      ...rest,
      base64Image: `data:image/jpeg;base64,${base64Image}`,
    };
  });
  return (
    <>
      <h1>Create Product</h1>
      <NewProductForm categoryRows={categoryRowsWithBase64Images} />
    </>
  );
}
