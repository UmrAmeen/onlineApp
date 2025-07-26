import db from "@/app/lib/sqlite/db";
import Link from "next/link";
import ProductIdList from "../prodctIdList";

interface RowType {
  [key: string]: any;
}
export default async function ProductPage({ params }: { params: any }) {
  const productSlug = (await params).productSlug;
  // console.log("productSlug", productSlug);
  const rows = db
    .prepare(`SELECT * FROM products WHERE slug = ? `)
    .all(productSlug);

  const rowsWithBase64Images = rows.map((row: RowType) => {
    const base64Image = row.image.toString("base64");
    const { image, ...rest } = row;

    return {
      ...rest,
      base64Image: `data:image/jpeg;base64,${base64Image}`,
    };
  });

  return (
    <div className="productsDiv">
      {rowsWithBase64Images.length > 0 ? (
        <ProductIdList rows={rowsWithBase64Images} />
      ) : (
        <div className="AddToProducts">
          <Link href="/products/productForm">
            <button className="AddToProductsButton">add to products</button>
          </Link>
        </div>
      )}
    </div>
  );
}
