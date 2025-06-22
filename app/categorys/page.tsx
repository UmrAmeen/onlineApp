"use server";

import db from "../lib/sqlite/db";
import CategoryList from "./categoryList";

export default async function AllProducts(
  prevFormState: any,
  formData: FormData,
) {
  const rows = db.prepare(`SELECT * FROM category WHERE parent_id = 'null'`).all();
  // console.log("data",data)
  return (
    <>
      <CategoryList rows={rows} />
    </>
  );
}
