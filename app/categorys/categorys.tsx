import db from "../lib/sqlite/db";
import CategoryList from "./categoryList";

export default function Categorys() {
  const rows = db
    .prepare(`SELECT * FROM category WHERE parent_id = 'null'`)
    .all();
  return (
    <>
      <CategoryList rows={rows} />
    </>
  );
}
