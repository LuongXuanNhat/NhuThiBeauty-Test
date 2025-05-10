"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo/logo.png";
import { routes, RouteItem } from "@/config/routes";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Kiểm tra kích thước màn hình để xác định mobile hay desktop
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Kiểm tra lần đầu
    checkIfMobile();

    // Thêm event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Tính toán để chia menu thành 2 phần
  const midPoint = Math.ceil(routes.length / 2);
  const leftRoutes = routes.slice(0, midPoint);
  const rightRoutes = routes.slice(midPoint);

  // Đóng sidebar khi chuyển từ mobile sang desktop
  useEffect(() => {
    if (!isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  // Đóng sidebar sau khi click vào menu item trên mobile
  const handleNavLinkClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <header className="bg-pink-600 text-white px-4 py-2 shadow-md relative">
      <nav className="container mx-auto">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between">
          {/* Left Menu Items */}
          <ul className="flex flex-1 justify-end space-x-6 pr-4">
            {leftRoutes.map((route: RouteItem) => (
              <li key={route.path}>
                <Link
                  href={route.path}
                  className="hover:text-pink-200 transition-colors"
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Logo */}
          <div className="flex justify-center">
            <Link href="/">
              <Image
                src={logo}
                alt="Nhu Thi Beauty Logo"
                className="w-16 h-16 p-1 rounded-full bg-white"
                priority
              />
            </Link>
          </div>

          {/* Right Menu Items */}
          <ul className="flex flex-1 justify-start space-x-6 pl-4">
            {rightRoutes.map((route: RouteItem) => (
              <li key={route.path}>
                <Link
                  href={route.path}
                  className="hover:text-pink-200 transition-colors"
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between py-2">
          {/* Logo */}
          <div className="flex-1"></div>
          <div className="flex justify-center flex-1">
            <Link href="/">
              <Image
                src={logo}
                alt="Nhu Thi Beauty Logo"
                className="w-12 h-12 p-1 rounded-full bg-white"
                priority
              />
            </Link>
          </div>

          {/* Menu toggle button */}
          <div className="flex justify-end flex-1">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 focus:outline-none"
              aria-label={isSidebarOpen ? "Đóng menu" : "Mở menu"}
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-pink-700 z-50 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
        >
          <div className="flex justify-between items-center p-4 border-b border-pink-500">
            <h2 className="text-xl font-bold">Menu</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 focus:outline-none"
              aria-label="Đóng menu"
            >
              <X size={24} />
            </button>
          </div>
          <ul className="p-4 space-y-4">
            {routes.map((route: RouteItem) => (
              <li key={route.path}>
                <Link
                  href={route.path}
                  className="block py-2 hover:text-pink-200 transition-colors"
                  onClick={handleNavLinkClick}
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Overlay when sidebar is open */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </nav>
    </header>
  );
}
