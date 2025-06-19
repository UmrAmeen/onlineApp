import db from "@/app/lib/sqlite/db";
import { notFound } from "next/navigation";
import ProductList from "../productList";

export default async function CategoryId({ params }: { params: any }) {
  const p = await params;
  // console.log("p", p);

  const categoryId = p.categoryId;
  const categoryRow = db.prepare(`SELECT * FROM category WHERE  id = ?`).get(categoryId);

  if (!categoryRow) {
    notFound();
  }

  // console.log("categoryRow", categoryRow);

  const rows = db.prepare(`SELECT * FROM category WHERE  parent_id = 'categoryRow'`).all();
  console.log("rows", rows);

  return (
    <div className="productsDiv">
      <div>
        <h2>{categoryRow.name}</h2>
      </div>
      <div>
        <ProductList rows={rows} />
      </div>
    </div>
  );
}
