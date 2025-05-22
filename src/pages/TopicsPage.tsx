import React, { useState } from 'react';
import TopicGenerator from '@/components/topics/TopicGenerator';
import TopicList from '@/components/topics/TopicList';
import { Topic } from '@/services/topicService';

const TopicsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generate' | 'pending' | 'approved' | 'rejected'>('generate');
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const handleTopicsGenerated = (topics: Topic[]) => {
    // Switch to the pending tab after generating topics
    setActiveTab('pending');
    // Trigger a refresh of the topic lists
    setRefreshTrigger(prev => prev + 1);
  };

  const handleTopicStatusChange = () => {
    // Trigger a refresh of the topic lists
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Topic Management</h1>
      
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`${
                activeTab === 'generate'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('generate')}
            >
              Generate Topics
            </button>
            <button
              className={`${
                activeTab === 'pending'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('pending')}
            >
              Pending Topics
            </button>
            <button
              className={`${
                activeTab === 'approved'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('approved')}
            >
              Approved Topics
            </button>
            <button
              className={`${
                activeTab === 'rejected'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('rejected')}
            >
              Rejected Topics
            </button>
          </nav>
        </div>
      </div>
      
      <div className="mt-6">
        {activeTab === 'generate' && (
          <TopicGenerator onTopicsGenerated={handleTopicsGenerated} />
        )}
        
        {activeTab === 'pending' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Pending Topics</h2>
            <p className="text-sm text-gray-500 mb-4">
              These topics are waiting for your approval. Review and decide whether to approve or reject them.
            </p>
            <TopicList 
              status="pending" 
              onTopicStatusChange={handleTopicStatusChange}
              key={`pending-${refreshTrigger}`}
            />
          </div>
        )}
        
        {activeTab === 'approved' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Approved Topics</h2>
            <p className="text-sm text-gray-500 mb-4">
              These topics have been approved and are ready for content creation.
            </p>
            <TopicList 
              status="approved" 
              key={`approved-${refreshTrigger}`}
            />
          </div>
        )}
        
        {activeTab === 'rejected' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Rejected Topics</h2>
            <p className="text-sm text-gray-500 mb-4">
              These topics have been rejected and won't be used for content creation.
            </p>
            <TopicList 
              status="rejected" 
              key={`rejected-${refreshTrigger}`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicsPage;
