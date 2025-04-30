
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // Default to collapsed

  const handleCollapsedChange = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Desktop sidebar - always visible on desktop */}
      <div className="hidden md:block fixed left-0 top-0 h-full z-10">
        <Sidebar onCollapsedChange={handleCollapsedChange} />
      </div>
      
      {/* Mobile sidebar - shown in a sheet when triggered */}
      {isMobile && (
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-40 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-gray-50 dark:bg-gray-900 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>
      )}
      
      {/* Header always at the top with highest z-index */}
      <div 
        className="fixed top-0 right-0 w-full z-50 transition-all duration-300"
        style={{ 
          left: isMobile ? 0 : sidebarCollapsed ? '64px' : '256px', // Adjust width based on sidebar state
        }}
      >
        <Header sidebarCollapsed={sidebarCollapsed} />
      </div>

      {/* Main content with padding that adjusts based on sidebar state */}
      <div 
        className="flex-1 w-full transition-all duration-300"
        style={{ 
          marginLeft: isMobile ? 0 : sidebarCollapsed ? '64px' : '256px', // 16px (w-16) or 64px (w-64) in pixels
          marginTop: '4rem' // Add top margin for fixed header (64px)
        }}
      >
        <main className="p-3 md:p-6 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
