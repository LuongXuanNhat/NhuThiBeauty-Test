import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { routes, RouteItem } from "@/config/routes";
import Link from "next/link";
import logo from "@/assets/logo/logo.png";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Nhu Thi Beauty",
  description: "Làm đẹp chất lượng uy tín số 1 Việt Nam",
  icons: logo.src,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">
        <Header />
        <main className="container mx-auto py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
