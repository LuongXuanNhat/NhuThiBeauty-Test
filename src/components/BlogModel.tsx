import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Blog } from "@/model/blog";
import ImageModal from "./ImageModel";

interface BlogModalProps {
  isOpen: boolean;
  blog: Blog;
  onClose: () => void;
}

const BlogModal: React.FC<BlogModalProps> = ({ isOpen, blog, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isImageSectionFixed, setIsImageSectionFixed] = useState(false);

  // Reset selected image when blog changes
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [blog.id]);

  // Handle escape key and body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Format date
  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  };

  // Helper function tạo slug
  const createSlug = (title: string): string => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  // Get current blog URL
  const getBlogUrl = () => {
    if (typeof window !== "undefined") {
      const slug = createSlug(blog.title);
      const baseUrl = window.location.origin;
      return `${baseUrl}/stories/${blog.id}/${slug}`;
    }
    return "";
  };

  // Copy link function - sử dụng URL SEO-friendly
  const handleCopyLink = async () => {
    try {
      const blogUrl = getBlogUrl();
      await navigator.clipboard.writeText(blogUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
      // Fallback for browsers không support clipboard API
      try {
        const textArea = document.createElement("textarea");
        textArea.value = getBlogUrl();
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (fallbackErr) {
        console.error("Fallback copy failed:", fallbackErr);
      }
    }
  };

  // Handle image click
  const handleImageClick = () => {
    if (blog.images && blog.images.length > 0) {
      setIsImageModalOpen(true);
    }
  };

  // Toggle image section position on mobile
  const toggleImageSection = () => {
    setIsImageSectionFixed(!isImageSectionFixed);
  };

  if (!isOpen) return null;

  const ImageSection = () => (
    <div className="flex-1 relative">
      {/* Main Image */}
      <div
        className="relative h-64 md:h-80 lg:h-full w-full bg-gray-100 overflow-hidden cursor-pointer group"
        onClick={handleImageClick}
      >
        <Image
          src={blog.images![selectedImageIndex]}
          alt={`${blog.title} - Image ${selectedImageIndex + 1}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {blog.images!.length > 1 && (
        <div className="flex gap-2 p-2 overflow-x-auto absolute bottom-0 w-full">
          {blog.images!.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImageIndex === index
                  ? "border-pink-500"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-40 p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-pink-500 to-rose-500 text-white p-6">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-all"
              aria-label="Đóng modal"
            >
              ×
            </button>

            <h1 className="text-center text-base md:text-2xl font-bold pr-12 text-shadow-2xs">
              {blog.title}
            </h1>
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row h-full max-h-[calc(90vh-180px)] min-h-96 overflow-hidden relative">
            {/* Left Column - Content */}
            <div className="flex-1 lg:w-1/2 px-6 pt-2 overflow-y-auto">
              <div className="mb-2">
                <div className="flex items-center">
                  <button
                    title="Sao chép link"
                    onClick={handleCopyLink}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      copySuccess
                        ? "bg-green-100 text-green-700"
                        : "bg-pink-100 text-pink-700 hover:bg-pink-200"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                  {blog.date && (
                    <span className="text-sm ml-2">
                      {formatDate(blog.date)}
                    </span>
                  )}
                </div>

                {blog.subTitle && (
                  <span className="text-sm opacity-90 italic">
                    {blog.subTitle}
                  </span>
                )}
              </div>
              <div
                className="prose prose-sm md:prose-base max-w-none text-gray-700 leading-relaxed mb-5"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Images at bottom on mobile when not fixed */}
              {blog.images &&
                blog.images.length > 0 &&
                !isImageSectionFixed && (
                  <div className="lg:hidden mt-6">
                    <ImageSection />
                  </div>
                )}
            </div>

            {/* Right Column - Images (Desktop always visible + Mobile when fixed) */}
            {blog.images && blog.images.length > 0 && (
              <>
                {/* Desktop version - always visible */}
                <div className="hidden lg:flex flex-1 lg:w-1/2 flex-col border-t lg:border-t-0 lg:border-l border-gray-200 relative">
                  <ImageSection />
                </div>

                {/* Mobile fixed version */}
                {isImageSectionFixed && (
                  <div className="lg:hidden flex-1 lg:w-1/2 flex flex-col border-t lg:border-t-0 lg:border-l border-gray-200 relative">
                    <ImageSection />
                  </div>
                )}
              </>
            )}

            {/* Floating Image Toggle Button (Mobile only) */}
            {blog.images && blog.images.length > 0 && (
              <button
                onClick={toggleImageSection}
                className="lg:hidden fixed bottom-6 right-6 z-50 bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
                title={isImageSectionFixed ? "Ẩn hình ảnh" : "Hiện hình ảnh"}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {blog.images && blog.images.length > 0 && (
        <ImageModal
          isOpen={isImageModalOpen}
          imageUrl={blog.images[selectedImageIndex]}
          onClose={() => setIsImageModalOpen(false)}
        />
      )}
    </>
  );
};

export default BlogModal;
