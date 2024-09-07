import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import RightSidebar from './RightSidebar';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null); // State for the selected chat

  // Function to handle chat selection
  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar for chats */}
      <Sidebar onChatSelect={handleChatSelect} />

      {/* Main chat window */}
      <div className="flex-1 flex flex-col">
        <ChatWindow chat={selectedChat} />
      </div>

      {/* Right sidebar for settings and files */}
      <RightSidebar />
    </div>
  );
};

export default ChatPage;
