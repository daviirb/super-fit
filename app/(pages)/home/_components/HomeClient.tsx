'use client';

import { type ReactNode, useState } from 'react';

import { Footer } from '@/components/Footer';
import { Sidebar } from '@/components/menu/Sidebar';
import { TopBar } from '@/components/menu/TopBar';

interface HomeClientProps {
  children: ReactNode;
  onLogout: () => Promise<void>;
  userName: string;
}

export function HomeClient({ children, onLogout }: HomeClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={onLogout}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar onMenuClick={toggleSidebar} />
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <main className="min-h-screen">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
