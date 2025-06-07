import Carousel from "@/components/carousel/carousel";
import { Carousel_06_2025 } from "@/utils/carousel/item";
import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";
import { Metadata } from "next";
import logo from "@/assets/logo/logo.png";
import Service from "@/pages/services";

export const metadata: Metadata = {
  title: "Nhu Thi Beauty",
  description: "Tỏa sáng vẻ đẹp tự nhiên – Nâng niu từng khoảnh khắc",
  icons: logo.src,
  keywords: [
    "Như Thị Beauty trang chủ",
    "Như Thị Spa chính thức",
    "spa làm đẹp Như Thị",
    "Beauty spa Như Thị",
    "chăm sóc da Như Thị",
  ],
  openGraph: {
    title: "Như Thị Beauty - Spa Làm Đẹp Chuyên Nghiệp",
    description:
      "Như Thị Beauty & Spa - Spa làm đẹp với dịch vụ chăm sóc da, massage, trị liệu chuyên nghiệp",
    url: process.env.NEXT_PUBLIC_BASE_URL,
  },
};

export default function Home() {
  return (
    <div className="">
      <Carousel images={Carousel_06_2025} />

      {/* Service | Dịch vụ  */}
      <Service isActive={false} />
    </div>
  );
}
