"use client";

import { CreateProductForm } from "@/app/productFormaction";
import { useActionState } from "react";

export default function ProductForm({rows}:any) {
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
          <select>
            {rows.map((row) => (
              <option key={row.id}>{row.name}</option>
            ))}
          </select>
        </label>
        <label>
          price:
          <input type="number" name="price" placeholder="price" />
        </label>
        <label>
          description :
          <textarea rows={3} name="description" placeholder="add description" />
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
