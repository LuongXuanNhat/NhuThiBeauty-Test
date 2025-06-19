"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo/logo.png";
import { routes, RouteItem } from "@/config/routes";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Memoize routes để tránh re-calculation không cần thiết
  const { leftRoutes, rightRoutes } = useMemo(() => {
    const midPoint = Math.ceil(routes.length / 2);
    return {
      leftRoutes: routes.slice(0, midPoint),
      rightRoutes: routes.slice(midPoint),
    };
  }, []);

  // Throttle scroll handler để tránh update quá nhiều
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const shouldBeScrolled = scrollY > 10;

    // Chỉ update state khi thực sự cần thiết
    setIsScrolled((prev) => {
      if (prev !== shouldBeScrolled) {
        return shouldBeScrolled;
      }
      return prev;
    });
  }, []);

  // Throttle resize handler
  const handleResize = useCallback(() => {
    const shouldBeMobile = window.innerWidth < 768;
    setIsMobile((prev) => {
      if (prev !== shouldBeMobile) {
        return shouldBeMobile;
      }
      return prev;
    });
  }, []);

  // Setup resize listener với throttling
  useEffect(() => {
    // Kiểm tra lần đầu
    handleResize();

    let timeoutId: NodeJS.Timeout;
    const throttledResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", throttledResize);
    return () => {
      window.removeEventListener("resize", throttledResize);
      clearTimeout(timeoutId);
    };
  }, [handleResize]);

  // Setup scroll listener với throttling
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const throttledScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 16); // ~60fps
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  // Đóng sidebar khi chuyển từ mobile sang desktop
  useEffect(() => {
    if (!isMobile && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  }, [isMobile, isSidebarOpen]);

  // Đóng sidebar sau khi click vào menu item trên mobile
  const handleNavLinkClick = useCallback(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  return (
    <header
      className={`bg-gradient-to-br from-pink-400 to-pink-500 text-white px-4 py-2 shadow-sm relative ${
        isScrolled
          ? "sticky top-0 z-40 transition-all duration-300 shadow-lg"
          : ""
      }`}
    >
      <nav className="container mx-auto">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between">
          {/* Left Menu Items */}
          <ul className="flex flex-1 justify-end space-x-6 pr-6">
            {leftRoutes.map((route: RouteItem) => (
              <li
                key={route.path}
                className={usePathname() === route.path ? "border-b" : ""}
              >
                <Link
                  href={route.path}
                  className="hover:text-pink-200 transition-colors font-semibold text-shadow-2xs"
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
          <ul className="flex flex-1 justify-start space-x-6 pl-6">
            {rightRoutes.map((route: RouteItem) => (
              <li
                key={route.path}
                className={usePathname() === route.path ? "border-b" : ""}
              >
                <Link
                  href={route.path}
                  className="hover:text-pink-200 transition-colors font-semibold"
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between py-1">
          {/* Logo */}
          <div className="flex-1"></div>
          <div className="flex justify-center flex-1">
            <Link href="/">
              <Image
                src={logo}
                alt="Nhu Thi Beauty Logo"
                className="w-10 h-10 p-1 rounded-full bg-white"
                priority
              />
            </Link>
          </div>

          {/* Menu toggle button */}
          <div className="flex justify-end flex-1">
            <button
              onClick={toggleSidebar}
              className="p-2 focus:outline-none"
              aria-label={isSidebarOpen ? "Đóng menu" : "Mở menu"}
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-pink-400 z-50 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
        >
          <div className="flex justify-between items-center p-4 border-b border-pink-500">
            <h2 className="text-xl font-bold">Menu</h2>
            <button
              onClick={closeSidebar}
              className="p-2 focus:outline-none"
              aria-label="Đóng menu"
            >
              <X size={24} />
            </button>
          </div>
          <ul className="p-4 space-y-4">
            {routes.map((route: RouteItem) => (
              <li
                key={route.path}
                className={usePathname() === route.path ? "border-b" : ""}
              >
                <Link
                  href={route.path}
                  className="block py-2 hover:text-pink-200 text-shadow-2xs transition-colors font-bold"
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
            onClick={closeSidebar}
          />
        )}
      </nav>
    </header>
  );
}
