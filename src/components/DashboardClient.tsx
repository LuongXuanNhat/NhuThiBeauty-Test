"use client";

import { useAuth } from "@/contexts/AuthContext";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

interface DashboardClientProps {
  user: User;
  items: any[]; // Thay bằng type cụ thể của dữ liệu
}

export default function DashboardClient({ user, items }: DashboardClientProps) {
  const { signOut } = useAuth();
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-600">Chào mừng, {user.email}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Dữ liệu từ Supabase</h2>
        {items.length > 0 ? (
          <div className="grid gap-4">
            {items.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <pre className="text-sm text-gray-600">
                  {JSON.stringify(item, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Chưa có dữ liệu</p>
        )}
      </div>
    </div>
  );
}
