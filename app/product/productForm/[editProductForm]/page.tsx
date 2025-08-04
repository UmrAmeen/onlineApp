import db from "@/app/lib/sqlite/db";
import EditProduct from "./editProduct";

interface RowType {
  [key: string]: any;
}
export default async function ProductForm({ params }: { params: any }) {
  const editProductForm = (await params).editProductForm;

  const categoryRows = db.prepare("SELECT * FROM category ").all();

  const categoryRowsWithBase64Images = categoryRows.map((row: RowType) => {
    const base64Image = row.image.toString("base64");
    const { image, ...rest } = row;
    return {
      ...rest,
      base64Image: `data:image/jpeg;base64,${base64Image}`,
    };
  });

  const product = db
    .prepare("SELECT * FROM products WHERE slug = ?")
    .get(editProductForm);

  if (!product) {
    return <p>No product </p>;
  }

  const base64Image = `data:image/jpeg;base64,${Buffer.from(product.image).toString("base64")}`;
  const { image, ...restProduct } = product;

  const productWithImage = {
    ...restProduct,
    base64Image,
  };

  return (
    <>
      <EditProduct
        categoryRows={categoryRowsWithBase64Images}
        product={productWithImage}
      />
    </>
  );
}
