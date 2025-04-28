
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { TopicCard } from '@/components/topic/TopicCard';
import { TopicRequestForm } from '@/components/topic/TopicRequestForm';
import { mockTopics } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Topics = () => {
  const handleApproveTopic = (id: string) => {
    console.log(`Approving topic with id: ${id}`);
  };
  
  const handleRejectTopic = (id: string) => {
    console.log(`Rejecting topic with id: ${id}`);
  };
  
  const draftTopics = mockTopics.filter(topic => topic.status === 'draft');
  const approvedTopics = mockTopics.filter(topic => topic.status === 'approved' || topic.status === 'generating');
  const completedTopics = mockTopics.filter(topic => topic.status === 'completed');

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Topics</h1>
        <p className="text-muted-foreground">Create and manage content topics</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="drafts" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="drafts">
                Drafts ({draftTopics.length})
              </TabsTrigger>
              <TabsTrigger value="approved">
                Approved ({approvedTopics.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({completedTopics.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="drafts">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {draftTopics.map(topic => (
                  <TopicCard 
                    key={topic.id} 
                    topic={topic}
                    onApprove={handleApproveTopic}
                    onReject={handleRejectTopic}
                  />
                ))}
                {draftTopics.length === 0 && (
                  <div className="col-span-2 text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="text-muted-foreground">No draft topics found</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="approved">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {approvedTopics.map(topic => (
                  <TopicCard 
                    key={topic.id} 
                    topic={topic}
                  />
                ))}
                {approvedTopics.length === 0 && (
                  <div className="col-span-2 text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="text-muted-foreground">No approved topics found</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="completed">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {completedTopics.map(topic => (
                  <TopicCard 
                    key={topic.id} 
                    topic={topic}
                  />
                ))}
                {completedTopics.length === 0 && (
                  <div className="col-span-2 text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="text-muted-foreground">No completed topics found</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <TopicRequestForm />
        </div>
      </div>
    </Layout>
  );
};

export default Topics;
