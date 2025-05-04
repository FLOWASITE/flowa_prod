
import React from 'react';
import { ContentTabHeader } from './ContentTabHeader';
import { ViewModeSwitcher } from './ViewModeSwitcher';
import { BatchActions } from './BatchActions';

interface TabsHeaderSectionProps {
  contentLength: number;
  draftLength: number;
  approvedLength: number;
  scheduledLength: number;
  rejectedLength: number;
  publishedLength: number;
  viewMode: 'table' | 'grid' | 'accordion';
  handleViewModeChange: (mode: 'table' | 'grid' | 'accordion') => void;
  selectedItems?: string[];
  handleBatchApprove?: () => void;
  showBatchSelection: boolean;
}

export const TabsHeaderSection: React.FC<TabsHeaderSectionProps> = ({
  contentLength,
  draftLength,
  approvedLength,
  scheduledLength,
  rejectedLength,
  publishedLength,
  viewMode,
  handleViewModeChange,
  selectedItems = [],
  handleBatchApprove,
  showBatchSelection
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <ContentTabHeader 
        allCount={contentLength}
        draftCount={draftLength}
        approvedCount={approvedLength}
        scheduledCount={scheduledLength}
        rejectedCount={rejectedLength}
        publishedCount={publishedLength}
      />

      <div className="flex gap-4 items-center">
        {showBatchSelection && selectedItems && selectedItems.length > 0 && (
          <BatchActions 
            selectedItemsCount={selectedItems.length}
            onBatchApprove={handleBatchApprove || (() => {})}
          />
        )}
        
        <ViewModeSwitcher 
          viewMode={viewMode} 
          handleViewModeChange={handleViewModeChange} 
        />
      </div>
    </div>
  );
};
