"use client";
import { CreateCategoryForm } from "@/app/categoryFormaction";
import { useActionState, useState } from "react";
import slugify from "slugify";

interface RowType {
  [key: string]: any;
}
export default function NewCategory({ categoryRows }: any) {
  const [file, setFile] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [editSlug, setEditSlug] = useState(false);

  const [state, formAction, isPending] = useActionState(CreateCategoryForm, {
    success: false,
    error: "",
  });
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

  return (
    <>
      {state.success ? <div>Success</div> : <div>{state.error}</div>}
      <form className="myFormPage" action={formAction}>
        <label>
          name:
          <input
            name="name"
            placeholder="name"
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
          <select name="parentId">
            <option value="">No Parent</option>
            {categoryRows?.map((row: RowType) => (
              <option key={row.id} value={row.id}>
                {row.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="submitButton" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
}
