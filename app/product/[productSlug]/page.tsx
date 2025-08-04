import db from "@/app/lib/sqlite/db";
import ProductIdList from "../prodctIdList";

export default async function ProductPage({ params }: { params: any }) {
  const productSlug = (await params).productSlug;

  const row = db
    .prepare(`SELECT * FROM products WHERE slug = ? `)
    .get(productSlug);

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
