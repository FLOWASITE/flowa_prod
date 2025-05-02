
import React from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { EditBrandDialog } from '@/components/brand/EditBrandDialog';
import { BrandDetailsHeader } from '@/components/brand/details/BrandDetailsHeader';
import { BrandDetailsContent } from '@/pages/brand/details/BrandDetailsContent';
import { BrandDetailsLoading } from '@/pages/brand/details/BrandDetailsLoading';
import { BrandNotFound } from '@/pages/brand/details/BrandNotFound';
import { useBrandDetails } from '@/pages/brand/details/useBrandDetails';
import { brandDetailsTranslations } from '@/pages/brand/details/translations';

const BrandDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { currentLanguage } = useLanguage();
  
  const {
    brand,
    loading,
    products,
    setProducts,
    showEditDialog,
    setShowEditDialog,
    handleBrandUpdated,
    handleKnowledgeUpdate,
    getKnowledgeData
  } = useBrandDetails(id);

  const t = (key: keyof typeof brandDetailsTranslations) => {
    return brandDetailsTranslations[key][currentLanguage.code] || brandDetailsTranslations[key].en;
  };

  if (loading) {
    return <BrandDetailsLoading />;
  }

  if (!brand) {
    return <BrandNotFound />;
  }

  const knowledgeData = getKnowledgeData();

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto">
        <BrandDetailsHeader onEditClick={() => setShowEditDialog(true)} />

        <BrandDetailsContent
          brand={brand}
          products={products}
          setProducts={setProducts}
          knowledgeData={knowledgeData}
          onKnowledgeUpdate={handleKnowledgeUpdate}
        />
      </div>
      
      {brand && (
        <EditBrandDialog
          brand={{
            ...brand,
            products: products
          }}
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          onBrandUpdated={handleBrandUpdated}
        />
      )}
    </Layout>
  );
};

export default BrandDetails;
