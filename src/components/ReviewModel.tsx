import React, { useState, useEffect, use, useRef } from "react";
import Image from "next/image";
import ImageModal from "./ImageModel";
import { Review } from "@/model/review";
import { InitialAvatar } from "./Avatar";
import {
  init,
  trackClick,
  trackScroll,
  TrackerEnum,
  trackPageView,
} from "tracker-api";
import { usePathname } from "next/navigation";

// init({
//   apiKey: process.env.NEXT_PUBLIC_TRACKING_API_KEY,
// });

interface ReviewModalProps {
  isOpen: boolean;
  review: Review;
  onClose: () => void;
}

const ReviewModel: React.FC<ReviewModalProps> = ({
  isOpen,
  review: review,
  onClose,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef<number>(0);

  // Track modal open and setup scroll listener
  useEffect(() => {
    if (!isOpen) return;

    const trackUserClick = async () => {
      const response = await trackClick({
        page_url: getBlogUrl(),
        event_type: TrackerEnum.EventType.pageview,
        event_name: TrackerEnum.EventName.open_modal,
        browser: navigator.userAgent,
        page_title: review.name,
        element_type: TrackerEnum.EventType.click,
      });
      console.log("Kết quả call api: ", response);
    };

    // Track modal open
    const openTrackTimeout = setTimeout(() => {
      trackUserClick();
    }, 300);

    // Setup scroll tracking
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = (e: Event) => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        scrollEventHandler();
      }, 500); // Delay 500ms after scroll stops
    };

    // Add scroll listener to the content container
    const contentElement = contentRef.current;
    if (contentElement) {
      console.log("Adding scroll listener to content element");
      contentElement.addEventListener("scroll", handleScroll, {
        passive: true,
      });
    }

    // Also find any scrollable containers as fallback
    const modalContent = document.querySelector(".overflow-y-auto");
    if (modalContent && modalContent !== contentElement) {
      console.log("Adding scroll listener to modal content fallback");
      modalContent.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      clearTimeout(openTrackTimeout);
      clearTimeout(scrollTimeout);
      if (contentElement) {
        contentElement.removeEventListener("scroll", handleScroll);
      }
      if (modalContent && modalContent !== contentElement) {
        modalContent.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isOpen, review.id, review.name]);

  // Reset selected image when review changes
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [review.id]);

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

  // Get current review URL
  const getBlogUrl = () => {
    if (typeof window !== "undefined") {
      const slug = createSlug(review.name);
      const baseUrl = window.location.origin;
      return `${baseUrl}/reviews/${review.id}/${slug}`;
    }
    return "";
  };

  const scrollEventHandler = async () => {
    try {
      // Throttle API calls - chỉ gọi mỗi 3 giây
      const now = Date.now();
      if (now - lastScrollTime.current < 3000) {
        console.log("Scroll tracking throttled");
        return;
      }
      lastScrollTime.current = now;

      const contentElement = contentRef.current;
      const scrollInfo = contentElement
        ? {
            scrollTop: contentElement.scrollTop,
            scrollHeight: contentElement.scrollHeight,
            clientHeight: contentElement.clientHeight,
            scrollPercentage: Math.round(
              (contentElement.scrollTop /
                (contentElement.scrollHeight - contentElement.clientHeight)) *
                100
            ),
          }
        : null;

      console.log("Scroll event triggered for review:", review.name);
      console.log("Scroll info:", scrollInfo);
      console.log("Current URL:", getBlogUrl());

      await trackScroll({
        page_url: getBlogUrl(),
        page_title: review.name,
        event_name: `Cuộn trang - ${scrollInfo?.scrollPercentage || 0}%`,
        event_type: TrackerEnum.EventType.scroll,
        browser: navigator.userAgent,
      });

      console.log("Scroll tracking sent successfully");
    } catch (error) {
      console.error("Error tracking scroll:", error);
    }
  };

  // Copy link function - sử dụng URL SEO-friendly
  const handleCopyLink = async () => {
    try {
      const blogUrl = getBlogUrl();
      await navigator.clipboard.writeText(blogUrl);
      setCopySuccess(true);
      await trackPageView({
        page_url: blogUrl,
        page_title: review.name,
        event_name: TrackerEnum.EventName.copy_link,
        event_type: TrackerEnum.EventType.click,
        browser: navigator.userAgent,
      });
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
  const handleImageClick = async () => {
    if (review.images && review.images.length > 0) {
      await trackClick({
        page_url: getBlogUrl(),
        event_type: TrackerEnum.EventType.click,
        event_name: "Xem ảnh",
        browser: navigator.userAgent,
        page_title: review.name,
        element_type: TrackerEnum.EventType.click,
      });
      setIsImageModalOpen(true);
    }
  };

  if (!isOpen) return null;

  const ImageSection = () => (
    <div className="flex-1 relative">
      {/* Main Image */}
      <div
        className="relative h-full md:h-80 lg:h-full w-full bg-gray-100 overflow-hidden cursor-pointer group"
        onClick={handleImageClick}
      >
        <Image
          src={review.images![selectedImageIndex]}
          alt={`${review.name} - Image ${selectedImageIndex + 1}`}
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
      {review.images!.length > 1 && (
        <div className="flex gap-2 p-2 overflow-x-auto absolute bottom-0 w-full">
          {review.images!.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 relative w-10 h-10 rounded-lg overflow-hidden border-2 transition-all ${
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
          className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-pink-500 to-rose-500 shadow p-6">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-all"
              aria-label="Đóng modal"
            >
              ×
            </button>

            <div className="flex text-white items-center">
              <InitialAvatar
                name={review.name}
                avatar={review.avatar}
                size={40}
              />
              <h1 className="ml-2 text-base md:text-2xl font-bold pr-12 text-shadow-xs">
                {review.name}
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row h-full max-h-[calc(100vh-180px)] min-h-96 overflow-hidden relative">
            {/* Left Column - Content */}
            <div
              ref={contentRef}
              className="flex-1 lg:w-1/2 px-6 pt-2 overflow-y-auto"
            >
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
                  {review.date && (
                    <span className="text-sm ml-2">
                      {formatDate(review.date)}
                    </span>
                  )}
                </div>
              </div>
              <div
                className="prose prose-sm md:prose-base max-w-none text-gray-700 leading-relaxed mb-5"
                dangerouslySetInnerHTML={{ __html: review.content }}
              />
            </div>

            {/* Right Column - Images (Desktop always visible + Mobile when fixed) */}
            {review.images && review.images.length > 0 && (
              <>
                {/* Desktop version - always visible */}
                <div className="hidden lg:flex flex-1 lg:w-1/2 flex-col border-t lg:border-t-0 lg:border-l border-gray-200 relative">
                  <ImageSection />
                </div>

                {/* Mobile fixed version */}
                {
                  <div className="lg:hidden flex-1 lg:w-1/2 flex flex-col border-t lg:border-t-0 lg:border-l border-gray-200 relative">
                    <ImageSection />
                  </div>
                }
              </>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {review.images && review.images.length > 0 && (
        <ImageModal
          isOpen={isImageModalOpen}
          imageUrl={review.images[selectedImageIndex]}
          onClose={() => setIsImageModalOpen(false)}
        />
      )}
    </>
  );
};

export default ReviewModel;
