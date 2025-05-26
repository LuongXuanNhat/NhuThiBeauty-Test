import React, { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
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

  // Reset selected image when blog changes
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [blog.id]);

  // Handle escape key
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

  // Get current page URL
  const getCurrentUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}${window.location.pathname}?blog=${blog.id}`;
    }
    return "";
  };

  // Copy link function
  const handleCopyLink = async () => {
    try {
      const blogUrl = getCurrentUrl();
      await navigator.clipboard.writeText(blogUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  // Handle image click
  const handleImageClick = () => {
    if (blog.images && blog.images.length > 0) {
      setIsImageModalOpen(true);
    }
  };

  // Generate meta description from content
  const getMetaDescription = (content: string): string => {
    // Remove HTML tags and get first 160 characters
    const textContent = content.replace(/<[^>]*>/g, "").trim();
    return textContent.length > 160
      ? textContent.substring(0, 157) + "..."
      : textContent;
  };

  // Get the first image for og:image
  const getOgImage = (): string => {
    if (blog.images && blog.images.length > 0) {
      // Ensure absolute URL
      const imageUrl = blog.images[0];
      if (imageUrl.src.startsWith("http")) {
        return imageUrl.src;
      }
      // Convert relative URL to absolute
      if (typeof window !== "undefined") {
        return `${window.location.origin}${imageUrl}`;
      }
    }
    // Fallback to default image
    return typeof window !== "undefined"
      ? `${window.location.origin}/images/nhu-thi-spa-default.jpg`
      : "";
  };

  if (!isOpen) return null;

  const currentUrl = getCurrentUrl();
  const metaDescription = getMetaDescription(blog.content);
  const ogImage = getOgImage();

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{blog.title} - Nhu Thi Spa & Beauty</title>
        <meta name="description" content={metaDescription} />
        <meta
          name="keywords"
          content="spa, beauty, làm đẹp, chăm sóc da, massage, Nhu Thi Spa"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={`${blog.title} - Nhu Thi Spa & Beauty`}
        />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={blog.title} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="Nhu Thi Spa & Beauty" />
        <meta property="og:locale" content="vi_VN" />
        {blog.date && (
          <meta
            property="article:published_time"
            content={new Date(blog.date).toISOString()}
          />
        )}
        <meta property="article:section" content="Beauty & Spa" />
        <meta property="article:tag" content="spa,beauty,làm đẹp" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${blog.title} - Nhu Thi Spa & Beauty`}
        />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={blog.title} />
        <meta name="twitter:site" content="@nhuthispa" />
        <meta name="twitter:creator" content="@nhuthispa" />

        {/* Additional Meta for Zalo */}
        <meta
          property="zalo:title"
          content={`${blog.title} - Nhu Thi Spa & Beauty`}
        />
        <meta property="zalo:description" content={metaDescription} />
        <meta property="zalo:image" content={ogImage} />

        {/* Additional Meta for better SEO */}
        <meta name="author" content="Nhu Thi Spa & Beauty" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={currentUrl} />

        {/* Structured Data for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: blog.title,
              description: metaDescription,
              image: ogImage,
              author: {
                "@type": "Organization",
                name: "Nhu Thi Spa & Beauty",
              },
              publisher: {
                "@type": "Organization",
                name: "Nhu Thi Spa & Beauty",
                logo: {
                  "@type": "ImageObject",
                  url:
                    typeof window !== "undefined"
                      ? `${window.location.origin}/images/logo.png`
                      : "",
                },
              },
              datePublished: blog.date ? new Date(blog.date).toISOString() : "",
              dateModified: blog.date ? new Date(blog.date).toISOString() : "",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": currentUrl,
              },
            }),
          }}
        />
      </Head>

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
            >
              ×
            </button>

            <h1 className="text-xl md:text-2xl font-bold mb-3 pr-12">
              {blog.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-pink-100">
              {blog.date && (
                <span className="text-sm">{formatDate(blog.date)}</span>
              )}
              {blog.date && blog.subTitle && (
                <span className="hidden sm:inline">•</span>
              )}
              {blog.subTitle && (
                <span className="text-sm opacity-90">{blog.subTitle}</span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row h-full max-h-[calc(90vh-140px)] min-h-96 overflow-hidden">
            {/* Left Column - Content */}
            <div className="flex-1 lg:w-1/2 p-6 overflow-y-auto">
              <div
                className="prose prose-sm md:prose-base max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>

            {/* Right Column - Images */}
            {blog.images && blog.images.length > 0 && (
              <div className="flex-1 lg:w-1/2 p-6 flex flex-col border-t lg:border-t-0 lg:border-l border-gray-200 relative">
                {/* Main Image */}
                <div className="flex-1 mb-4">
                  <div
                    className="relative h-64 md:h-80 lg:h-full w-full bg-gray-100 rounded-lg overflow-hidden cursor-pointer group"
                    onClick={handleImageClick}
                  >
                    <Image
                      src={blog.images[selectedImageIndex]}
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
                  {blog.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2 absolute bottom-0">
                      {blog.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`flex-shrink-0 relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                            selectedImageIndex === index
                              ? "border-pink-500 ring-2 ring-pink-200"
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
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="m-6 border border-pink-400 rounded-lg absolute bottom-0">
            <div className="flex justify-between items-center">
              <button
                onClick={handleCopyLink}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  copySuccess
                    ? "bg-green-100 text-green-700"
                    : "bg-pink-100 text-pink-700 hover:bg-pink-200"
                }`}
              >
                {copySuccess ? "Đã sao chép!" : "Sao chép link"}
              </button>
            </div>
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
