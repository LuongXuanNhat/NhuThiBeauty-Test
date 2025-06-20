import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createServerSupabaseClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          return (await cookieStore).getAll();
        },
        setAll(cookiesToSet) {
          try {
            // ❗ Trong Server Component, không nên set cookie ở đây.
            // Nếu dùng trong Server Action, set ở response headers thay vì ở đây
            // Bạn có thể comment hoặc ghi log:
            // console.warn('Attempt to set cookie in a context where it is not allowed')
          } catch (error) {
            // Bỏ qua nếu không được set
          }
        },
      },
    }
  )
}
