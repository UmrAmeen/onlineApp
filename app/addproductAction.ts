"use server";

import db from "./lib/sqlite/db";

export default async function CreateNewProducts(
  prevFormState: any,
  formData: FormData
) {
  const fullname = formData.get("fullname");
  const email = formData.get("email");
  const phoneNumber = formData.get("phoneNumber");
  const brandName = formData.get("brandName")
  const url =formData.get("url")
  const insert = db.prepare(
    "INSERT INTO addproducts(fullname,email,phoneNumber,brandName,url) VALUES(?,?,?,?,?)"
  );
  const result = insert.run(fullname, email, phoneNumber,brandName,url);

  if (result.lastInsertRowid) {
    return {
      success: true,
      error: "",
    };
  }
  return {
    success: false,
    error: "Something went wrong!",
  };
}
