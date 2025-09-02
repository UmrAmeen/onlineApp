"use client";
import { useActionState, useState, useEffect } from "react";
import slugify from "slugify";
import { CreateProductForm } from "@/app/productFormaction";

interface RowType {
  [key: string]: any;
}

export default function NewProduct({ categoryRows, Images }: any) {
  const [file, setFile] = useState<string | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [editSlug, setEditSlug] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDBImages, setShowDBImages] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
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

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFile(URL.createObjectURL(file));
      setSelectedImageId(null);
      setSelectedImageUrl(null);
    }
    setIsModalOpen(false);
    setShowDBImages(false);
  };
  //  console.log("images", Images);
  const handleImageSelect = (id: string, url: string) => {
    setSelectedImageId(id);
    setSelectedImageUrl(url);
    setFilePreview(null);
    setIsModalOpen(false);
    setShowDBImages(false);
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

        <label className="img-label">
          Image:
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            onClick={() => setIsModalOpen(true)}
          >
            Add Image
          </button>
          {file && (
            <img
              className="mt-2 w-32 h-32 object-cover"
              src={file}
              alt="Uploaded preview"
            />
          )}
          {filePreview && (
            <img src={filePreview} className="w-32 h-32 mt-2" alt="Preview" />
          )}
          {!file && selectedImageUrl && (
            <img
              className="mt-2 w-32 h-32 object-cover"
              src={selectedImageUrl}
              alt="Selected DB preview"
            />
          )}
        </label>

        <input
          type="file"
          name="image"
          accept="image/*"
          className="hidden"
          id="fileInput"
          onChange={handleFileChange}
        />

       <input type="hidden" name="selectedImageId" value={selectedImageId ?? ""} />

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
              <h2 className="text-lg font-bold mb-4">Choose Image</h2>
              {!showDBImages ? (
                <div className="flex flex-col gap-4">
                  <button
                    type="button"
                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                    onClick={() =>
                      document.getElementById("fileInput")?.click()
                    }
                  >
                    Upload from Device
                  </button>
                  <button
                    type="button"
                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                    onClick={() => setShowDBImages(true)}
                  >
                    Select from Database
                  </button>
                  <button
                    type="button"
                    className="text-red-500 hover:underline mt-4"
                    onClick={() => {
                      setIsModalOpen(false);
                      setShowDBImages(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <p className="mb-2 font-semibold">Select an Image:</p>
                  <div className="grid grid-cols-3 gap-4">
                    {Images?.map((img:RowType) => (
                      <div key={img.id}>
                        <img
                          src={img.url}
                          alt={img.url}
                          className="w-24 h-24 object-cover border"
                          onClick={() => handleImageSelect(img.id, img.url)}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="text-red-500 hover:underline mt-4"
                    onClick={() => setShowDBImages(false)}
                  >
                    Back
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

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
