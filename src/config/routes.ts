// src/app/config/routes.ts
export interface RouteItem {
  path: string;
  name: string;
  file: string;
  title: string;
}

export const home: RouteItem = {
  path: "/",
  name: "Trang chủ",
  file: "(home)/page.tsx",
  title: "Trang chủ - Website tỉnh",
};

export const routes: RouteItem[] = [
  {
    path: "/#dich-vu",
    name: "Dịch vụ",
    file: "(home)/page.tsx",
    title: "Danh sách dịch vụ",
  },
  {
    path: "/products",
    name: "Sản phẩm",
    file: "(products)/list/ProductsPage.tsx",
    title: "Danh sách sản phẩm",
  },
  {
    path: "/reviews",
    name: "Đánh giá",
    file: "(static)/about/AboutPage.tsx",
    title: "Giới thiệu về tỉnh",
  },
  {
    path: "/stories",
    name: "Câu chuyện",
    file: "(static)/about/AboutPage.tsx",
    title: "Giới thiệu về tỉnh",
  },
  {
    path: "/promotions",
    name: "Khuyến mãi",
    file: "(static)/about/AboutPage.tsx",
    title: "Giới thiệu về tỉnh",
  },
  {
    path: "/about",
    name: "Giới thiệu",
    file: "(static)/about.tsx",
    title: "Giới thiệu - Nhu Thi Beauty",
  },
];
