"use server";
import db from "./lib/sqlite/db";

export async function CreateSignUpForm(prevFormState: any, formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const phoneNumber = formData.get("phoneNumber");

  const insert = db.prepare(
    "INSERT INTO signUp(name,email,phoneNumber) VALUES(?,?,?)"
  );
  console.log("name", name);
  const result = insert.run(name, email, phoneNumber);

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
