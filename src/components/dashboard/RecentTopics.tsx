
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Topic } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface RecentTopicsProps {
  topics: Topic[];
}

export function RecentTopics({ topics }: RecentTopicsProps) {
  const statusColors = {
    draft: "bg-gray-200 text-gray-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    generating: "bg-blue-100 text-blue-800",
    completed: "bg-purple-100 text-purple-800",
  };
  
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold">Recent Topics</h3>
      </div>
      <div className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Source</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topics.map((topic) => (
              <TableRow key={topic.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{topic.title}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={statusColors[topic.status]}
                  >
                    {topic.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(topic.createdAt, { addSuffix: true })}
                </TableCell>
                <TableCell>{topic.createdBy === 'user' ? 'Manual' : 'AI Generated'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
