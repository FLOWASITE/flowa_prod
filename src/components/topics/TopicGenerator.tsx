import React, { useState } from 'react';
import ProductBrandSelector from './ProductBrandSelector';
import { Brand } from '@/services/brandService';
import { Product } from '@/services/productService';
import { Topic, topicService, GenerateTopicsRequest } from '@/services/topicService';

interface TopicGeneratorProps {
  onTopicsGenerated?: (topics: Topic[]) => void;
}

const TopicGenerator: React.FC<TopicGeneratorProps> = ({ onTopicsGenerated }) => {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [count, setCount] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedTopics, setGeneratedTopics] = useState<Topic[]>([]);

  const handleBrandSelect = (brand: Brand | null) => {
    setSelectedBrand(brand);
    setSelectedProduct(null); // Reset product when brand changes
  };

  const handleProductSelect = (product: Product | null) => {
    setSelectedProduct(product);
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0 && value <= 10) {
      setCount(value);
    }
  };

  const handleGenerateTopics = async () => {
    if (!selectedBrand) {
      setError('Please select a brand');
      return;
    }

    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const request: GenerateTopicsRequest = {
        brand_id: selectedBrand.id,
        prompt: prompt,
        count: count,
      };

      if (selectedProduct) {
        request.product_id = selectedProduct.id;
      }

      const response = await topicService.generateTopics(request);
      setGeneratedTopics(response.topics);
      
      if (onTopicsGenerated) {
        onTopicsGenerated(response.topics);
      }
    } catch (err) {
      console.error('Error generating topics:', err);
      setError('Failed to generate topics. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveTopic = async (topicId: string) => {
    try {
      await topicService.approveTopic(topicId);
      
      // Update the local state to reflect the change
      setGeneratedTopics(prevTopics => 
        prevTopics.map(topic => 
          topic.id === topicId 
            ? { ...topic, status: 'approved' } 
            : topic
        )
      );
    } catch (err) {
      console.error('Error approving topic:', err);
      setError('Failed to approve topic. Please try again.');
    }
  };

  const handleRejectTopic = async (topicId: string) => {
    try {
      await topicService.rejectTopic(topicId);
      
      // Update the local state to reflect the change
      setGeneratedTopics(prevTopics => 
        prevTopics.map(topic => 
          topic.id === topicId 
            ? { ...topic, status: 'rejected' } 
            : topic
        )
      );
    } catch (err) {
      console.error('Error rejecting topic:', err);
      setError('Failed to reject topic. Please try again.');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Generate Topics</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <ProductBrandSelector
        onBrandSelect={handleBrandSelect}
        onProductSelect={handleProductSelect}
      />
      
      <div className="mb-4">
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
          Prompt
        </label>
        <textarea
          id="prompt"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          rows={4}
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Enter a prompt to guide topic generation..."
          disabled={loading}
        />
        <p className="text-sm text-gray-500 mt-1">
          Describe what kind of topics you want to generate. Include target audience, content type, etc.
        </p>
      </div>
      
      <div className="mb-6">
        <label htmlFor="count" className="block text-sm font-medium text-gray-700 mb-1">
          Number of Topics
        </label>
        <input
          id="count"
          type="number"
          min="1"
          max="10"
          className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={count}
          onChange={handleCountChange}
          disabled={loading}
        />
      </div>
      
      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        onClick={handleGenerateTopics}
        disabled={loading || !selectedBrand || !prompt.trim()}
      >
        {loading ? 'Generating...' : 'Generate Topics'}
      </button>
      
      {generatedTopics.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Generated Topics</h3>
          <p className="text-sm text-gray-500 mb-4">
            Review the generated topics and approve or reject them.
          </p>
          
          <div className="space-y-4">
            {generatedTopics.map(topic => (
              <div key={topic.id} className="border rounded-md p-4">
                <h4 className="text-md font-semibold">{topic.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{topic.description}</p>
                
                <div className="flex items-center mt-2">
                  <span className="text-xs text-gray-500 mr-2">
                    {topic.target_audience && `Audience: ${topic.target_audience}`}
                  </span>
                  {topic.category && (
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {topic.category}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      topic.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      topic.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {topic.status.charAt(0).toUpperCase() + topic.status.slice(1)}
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
        </div>
      )}
    </div>
  );
};

export default TopicGenerator;
