
import React from 'react';
import { Card } from '@/components/ui/card';

export function NotesContent() {
  return (
    <div className="flex flex-col gap-4">
      <Card className="p-4 shadow-md3-1">
        <h3 className="font-medium text-lg mb-2">Ghi chú về khách hàng</h3>
        <p className="text-muted-foreground">Khách hàng đã hỏi về các sản phẩm mới và giá cả. Đã cung cấp thông tin về chương trình khuyến mãi giảm 20%.</p>
      </Card>
      <Card className="p-4 shadow-md3-1">
        <h3 className="font-medium text-lg mb-2">Điểm chính của cuộc hội thoại</h3>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>Khách hàng quan tâm đến sản phẩm X</li>
          <li>Đã hỏi về chính sách bảo hành</li>
          <li>Muốn biết thêm về cách thanh toán</li>
        </ul>
      </Card>
    </div>
  );
}
