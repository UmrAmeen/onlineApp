import db from "@/app/lib/sqlite/db";
import ProductIdList from "../prodctIdList";

export default async function ProductPage({ params }: { params: any }) {
  const productSlug = (await params).productSlug;
  const row = db
    .prepare(
      `SELECT products.*, images.image 
     FROM products 
     LEFT JOIN images ON products.image_id = images.id 
     WHERE products.slug = ?`
    )
    .get(productSlug);
  // console.log("row", row)
  if (!row) {
    return <p>No product found for slug: {productSlug}</p>;
  }

  const base64Image = `data:image/jpeg;base64,${Buffer.from(row.image).toString("base64")}`;
  const { image, ...restProduct } = row;

  const productWithImage = {
    ...restProduct,
    base64Image,
  };

  return (
    <div className="productsDiv">
      <ProductIdList row={productWithImage} />
    </div>
  );
}
