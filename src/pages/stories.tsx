import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Blog } from "@/model/blog";
import { blogDataSource } from "@/utils/blogDataSource";
import Pagination from "@/components/pagination";
import BlogModal from "@/components/BlogModel";
import { useDynamicMetadata } from "@/hooks/useDynamicMetadata";

const StoriesPage: React.FC = () => {
  useDynamicMetadata();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sắp xếp blog theo ngày (mới nhất trước)
  const sortedBlogs = [...blogDataSource].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Tính toán phân trang
  const totalItems = sortedBlogs.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBlogs = sortedBlogs.slice(startIndex, endIndex);

  // Hàm chuyển đổi title thành slug
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

  // Xử lý click vào blog card
  const handleBlogClick = (blog: Blog) => {
    const slug = createSlug(blog.title);
    setSelectedBlog(blog);
    setIsModalOpen(true);
    // Thay đổi URL mà không navigate
    window.history.pushState({}, "", `/stories/${blog.id}/${slug}`);
  };

  // Xử lý đóng modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
    // Trở về URL gốc
    window.history.pushState({}, "", "/stories");
  };

  // Xử lý thay đổi trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Xử lý thay đổi số item per page
  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  // Format ngày
  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  };

  // Xử lý route khi component mount
  useEffect(() => {
    const handleInitialRoute = () => {
      const currentPath = window.location.pathname;
      const pathParts = currentPath.split("/");

      if (pathParts.length >= 3 && pathParts[1] === "stories" && pathParts[2]) {
        const blogId = parseInt(pathParts[2]);
        const blog = blogDataSource.find((b) => b.id === blogId);
        if (blog) {
          setSelectedBlog(blog);
          setIsModalOpen(true);
        }
      }
    };

    const handlePopState = () => {
      const currentPath = window.location.pathname;
      if (currentPath === "/stories") {
        setIsModalOpen(false);
        setSelectedBlog(null);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nhu Thi Stories
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Khám phá những bí kíp chăm sóc da, làm đẹp và chia sẻ về các sản
              phẩm hữu ích
            </p>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentBlogs.map((blog) => (
            <div
              key={blog.id}
              className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => handleBlogClick(blog)}
            >
              {/* Background Image or Gradient */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                {blog.images && blog.images.length > 0 ? (
                  <Image
                    src={blog.images[0]}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-pink-400 via-rose-400 to-pink-500" />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  {blog.date && (
                    <p className="text-sm text-gray-200">
                      {formatDate(blog.date)}
                    </p>
                  )}
                </div>
              </div>

              {/* Subtitle - Hiện khi hover */}
              {blog.subTitle && (
                <div className="absolute inset-x-0 bottom-0 bg-white/80 backdrop-blur-sm p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {blog.subTitle}
                  </p>
                </div>
              )}
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
          itemsPerPageOptions={[8, 12, 16, 24]}
        />
      </div>

      {/* Blog Modal */}
      {selectedBlog && (
        <BlogModal
          isOpen={isModalOpen}
          blog={selectedBlog}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default StoriesPage;
