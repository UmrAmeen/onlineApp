import db from "@/app/lib/sqlite/db";
import CategoryList from "../categoryList";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function CategoryId({ params }: { params: any }) {
  const  categoryId  = await params.categoryId;

  console.log("categoryId", categoryId);

  const categoryRow = db
    .prepare(`SELECT * FROM category WHERE  id = ?`)
    .get(categoryId);
  if (!categoryRow) {
    notFound();
  }

  const rows = db
    .prepare(`SELECT * FROM category WHERE parent_id = ? `)
    .all(categoryId);

  return (
    <>
      <div>
        <div>
          <h1>{categoryRow.name}</h1>
        </div>
        <div className="productsDiv">
          {rows.length > 0 ? (
            <CategoryList rows={rows} />
          ) : (
            <div>
              <Link href="/categorys">
                <button className="categoryIdButton">Back to categorys</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
