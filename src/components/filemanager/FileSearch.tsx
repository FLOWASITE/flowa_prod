
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Search, Calendar as CalendarIcon, Tag } from 'lucide-react';
import { format } from 'date-fns';

interface FileSearchProps {
  onSearch: (query: string, tag: string, date: Date | null) => void;
}

export const FileSearch: React.FC<FileSearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dateOpen, setDateOpen] = useState(false);

  const handleSearch = () => {
    onSearch(searchQuery, selectedTag, selectedDate);
  };

  const handleClear = () => {
    setSearchQuery('');
    setSelectedTag('');
    setSelectedDate(null);
    onSearch('', '', null);
  };

  return (
    <div className="space-y-4 p-4 border rounded-md">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="search">Tìm kiếm theo từ khóa</Label>
          <div className="flex">
            <Input 
              id="search" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nhập từ khóa..." 
              className="rounded-r-none"
            />
            <Button 
              onClick={handleSearch}
              className="rounded-l-none"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="tag">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="tag">Tìm theo Tag</TabsTrigger>
            <TabsTrigger value="date">Tìm theo Ngày</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tag" className="space-y-2 mt-2">
            <Label htmlFor="tag-search">Tag</Label>
            <div className="flex">
              <Input 
                id="tag-search" 
                value={selectedTag} 
                onChange={(e) => setSelectedTag(e.target.value)} 
                placeholder="Nhập tag..."
                className="rounded-r-none"
              />
              <Button 
                onClick={handleSearch}
                className="rounded-l-none"
              >
                <Tag className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="date" className="space-y-2 mt-2">
            <Label>Ngày</Label>
            <Popover open={dateOpen} onOpenChange={setDateOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {selectedDate ? format(selectedDate, 'dd/MM/yyyy') : 'Chọn ngày...'}
                  <CalendarIcon className="h-4 w-4 ml-2" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate || undefined}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    setDateOpen(false);
                    if (date) {
                      onSearch(searchQuery, selectedTag, date);
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </TabsContent>
        </Tabs>
        
        <Button variant="outline" onClick={handleClear}>
          Xóa bộ lọc
        </Button>
      </div>
    </div>
  );
};
