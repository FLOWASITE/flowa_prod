
import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar is always visible on desktop, but conditionally shown on mobile */}
      <div className={`${isMobile ? 'hidden md:block' : ''}`}>
        <Sidebar />
      </div>
      <div className="flex-1 w-full">
        <Header />
        <main className="p-3 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
