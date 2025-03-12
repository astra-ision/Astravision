import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';

export const metadata = {
  title: 'Dashboard | Astravision',
  description: 'Astravision dashboard for managing AI, blockchain, CRM, ERP, and HRMS services',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex h-screen pt-16">
        <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] z-30">
          <Sidebar />
        </div>
        <main className="flex-1 ml-64 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
} 