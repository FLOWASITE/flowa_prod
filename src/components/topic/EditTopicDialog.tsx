import React, { useState } from 'react';
import { Topic } from '@/types/content';

interface EditTopicDialogProps {
  topic: Topic;
  onSave: (topic: Topic) => void;
  onClose: () => void;
}

export const EditTopicDialog: React.FC<EditTopicDialogProps> = ({ topic, onSave, onClose }) => {
  const [title, setTitle] = useState(topic.title);
  const [description, setDescription] = useState(topic.description);
  const [themeTypeId, setThemeTypeId] = useState(topic.themeTypeId || '');
  const [productTypeId, setProductTypeId] = useState(topic.productTypeId || '');

  const handleSave = () => {
    onSave({ ...topic, title, description, themeTypeId, productTypeId });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Chỉnh sửa chủ đề</h2>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Tiêu đề</label>
          <input className="w-full border rounded p-2" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Mô tả</label>
          <textarea className="w-full border rounded p-2" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Phân loại</label>
          <input className="w-full border rounded p-2" value={themeTypeId} onChange={e => setThemeTypeId(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Sản phẩm</label>
          <input className="w-full border rounded p-2" value={productTypeId} onChange={e => setProductTypeId(e.target.value)} />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>Hủy</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSave}>Lưu</button>
        </div>
      </div>
    </div>
  );
};

export default EditTopicDialog; 