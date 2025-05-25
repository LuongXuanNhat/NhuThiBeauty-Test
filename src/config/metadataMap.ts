// app/metadataMap.ts
import type { Metadata } from "next";
import logo from "@/assets/logo/logo.png";

export const metadataMap: Record<string, Metadata> = {
  "/services": {
    title: "Dịch vụ - Nhu Thi Beauty",
    description: "Danh sách dịch vụ chất lượng tại Nhu Thi Beauty",
    icons: logo.src,
  },
  "/products": {
    title: "Sản phẩm - Nhu Thi Beauty",
    description: "Các sản phẩm làm đẹp uy tín, chất lượng",
    icons: logo.src,
  },
  "/stories": {
    title: "Bài viết - Nhu Thi Beauty",
    description: "Các sản phẩm làm đẹp uy tín, chất lượng",
    icons: logo.src,
  },
  "/promotions": {
    title: "Sản phẩm - Nhu Thi Beauty",
    description: "Các sản phẩm làm đẹp uy tín, chất lượng",
    icons: logo.src,
  },
  "/about": {
    title: "Về chúng tôi",
    description: "Giới thiệu về Như Thị Beauty",
    icons: logo.src,
  },
  "/reviews": {
    title: "Đánh giá - Nhu Thi Beauty",
    description: "Các sản phẩm làm đẹp uy tín, chất lượng",
    icons: logo.src,
  },
  // các route khác...
};
