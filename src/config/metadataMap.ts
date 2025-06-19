// app/config/metadataMap.ts
import type { Metadata } from "next";
const logo = '/logo.png';

export const metadataMap: Record<string, Metadata> = {
  "/": {
    title: "Như Thị Beauty - Spa Làm Đẹp Chuyên Nghiệp | Trang Chủ",
    description:
      "Như Thị Beauty & Spa - Spa làm đẹp hàng đầu với dịch vụ chăm sóc da, massage, trị liệu chuyên nghiệp. Đặt lịch hẹn ngay tại Beauty Như Thị!",
    keywords: [
      "Như Thị Beauty",
      "Như Thị Spa",
      "spa làm đẹp Như Thị",
      "Beauty Như Thị",
      "nhuthibeauty",
      "spa chăm sóc da",
      "massage Như Thị",
      "massage Tây Hồ",
      "gội đầu Tây Hồ",
      "trị mụn Tây Hồ",
      "peel da Tây Hồ",
      "làm nail Tây Hồ",
      "chăm sóc sắc đẹp Tây Hồ",
      "dịch vụ làm đẹp Tây Hồ",
      "spa chuyên nghiệp Tây Hồ",
    ],
    icons: logo,
    openGraph: {
      title: "Như Thị Beauty - Spa Làm Đẹp Chuyên Nghiệp",
      description:
        "Như Thị Beauty & Spa - Spa làm đẹp hàng đầu với dịch vụ chăm sóc da, massage, trị liệu chuyên nghiệp",
      url: "https://nhuthibeauty.com",
      siteName: "Như Thị Beauty",
      locale: "vi_VN",
      type: "website",
    },
  },
  "/services": {
    title: "Dịch Vụ Spa - Như Thị Beauty | Chăm Sóc Da & Massage",
    description:
      "Khám phá các dịch vụ spa cao cấp tại Như Thị Beauty: chăm sóc da mặt, massage body, trị liệu chuyên sâu. Đặt lịch spa Như Thị ngay!",
    keywords: [
      "dịch vụ Như Thị Beauty",
      "spa Như Thị dịch vụ",
      "massage Như Thị",
      "chăm sóc da Như Thị Beauty",
      "trị liệu spa Như Thị",
      "Beauty spa services",
    ],
    icons: logo,
    openGraph: {
      title: "Dịch Vụ Spa - Như Thị Beauty",
      description:
        "Khám phá các dịch vụ spa cao cấp tại Như Thị Beauty: chăm sóc da mặt, massage body, trị liệu chuyên sâu",
      url: "https://nhuthibeauty.com/services",
    },
  },
  "/products": {
    title: "Sản Phẩm Làm Đẹp - Như Thị Beauty | Mỹ Phẩm Chính Hãng",
    description:
      "Sản phẩm làm đẹp chính hãng tại Như Thị Beauty. Mỹ phẩm chăm sóc da, serum, kem dưỡng được khuyên dùng bởi chuyên gia spa Như Thị.",
    keywords: [
      "sản phẩm Như Thị Beauty",
      "mỹ phẩm Như Thị",
      "sản phẩm làm đẹp Như Thị",
      "Beauty products Như Thị",
      "mỹ phẩm spa Như Thị",
      "skincare Như Thị Beauty",
    ],
    icons: logo,
    openGraph: {
      title: "Sản Phẩm Làm Đẹp - Như Thị Beauty",
      description:
        "Sản phẩm làm đẹp chính hãng tại Như Thị Beauty. Mỹ phẩm chăm sóc da được khuyên dùng bởi chuyên gia",
      url: "https://nhuthibeauty.com/products",
    },
  },
  "/stories": {
    title: "Blog Làm Đẹp - Như Thị Beauty | Tips & Kiến Thức Spa",
    description:
      "Blog chia sẻ bí quyết làm đẹp, kiến thức chăm sóc da, tips spa từ chuyên gia Như Thị Beauty. Cập nhật xu hướng beauty mới nhất.",
    keywords: [
      "blog Như Thị Beauty",
      "tips làm đẹp Như Thị",
      "kiến thức spa Như Thị",
      "Beauty blog Như Thị",
      "bài viết làm đẹp",
      "chăm sóc da blog",
    ],
    icons: logo,
    openGraph: {
      title: "Blog Làm Đẹp - Như Thị Beauty",
      description:
        "Blog chia sẻ bí quyết làm đẹp, kiến thức chăm sóc da, tips spa từ chuyên gia Như Thị Beauty",
      url: "https://nhuthibeauty.com/stories",
    },
  },
  "/promotions": {
    title: "Khuyến Mãi - Như Thị Beauty | Ưu Đãi Spa & Làm Đẹp",
    description:
      "Khuyến mãi hấp dẫn tại Như Thị Beauty & Spa. Ưu đãi dịch vụ chăm sóc da, massage, các gói combo spa với giá tốt nhất.",
    keywords: [
      "khuyến mãi Như Thị Beauty",
      "ưu đãi spa Như Thị",
      "promotion Như Thị Beauty",
      "giảm giá spa Như Thị",
      "combo spa Như Thị",
      "voucher Beauty Như Thị",
    ],
    icons: logo,
    openGraph: {
      title: "Khuyến Mãi - Như Thị Beauty",
      description:
        "Khuyến mãi hấp dẫn tại Như Thị Beauty & Spa. Ưu đãi dịch vụ chăm sóc da, massage với giá tốt nhất",
      url: "https://nhuthibeauty.com/promotions",
    },
  },
  "/about": {
    title: "Giới Thiệu - Như Thị Beauty & Spa | Về Chúng Tôi",
    description:
      "Tìm hiểu về Như Thị Beauty - spa làm đẹp uy tín với nhiều năm kinh nghiệm. Câu chuyện thương hiệu Beauty Như Thị và đội ngũ chuyên gia.",
    keywords: [
      "giới thiệu Như Thị Beauty",
      "về Như Thị Spa",
      "thương hiệu Như Thị",
      "lịch sử Như Thị Beauty",
      "đội ngũ Như Thị Spa",
      "about Beauty Như Thị",
    ],
    icons: logo,
    openGraph: {
      title: "Giới Thiệu - Như Thị Beauty & Spa",
      description:
        "Tìm hiểu về Như Thị Beauty - spa làm đẹp uy tín với nhiều năm kinh nghiệm",
      url: "https://nhuthibeauty.com/about",
    },
  },
  "/reviews": {
    title: "Đánh Giá Khách Hàng - Như Thị Beauty | Review & Feedback",
    description:
      "Đánh giá và phản hồi từ khách hàng về dịch vụ spa tại Như Thị Beauty. Chia sẻ trải nghiệm làm đẹp và chăm sóc da tại Beauty Như Thị.",
    keywords: [
      "đánh giá Như Thị Beauty",
      "review spa Như Thị",
      "feedback Như Thị Beauty",
      "nhận xét khách hàng",
      "kinh nghiệm spa Như Thị",
      "testimonial Beauty Như Thị",
    ],
    icons: logo,
    openGraph: {
      title: "Đánh Giá Khách Hàng - Như Thị Beauty",
      description:
        "Đánh giá và phản hồi từ khách hàng về dịch vụ spa tại Như Thị Beauty",
      url: "https://nhuthibeauty.com/reviews",
    },
  },
  "/contact": {
    title: "Liên Hệ - Đặt Lịch Như Thị Beauty | Booking Spa",
    description:
      "Liên hệ và đặt lịch hẹn tại Như Thị Beauty. Địa chỉ, số điện thoại, giờ mở cửa spa Như Thị. Tư vấn làm đẹp miễn phí!",
    keywords: [
      "liên hệ Như Thị Beauty",
      "đặt lịch Như Thị Spa",
      "địa chỉ Như Thị Beauty",
      "số điện thoại Như Thị Spa",
      "booking spa Như Thị",
      "contact Beauty Như Thị",
    ],
    icons: logo,
    openGraph: {
      title: "Liên Hệ - Đặt Lịch Như Thị Beauty",
      description:
        "Liên hệ và đặt lịch hẹn tại Như Thị Beauty. Địa chỉ, số điện thoại, giờ mở cửa spa Như Thị",
      url: "https://nhuthibeauty.com/contact",
    },
  },
};

// Default metadata cho fallback
export const defaultMetadata: Metadata = {
  title: {
    default: "Như Thị Beauty - Spa Làm Đẹp Chuyên Nghiệp",
    template: "%s | Như Thị Beauty",
  },
  description:
    "Như Thị Beauty & Spa - Tỏa sáng vẻ đẹp tự nhiên – Nâng niu từng khoảnh khắc. Đặt lịch ngay tại spa Như Thị!",
  keywords: [
    "Như Thị Beauty",
    "Như Thị Spa",
    "spa làm đẹp",
    "chăm sóc da",
    "gội đầu",
    "Beauty spa",
    "Như Thị",
    "Nhu Thi"
  ],
  icons: logo,
  authors: [{ name: "Như Thị Beauty" }],
  creator: "Như Thị Beauty",
  publisher: "Như Thị Beauty",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
  },
};
