import db from "@/app/lib/sqlite/db";
import ProductList from "../productList";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ProductPage({ params }: { params: any }) {
  const productId = (await params).productId;
  // const productRow = db
  //   .prepare(
  //     "SELECT products.*, category.name as categoryName FROM products JOIN category ON products.categoryId = category.id WHERE products.id = ?"
  //   )
  //   .get(productId);
  const rows = db
    .prepare(`SELECT * FROM products WHERE categoryId = ? `)
    .all(productId);

  // console.log("rows", rows);
  // if (!productRow) {
  //   notFound();
  // }

  return (
    <div className="productsDiv">
      <div className="productsDiv">
          {rows.length > 0 ? (
            <ProductList rows={rows} />
          ) : (
            <div>
              <Link href="/products">
                <button className="categoryIdButton">Go to products</button>
              </Link>
            </div>
          )}
        </div>

      {/* <div className="myproduct">
        <img src={productRow.image} />
        <h1>{productRow.name}</h1>
        <p>Category: {productRow.categoryName}</p>
      </div> */}
    </div>
  );
}
