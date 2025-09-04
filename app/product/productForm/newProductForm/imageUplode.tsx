"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
interface RowType {
  [key: string]: any;
}
export default function ImageUploadModal({ Images }: any) {
  const [file, setFile] = useState<string | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [showDBImages, setShowDBImages] = useState(false);

  const [tempSelectedImageId, setTempSelectedImageId] = useState<string | null>(
    null
  );
  const [tempSelectedImageUrl, setTempSelectedImageUrl] = useState<
    string | null
  >(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleFileChange = (e: any) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const fileURL = URL.createObjectURL(uploadedFile);
      setFilePreview(fileURL);
      setTempSelectedImageId(null);
      setTempSelectedImageUrl(null);
    }
  };

  const confirmImageSelection = () => {
    if (filePreview) {
      setFile(filePreview);
      setSelectedImageId(null);
      setSelectedImageUrl(null);
    } else if (tempSelectedImageId && tempSelectedImageUrl) {
      setSelectedImageId(tempSelectedImageId);
      setSelectedImageUrl(tempSelectedImageUrl);
      setFile(null);
    }

    setOpen(false);
    setShowDBImages(false);
    setFilePreview(null);
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-green-500 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-green-600"
      >
        Add image
      </button>

      {file && (
        <img
          className="mt-2 w-32 h-32 object-cover"
          src={file}
          alt="Uploaded preview"
        />
      )}

      {!file && selectedImageUrl && (
        <img
          className="mt-2 w-32 h-32 object-cover"
          src={selectedImageUrl}
          alt="Selected DB preview"
        />
      )}

      <input
        type="file"
        name="image"
        accept="image/*"
        className="hidden"
        id="fileInput"
        onChange={handleFileChange}
      />

      <input
        type="hidden"
        name="selectedImageId"
        value={selectedImageId ?? ""}
      />

      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                    <ExclamationTriangleIcon
                      aria-hidden="true"
                      className="size-6 text-red-600"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      Add your Image
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Choose or upload an image to display.
                      </p>
                    </div>
                  </div>
                </div>

                {(filePreview || tempSelectedImageUrl) && (
                  <>
                    <div className="flex justify-center mt-4">
                      <img
                        src={filePreview ?? tempSelectedImageUrl!}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded border"
                      />
                    </div>
                    <button
                      type="button"
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={confirmImageSelection}
                    >
                      OK
                    </button>
                  </>
                )}
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-col sm:gap-4 sm:px-6">
                {!showDBImages ? (
                  <>
                    <button
                      type="button"
                      className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white w-full"
                      onClick={() => {
                        const input = document.getElementById(
                          "fileInput"
                        ) as HTMLInputElement;
                        if (input) {
                          input.value = "";
                          input.click();
                        }
                      }}
                    >
                      Upload from Device
                    </button>

                    <button
                      type="button"
                      className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white w-full"
                      onClick={() => {
                        setFilePreview(null);
                        setShowDBImages(true);
                      }}
                    >
                      Select from Database
                    </button>
                  </>
                ) : (
                  <div>
                    <p className="mb-2 font-semibold">Select an Image:</p>
                    <div className="grid grid-cols-3 gap-4">
                      {Images?.map((img: RowType) => (
                        <label
                          key={img.id}
                          className="flex flex-col items-center cursor-pointer"
                        >
                          <img
                            src={img.url}
                            alt="From DB"
                            className="w-24 h-24 object-cover mt-1 border rounded"
                          />
                          <input
                            type="radio"
                            name="selectedImage"
                            value={img.id}
                            checked={tempSelectedImageId === img.id}
                            onChange={() => {
                              setTempSelectedImageId(img.id);
                              setTempSelectedImageUrl(img.url);
                              setFilePreview(null);
                            }}
                          />
                        </label>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="text-red-500 hover:underline mt-4"
                      onClick={() => {
                        setShowDBImages(false);
                        setTempSelectedImageId(null);
                        setTempSelectedImageUrl(null);
                      }}
                    >
                      Back
                    </button>
                  </div>
                )}

                {(filePreview || tempSelectedImageUrl) && (
                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      className="text-red-500 hover:underline"
                      onClick={() => {
                        setOpen(false);
                        setFilePreview(null);
                        setTempSelectedImageId(null);
                        setTempSelectedImageUrl(null);
                        setShowDBImages(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
