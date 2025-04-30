
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download, Eye, Calendar, CreditCard } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { AccountTypeBadge } from '@/components/users/AccountTypeBadge';

// Sample invoice data - in a real application, this would come from your backend
const sampleInvoices = [
  {
    id: 'INV-001',
    date: '2025-01-15',
    amount: 99.99,
    status: 'paid',
    description: 'Professional Plan - Monthly',
    downloadUrl: '#',
  },
  {
    id: 'INV-002',
    date: '2024-12-15',
    amount: 99.99,
    status: 'paid',
    description: 'Professional Plan - Monthly',
    downloadUrl: '#',
  },
  {
    id: 'INV-003',
    date: '2024-11-15',
    amount: 99.99,
    status: 'paid',
    description: 'Professional Plan - Monthly',
    downloadUrl: '#',
  },
];

const Invoices: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const accountType = 'professional';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(currentLanguage.code === 'vi' ? 'vi-VN' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(currentLanguage.code === 'vi' ? 'vi-VN' : 'en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">
          {currentLanguage.code === 'vi' ? 'Hóa đơn' : 'Invoices'}
        </h1>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Current Plan Card */}
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {currentLanguage.code === 'vi' ? 'Gói hiện tại' : 'Current Plan'}
              </CardTitle>
              <CardDescription>
                {currentLanguage.code === 'vi' ? 'Thông tin gói đăng ký' : 'Subscription information'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center space-y-4">
                <AccountTypeBadge type={accountType as any} size="lg" showLabel={true} clickable={false} />
                
                <div className="text-2xl font-bold">$99.99<span className="text-sm text-gray-500 font-normal">/month</span></div>
                
                <div className="flex items-center text-sm space-x-2 text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {currentLanguage.code === 'vi' ? 'Gia hạn tiếp theo:' : 'Next renewal:'} 15 Apr 2025
                  </span>
                </div>
                
                <div className="flex items-center text-sm space-x-2 text-gray-500">
                  <CreditCard className="h-4 w-4" />
                  <span>
                    {currentLanguage.code === 'vi' ? 'Thanh toán bằng:' : 'Paid with:'} •••• 4242
                  </span>
                </div>
                
                <Button className="w-full mt-4">
                  {currentLanguage.code === 'vi' ? 'Quản lý gói' : 'Manage Subscription'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Invoices Table */}
          <Card className="md:col-span-3">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    {currentLanguage.code === 'vi' ? 'Lịch sử hóa đơn' : 'Invoice History'}
                  </CardTitle>
                  <CardDescription>
                    {currentLanguage.code === 'vi' 
                      ? 'Quản lý và tải xuống hóa đơn của bạn' 
                      : 'Manage and download your invoices'}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{currentLanguage.code === 'vi' ? 'Số hóa đơn' : 'Invoice'}</TableHead>
                    <TableHead>{currentLanguage.code === 'vi' ? 'Ngày' : 'Date'}</TableHead>
                    <TableHead>{currentLanguage.code === 'vi' ? 'Mô tả' : 'Description'}</TableHead>
                    <TableHead>{currentLanguage.code === 'vi' ? 'Số tiền' : 'Amount'}</TableHead>
                    <TableHead>{currentLanguage.code === 'vi' ? 'Trạng thái' : 'Status'}</TableHead>
                    <TableHead className="text-right">{currentLanguage.code === 'vi' ? 'Hành động' : 'Actions'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{formatDate(invoice.date)}</TableCell>
                      <TableCell>{invoice.description}</TableCell>
                      <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {currentLanguage.code === 'vi' ? 'Đã thanh toán' : 'Paid'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {sampleInvoices.length === 0 && (
                <div className="py-8 text-center text-gray-500">
                  {currentLanguage.code === 'vi' 
                    ? 'Không có hóa đơn nào được tìm thấy.' 
                    : 'No invoices found.'}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Invoices;
