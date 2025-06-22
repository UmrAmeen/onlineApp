import db from "@/app/lib/sqlite/db";
import { notFound } from "next/navigation";
import CategoryList from "../categoryList";

export default async function CategoryId({ params }: { params: any }) {
  const p = await params;
  // console.log("p", p);

  const categoryId = p.categoryId;
  const categoryRow = db
    .prepare(`SELECT * FROM category WHERE  id = ?`)
    .get(categoryId);
  if (!categoryRow) {
    notFound();
  }

  // const rows = db.prepare(`SELECT * FROM category WHERE parent_id == 'categoryRow' `).all();
  //  console.log("rows", rows);
  const rows = db
    .prepare(`SELECT * FROM category WHERE parent_id == ? `)
    .all(categoryId);
  console.log("rows", rows);
  return (
    <div>
      <div>
        <h1>{categoryRow.name}</h1>
      </div>
      <div className="productsDiv">
        <div>
          <CategoryList rows={rows} />
        </div>
      </div>
    </div>
  );
}
