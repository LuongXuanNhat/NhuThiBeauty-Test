"use client";

import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { reviewDataSource } from "@/utils/reviewDataSource";
import { Review } from "@/model/review";
import { InitialAvatar } from "@/components/Avatar";
import Pagination from "@/components/pagination";
import {
  getMetadataByPath,
  useDynamicMetadata,
} from "@/hooks/useDynamicMetadata";
import ImageModal from "@/components/ImageModel";
import { Metadata } from "next";
import ReviewModel from "@/components/ReviewModel";

// Component Card Review đơn lẻ
interface ReviewCardProps {
  review: Review;
  onReviewClick: (review: Review) => void;
}

export const metadata: Metadata = getMetadataByPath("/reviews");

const ReviewCard: React.FC<ReviewCardProps> = ({ review, onReviewClick }) => {
  useDynamicMetadata();

  const [selectedImage, setSelectedImage] = useState<StaticImageData | null>(
    null
  );
  
  useEffect(() => {
    if (review && review.images && review.images.length > 0) {
      setSelectedImage(review.images[0]);
    }
  }, [review]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Format date theo định dạng dd-MM-yyyy
  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleThumbnailClick = (image: StaticImageData, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const handleImageClick = (displayImage: StaticImageData) => {
    if (selectedImage) {
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const displayImage = selectedImage || (review.images && review.images[0]);
  
  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full mx-auto">
        {/* Header - Avatar và thông tin */}
        <div className="p-4 pb-3">
          <div className="flex items-center gap-3">
            <InitialAvatar
              name={review.name}
              avatar={review.avatar}
              size={48}
            />
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">
                {review.name}
              </h3>
            </div>
          </div>
        </div>

        {/* Date */}
        <div className="px-4 pb-3 flex justify-between text-xs items-center">
          <p className=" text-gray-500">{formatDate(review.date)}</p>
          <button onClick={() => onReviewClick(review)} className="bg-green-50 text-shadow-2xs rounded-xl py-1 px-2 text-green-700 shadow">
          xem riêng
        </button>
        </div>

        {/* Content */}
        <div className="px-4 pb-4">
          <p className="text-sm text-gray-700 leading-relaxed">
            {review.content}
          </p>
        </div>

        {/* Image section */}
        {displayImage && (
          <div className="relative">
            <div className="aspect-square relative bg-gray-100">
              <Image
                src={displayImage}
                alt="Review image"
                fill
                className="object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => handleImageClick(displayImage)}
              />

              {/* Thumbnail navigation overlay */}
              {review.images && review.images.length > 1 && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/15 p-2">
                  <div className="flex gap-1 overflow-x-auto">
                    {review.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => handleThumbnailClick(image, index)}
                        className={`flex-shrink-0 w-8 h-8 rounded border-2 overflow-hidden ${
                          currentImageIndex === index
                            ? "border-pink-500"
                            : "border-white border-opacity-50"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Empty state for no images */}
        {!displayImage && (
          <div className="aspect-square bg-gray-100 flex items-center justify-center">
            <span className="text-sm text-gray-400">Không có ảnh</span>
          </div>
        )}
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        imageUrl={selectedImage!}
        onClose={handleModalClose}
      />
    </>
  );
};

// Component chính hiển thị tất cả reviews với phân trang
interface ReviewsPageProps {
  itemsPerPageOptions?: number[];
}

const ReviewsPage: React.FC<ReviewsPageProps> = ({
  itemsPerPageOptions = [10, 20, 50],
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  
  // Sắp xếp reviews theo date mới nhất
  const sortedReviews = [...reviewDataSource].sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date.getTime() - a.date.getTime();
  });

  // Tính toán phân trang
  const totalItems = sortedReviews.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReviews = sortedReviews.slice(startIndex, endIndex);

  // Chia reviews hiện tại thành các hàng, mỗi hàng 3 items
  const groupedReviews = [];
  for (let i = 0; i < currentReviews.length; i += 3) {
    groupedReviews.push(currentReviews.slice(i, i + 3));
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset về trang đầu tiên
  };

  useEffect(() => {
  const handleInitialRoute = () => {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split("/");

    if (pathParts.length >= 3 && pathParts[1] === "reviews" && pathParts[2]) {
      const blogId = parseInt(pathParts[2]);
      const blog = reviewDataSource.find((b) => b.id === blogId);
      if (blog) {
        setSelectedReview(blog);
        setIsReviewModalOpen(true);
      }
    }
  };

  const handlePopState = () => {
    const currentPath = window.location.pathname;
    if (currentPath === "/reviews") {
      setIsReviewModalOpen(false);
      setSelectedReview(null);
    } else {
      handleInitialRoute();
    }
  };

  handleInitialRoute();
  window.addEventListener("popstate", handlePopState);

  return () => {
    window.removeEventListener("popstate", handlePopState);
  };
  }, []);

      const createSlug = (title: string): string => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Bỏ dấu tiếng Việt
      .replace(/[đĐ]/g, "d") // Chuyển đ thành d
      .replace(/[^a-z0-9\s-]/g, "") // Chỉ giữ lại chữ cái, số, khoảng trắng và dấu gạch ngang
      .replace(/\s+/g, "-") // Chuyển khoảng trắng thành dấu gạch ngang
      .replace(/-+/g, "-") // Loại bỏ nhiều dấu gạch ngang liên tiếp
      .trim();
  };
  const handleReviewClick = (review: Review) => {
  const slug = createSlug(review.name);
  setSelectedReview(review);
  setIsReviewModalOpen(true);
  window.history.pushState({}, "", `/reviews/${review.id}/${slug}`);
};

const handleCloseModal = () => {
  setIsReviewModalOpen(false);
  setSelectedReview(null);
  window.history.pushState({}, "", "/reviews");
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Đánh Giá Từ Khách Hàng
          </h1>
          <p className="text-gray-600">
            Những phản hồi chân thực từ khách hàng của Nhu Thi Spa & Beauty
          </p>
        </div>

        {/* Reviews Grid */}
        {currentReviews.length > 0 ? (
          <>
            <div className="space-y-8">
              {groupedReviews.map((reviewGroup, groupIndex) => (
                <div
                  key={groupIndex}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {reviewGroup.map((review, index) => (
                    <ReviewCard
                      key={`${startIndex + groupIndex * 3 + index}`}
                      review={review}
                      onReviewClick={handleReviewClick} 
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
              itemsPerPageOptions={itemsPerPageOptions}
            />
          </>
        ) : (
          /* Empty state */
          <div className="text-center py-12">
            <p className="text-gray-500">Chưa có đánh giá nào.</p>
          </div>
        )}
      </div>
       {/* Review Modal */}
{selectedReview && (
  <ReviewModel
    isOpen={isReviewModalOpen}
    review={selectedReview}
    onClose={handleCloseModal}
  />
)}
    </div>
  );
};

export default ReviewsPage;
