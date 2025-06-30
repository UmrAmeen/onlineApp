import db from "@/app/lib/sqlite/db";
import ProductList from "../productList";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: any }) {
  const productId = await params.productId;
  const productRow = db
    .prepare(
      "SELECT products.*, category.name as categoryName FROM products JOIN category ON products.categoryId = category.id WHERE products.id = ?"
    )
    .get(productId);

  if (!productRow) {
    notFound();
  }
  if (!productRow || productRow.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <div className="productsDiv">
      {/* {productRow.map((product) => (
          <div key={product.id}>
            <h1>{product.name}</h1>
            <p>Category: {product.categoryName}</p>
            <img src={product.image} />
          </div>
        ))} */}
      <div className="myproduct">
         <img src={productRow.image} />
        <h1>{productRow.name}</h1>
        <p>Category: {productRow.categoryName}</p>
       
      </div>
    </div>
  );
}
