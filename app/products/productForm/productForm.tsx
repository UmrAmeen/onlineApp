"use client";

import { CreateProductForm } from "@/app/productFormaction";
import { useActionState } from "react";

export default function ProductForm() {
  const [state, formAction, isPending] = useActionState(CreateProductForm, {
    success: false,
    error: "",
  });
  return (
    <div>
      {state.success ? <div>Success</div> : <div>{state.error}</div>}
      <form className="myFormPage">
        <label>
          name:
          <input name="name" placeholder="productName" />
        </label>

        <label>
          image:
          <input name="image" placeholder="image" />
        </label>
        <label>
          category
          <input name="category" placeholder="category" />
        </label>
        <label>
          price:
          <input name="price" placeholder="price" />
        </label>
        <label>
          description :
          <input name="description" placeholder="add description" />
        </label>
        <button
          type="submit"
          className="submitButton"
          disabled={isPending}
          formAction={formAction}
        >
          submit
        </button>
      </form>
    </div>
  );
}
