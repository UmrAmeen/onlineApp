"use client";
import { CreateProductForm } from "@/app/productFormaction";
import { useActionState, useState } from "react";
import slugify from "slugify";

interface RowType {
  [key: string]: any;
}

export default function NewProductForm({ categoryRows }: any) {
  const [file, setFile] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [editSlug, setEditSlug] = useState(false);
 
  const handleNameChange = (e: any) => {
    setName(e.target.value);
    setSlug(slugify(e.target.value.trim(), "_"));
  };
  function handleChange(e: any) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const handleSlugChange = (e: any) => {
    setSlug(e.target.value);
  };

  const [state, formAction, isPending] = useActionState(CreateProductForm, {
    success: false,
    error: "",
  });

  return (
    <div>
      {state.success ? <div>Success</div> : <div>{state.error}</div>}
      <form className="myFormPage" action={formAction}>
        <label>
          name:
          <input
            name="name"
            placeholder="productName"
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <label className="slug-label">
          <span className="slug-text">slug:</span>
          <div className="input-button-container">
            <input
              name="slug"
              placeholder="slug"
              value={slug}
              onChange={handleSlugChange}
              readOnly={!editSlug}
            />
            <button
              className="slug-button"
              type="button"
              onClick={() => setEditSlug(!editSlug)}
            >
              {editSlug ? "Save" : "Edit"}
            </button>
          </div>
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
          <select name="category">
            {categoryRows.map((row: RowType) => (
              <option key={row.id} value={row.name}>
                {row.name}
              </option>
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
        <button type="submit" className="submitButton" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
