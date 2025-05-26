"use server";
import db from "./lib/sqlite/db";

export async function CreateSignUpForm(prevFormState: any, formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email")
  const number = formData.get("number")

  
  const insert = db.prepare("INSERT INTO signUp(name,email,number) VALUES(?,?,?)");
  console.log("name",name)
  const result = insert.run(name, email,number);

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
