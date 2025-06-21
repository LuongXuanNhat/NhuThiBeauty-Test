import Sidebar from '@/components/sidebar';
import { AuthProvider } from '@/contexts/AuthContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Sidebar />
      {children}
    </AuthProvider>
  );
}