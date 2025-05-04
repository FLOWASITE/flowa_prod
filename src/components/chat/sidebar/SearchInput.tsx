
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function SearchInput({ searchQuery, setSearchQuery }: SearchInputProps) {
  return (
    <div className="p-4 border-b bg-white dark:bg-gray-950 sticky top-16 z-10">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <Input
          placeholder="Tìm kiếm hội thoại..."
          className="w-full pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
