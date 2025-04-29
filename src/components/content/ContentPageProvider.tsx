
import React from 'react';
import { useContentData } from '@/hooks/useContentData';

interface ContentPageProviderProps {
  children: React.ReactNode;
}

export const ContentPageProvider: React.FC<ContentPageProviderProps> = ({ children }) => {
  const contentData = useContentData();
  
  return (
    <ContentDataContext.Provider value={contentData}>
      {children}
    </ContentDataContext.Provider>
  );
};

// Create context for the content data
export const ContentDataContext = React.createContext<ReturnType<typeof useContentData> | undefined>(undefined);

// Custom hook to use the content data context
export const useContentDataContext = () => {
  const context = React.useContext(ContentDataContext);
  if (context === undefined) {
    throw new Error('useContentDataContext must be used within a ContentPageProvider');
  }
  return context;
};
