import db from "@/app/lib/sqlite/db";
import EditCategory from "./editCategory";

interface RowType {
  [key: string]: any;
}
export default async function EditProductForm({ params }: { params: any }) {
  const editProductForm = (await params).categorySlug;

  const allCategories = db.prepare("SELECT id, name FROM category").all();
  const category = db
    .prepare(
      `
  SELECT category.*, images.image 
  FROM category
  JOIN images ON category.image_id = images.id
  WHERE category.slug = ?
`
    )
    .get(editProductForm);

  if (!category) {
    return <p>No product</p>;
  }

  const base64Image = `data:image/jpeg;base64,${Buffer.from(category.image).toString("base64")}`;

  const { image, ...productWithoutImage } = category;

  const productWithImage = {
    ...productWithoutImage,
    base64Image,
  };
  return (
    <>
      <h1> edit {category.name}</h1>
      <EditCategory category={productWithImage} categories={allCategories} />
    </>
  );
}
