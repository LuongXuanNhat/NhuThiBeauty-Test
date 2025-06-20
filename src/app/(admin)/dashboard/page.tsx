import DashboardClient from '@/components/DashboardClient'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // Ví dụ: Lấy dữ liệu từ table (thay 'your_table' bằng tên table thực tế)
  const { data: items, error } = await supabase
    .from('your_table') // Thay bằng tên table của bạn
    .select('*')

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardClient user={user} items={items || []} />
    </div>
  )
}