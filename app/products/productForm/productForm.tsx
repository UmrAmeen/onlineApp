"use client";

import { CreateProductForm } from "@/app/productFormaction";
import { useActionState, useState } from "react";

interface RowType {
  [key: string]: any;
}
export default function ProductForm({ categoryRows, productRows }: any) {
  const [file, setFile] = useState(null);
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const [state, formAction, isPending] = useActionState(CreateProductForm, {
    success: false,
    error: "",
  });

  return (
    <div>
      {state.success ? <div>Success</div> : <div>{state.error}</div>}
      <form className="myFormPage" encType="multipart/form-data">
        <label>
          name:
          <input name="name" placeholder="productName" />
        </label>
        <label>
          slug:
          <input name="slug" placeholder="slug" />
        </label>

        <label className="img-label">
          image:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
          {file && (
            <img className="preview-image" src={file} alt="Uploaded preview" />
          )}
        </label>
        <label>
          category
          <select>
            {categoryRows.map((row: RowType) => (
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
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
