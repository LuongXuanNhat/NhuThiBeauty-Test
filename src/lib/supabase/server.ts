// Ví dụ đúng cho server-side client
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createServerSupabaseClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          return (await cookieStore).get(name)?.value;
        },
      },
      // Quan trọng: Đảm bảo auth context được truyền
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
