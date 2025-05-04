
import React from 'react';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { AIResponseTemplates } from './AIResponseTemplates';
import { QuickReplies } from './QuickReplies';
import { NotesContent } from './NotesContent';
import { useChatActions } from './useChatActions';
import { mockChatMessages } from '@/data/mock/chat';
import { aiResponseTemplates, quickReplies } from './chatConstants';
import { Bot, MessageCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function ChatWindow() {
  const {
    messages,
    newMessage,
    showAIOptions,
    isTyping,
    activeTab,
    setNewMessage,
    setShowAIOptions,
    setActiveTab,
    handleSendMessage,
    handleKeyDown
  } = useChatActions(mockChatMessages);
  
  return (
    <div className="flex flex-col flex-1">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
        <div className="hidden md:block border-b bg-gray-50/50 dark:bg-gray-900/50">
          <TabsList className="h-12 w-full justify-start rounded-none bg-transparent border-b px-4">
            <TabsTrigger value="chat" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 rounded-t-lg rounded-b-none border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
              <MessageCircle className="h-4 w-4 mr-2" />
              Trò chuyện
            </TabsTrigger>
            <TabsTrigger value="notes" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 rounded-t-lg rounded-b-none border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
              <Bot className="h-4 w-4 mr-2" />
              Ghi chú AI
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="chat" className="flex-1 overflow-y-auto m-0">
          <ChatMessages messages={messages} isTyping={isTyping} />
        </TabsContent>
        
        <TabsContent value="notes" className="flex-1 overflow-y-auto p-4 bg-gray-50/30 dark:bg-gray-900/30 m-0">
          <NotesContent />
        </TabsContent>
      
        <div className="bg-white dark:bg-gray-950 p-4 border-t">
          {showAIOptions && (
            <AIResponseTemplates 
              templates={aiResponseTemplates}
              onSelectTemplate={(content) => setNewMessage(content)}
              onClose={() => setShowAIOptions(false)}
            />
          )}
          
          <QuickReplies 
            replies={quickReplies}
            onSelectReply={(reply) => setNewMessage(reply)}
          />
          
          <ChatInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSendMessage={handleSendMessage}
            handleKeyDown={handleKeyDown}
            showAIOptions={showAIOptions}
            setShowAIOptions={setShowAIOptions}
          />
        </div>
      </Tabs>
    </div>
  );
}
