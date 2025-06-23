"use client";

import Sidebar from "@/components/sidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  return (
    <AuthProvider>
      <div className="flex  min-h-screen">
        {!isLoginPage && <Sidebar />}
        <div className="flex-1 p-2 bg-gray-50">{children}</div>
      </div>
    </AuthProvider>
  );
}
