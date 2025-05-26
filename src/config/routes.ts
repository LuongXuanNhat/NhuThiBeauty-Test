// src/app/config/routes.ts
export interface RouteItem {
  path: string;
  name: string;
  file: string;
}

export const home: RouteItem = {
  path: "/",
  name: "Trang chủ",
  file: "(home)/page.tsx",
};

export const routes: RouteItem[] = [
  {
    path: "/services",
    name: "Dịch vụ",
    file: "(static)/service.tsx",
  },
  {
    path: "/products",
    name: "Sản phẩm",
    file: "(static)/products.tsx",
  },
  {
    path: "/reviews",
    name: "Đánh giá",
    file: "(static)/reviews.tsx",
  },
  {
    path: "/stories",
    name: "Câu chuyện",
    file: "(static)/stories.tsx",
  },
  {
    path: "/promotions",
    name: "Khuyến mãi",
    file: "(static)/promotions.tsx",
  },
  {
    path: "/about",
    name: "Giới thiệu",
    file: "(static)/about.tsx",
  },
];
