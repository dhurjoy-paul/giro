import axios from "axios";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";

function hexWithOpacity(hex, opacity = 1) {
  if (!hex?.startsWith("#") || hex.length !== 7) return hex
  const alpha = Math.round(opacity * 255).toString(16).padStart(2, "0")
  return hex + alpha
}

export default function CloudinaryUploader({
  onUploadComplete,
  maxFiles = 5,
  folder = "",
  label = "Upload Images",
  mode = "multiple",
  className = "",

  // Color Customizations
  accentColor = "#2563eb", // HEX
  bgColor = "bg-white",     // Tailwind class
  bgColorDark = "dark:bg-neutral-900", // Tailwind class

  // Drag text color customizations
  dragTextColor = "#1f2937",       // e.g. slate-800
  dragTextColorDark = "#f1f5f9",   // e.g. slate-100
}) {
  const [selectedImages, setSelectedImages] = useState([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const isDarkTheme =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: dark)")?.matches

  const handleFiles = (files) => {
    const valid = Array.from(files).filter((file) => file.type.startsWith("image/"))
    const allowed = valid.slice(0, maxFiles - selectedImages.length)
    setSelectedImages((prev) => [...prev, ...allowed])
  }

  const removeImage = (index) => {
    const updated = [...selectedImages]
    updated.splice(index, 1)
    setSelectedImages(updated)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)
  const handleFileChange = (e) => handleFiles(e.target.files)

  const handleUpload = async () => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

    const urls = []

    for (let i = 0; i < selectedImages.length; i++) {
      const file = selectedImages[i]
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", uploadPreset)
      if (folder) formData.append("folder", folder)

      try {
        const { data } = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData,
          {
            onUploadProgress: (e) => {
              const percent = Math.round((e.loaded * 100) / e.total)
              setUploadProgress(percent)
            },
          }
        )
        urls.push(data.secure_url)
      } catch (err) {
        console.error("Upload failed for", file.name, err)
      }
    }

    setSelectedImages([])
    setUploadProgress(0)

    if (mode === "single") {
      onUploadComplete?.(urls[0] || null)
    } else {
      onUploadComplete?.(urls)
    }
  }

  return (
    <div className={`w-full ${className}`}>
      <h2 className="font-normal mb-2 text-text/60 text-[17px]">{label}</h2>

      {/* Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition
          ${bgColor} ${bgColorDark}
        `}
        style={{
          borderColor: isDragging ? accentColor : "#d1d5db",
          backgroundColor: isDragging
            ? hexWithOpacity(accentColor, isDarkTheme ? 0.2 : 0.08)
            : undefined,
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <p
          style={{
            color: isDragging
              ? hexWithOpacity(isDarkTheme ? dragTextColorDark : dragTextColor, 0.5)
              : isDarkTheme
                ? dragTextColorDark
                : dragTextColor,
          }}
        >
          Drag & drop or{" "}
          <label className="cursor-pointer underline" style={{ color: accentColor }}>
            browse
            <input
              type="file"
              accept="image/*"
              multiple={mode !== "single"}
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </p>
      </div>

      {/* Previews */}
      {selectedImages.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-4">
          {selectedImages.map((file, idx) => (
            <div key={idx} className="relative group">
              <img
                src={URL.createObjectURL(file)}
                alt={`preview-${idx}`}
                className="rounded-md w-full h-24 object-cover border"
              />
              <button
                onClick={() => removeImage(idx)}
                className="absolute top-1 right-1 bg-white border border-gray-300 rounded-full p-1 text-gray-700 hover:text-red-600 hover:border-red-600 transition"
              >
                <FaXmark size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      {selectedImages.length > 0 && (
        <div className="text-center mt-6">
          <button
            onClick={handleUpload}
            className="text-white px-5 py-2 rounded-md font-medium"
            style={{
              backgroundColor: accentColor,
            }}
          >
            Upload {selectedImages.length} Image{selectedImages.length > 1 ? "s" : ""}
          </button>
        </div>
      )}

      {/* Progress Bar */}
      {uploadProgress > 0 && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-3 rounded-full transition-all duration-200"
              style={{
                width: `${uploadProgress}%`,
                backgroundColor: accentColor,
              }}
            />
          </div>
          <p className="text-sm text-center mt-1">{uploadProgress}%</p>
        </div>
      )}
    </div>
  )
}
