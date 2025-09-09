"use client";
import { useActionState, useState } from "react";
import slugify from "slugify";
import { CreateProductForm } from "@/app/productFormaction";
import ImageSelector from "./tabimageuplode";


interface RowType {
  [key: string]: any;
}

export default function NewProduct({ categoryRows, Images }: any) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [editSlug, setEditSlug] = useState(false);

  const [state, formAction, isPending] = useActionState(CreateProductForm, {
    success: false,
    error: "",
  });
  const handleNameChange = (e: any) => {
    setName(e.target.value);
    setSlug(slugify(e.target.value.trim(), { replacement: "_", lower: true }));
  };

  const handleSlugChange = (e: any) => {
    setSlug(e.target.value);
  };

  return (
    <div>
      {state.success ? <div>✅ Success</div> : <div>{state.error}</div>}
      <form className="myFormPage" action={formAction}>
        <label>
          Name:
          <input
            name="name"
            placeholder="Product Name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </label>

        <label className="slug-label">
          Slug:
          <div className="input-button-container">
            <input
              name="slug"
              placeholder="slug"
              value={slug}
              onChange={handleSlugChange}
              readOnly={!editSlug}
              required
            />
            <button type="button" onClick={() => setEditSlug(!editSlug)}>
              {editSlug ? "Save" : "Edit"}
            </button>
          </div>
        </label>
        <label>
          {/* <ImageUploadModal Images={Images} /> */}
        <ImageSelector Images={Images}/>
        </label>

        <label>
          Category:
          <select name="categoryId" required>
            {categoryRows?.map((row: RowType) => (
              <option key={row.id} value={row.id}>
                {row.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Price:
          <input type="number" name="price" placeholder="Price" required />
        </label>

        <label>
          Description:
          <textarea
            rows={3}
            name="description"
            placeholder="Add description"
            required
          />
        </label>

        <button type="submit" className="submitButton" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
