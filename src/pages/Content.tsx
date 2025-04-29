
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { ContentPageProvider } from '@/components/content/ContentPageProvider';
import { ContentPageView } from '@/components/content/ContentPageView';

const ContentPage = () => {
  return (
    <Layout>
      <ContentPageProvider>
        <ContentPageView />
      </ContentPageProvider>
    </Layout>
  );
};

export default ContentPage;
