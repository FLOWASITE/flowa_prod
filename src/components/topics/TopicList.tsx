import React, { useEffect, useState } from 'react';
import { Topic, topicService } from '@/services/topicService';

interface TopicListProps {
  status?: string;
  brandId?: string;
  productId?: string;
  onTopicStatusChange?: () => void;
}

const TopicList: React.FC<TopicListProps> = ({
  status,
  brandId,
  productId,
  onTopicStatusChange,
}) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTopics = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await topicService.getTopics(status, brandId, productId);
      setTopics(data);
    } catch (err) {
      console.error('Error fetching topics:', err);
      setError('Failed to load topics. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, [status, brandId, productId]);

  const handleApproveTopic = async (topicId: string) => {
    try {
      await topicService.approveTopic(topicId);
      
      // Update the local state to reflect the change
      setTopics(prevTopics => 
        prevTopics.map(topic => 
          topic.id === topicId 
            ? { ...topic, status: 'approved' } 
            : topic
        )
      );
      
      if (onTopicStatusChange) {
        onTopicStatusChange();
      }
    } catch (err) {
      console.error('Error approving topic:', err);
      setError('Failed to approve topic. Please try again.');
    }
  };

  const handleRejectTopic = async (topicId: string) => {
    try {
      await topicService.rejectTopic(topicId);
      
      // Update the local state to reflect the change
      setTopics(prevTopics => 
        prevTopics.map(topic => 
          topic.id === topicId 
            ? { ...topic, status: 'rejected' } 
            : topic
        )
      );
      
      if (onTopicStatusChange) {
        onTopicStatusChange();
      }
    } catch (err) {
      console.error('Error rejecting topic:', err);
      setError('Failed to reject topic. Please try again.');
    }
  };

  if (loading && topics.length === 0) {
    return <div className="text-center py-8">Loading topics...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (topics.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No topics found. Generate some topics to get started.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {topics.map(topic => (
        <div key={topic.id} className="border rounded-md p-4 bg-white shadow-sm">
          <h3 className="text-lg font-medium">{topic.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{topic.description}</p>
          
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {topic.brand_name && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Brand: {topic.brand_name}
              </span>
            )}
            
            {topic.product_name && (
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                Product: {topic.product_name}
              </span>
            )}
            
            {topic.category && (
              <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                {topic.category}
              </span>
            )}
            
            {topic.target_audience && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                Audience: {topic.target_audience}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded ${
                topic.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                topic.status === 'approved' ? 'bg-green-100 text-green-800' :
                topic.status === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {topic.status.charAt(0).toUpperCase() + topic.status.slice(1)}
              </span>
              
              <span className="text-xs text-gray-500">
                Created: {new Date(topic.created_at).toLocaleDateString()}
              </span>
            </div>
            
            <div className="space-x-2">
              {topic.status === 'pending' && (
                <>
                  <button
                    className="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
                    onClick={() => handleApproveTopic(topic.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                    onClick={() => handleRejectTopic(topic.id)}
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopicList;
