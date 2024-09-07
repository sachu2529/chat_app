import React from 'react';

const ChatWindow = ({ chat }) => {
  if (!chat) {
    return (
      <div className="flex-1 flex flex-col bg-gray-900 p-4">
        <div className="flex items-center justify-between p-4 bg-gray-800">
          <p className="text-gray-500">Select a chat to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-900 p-4">
      <div className="flex items-center justify-between p-4 bg-gray-800">
        <div className="flex items-center">
          <img
            src={chat.profilePic}
            alt="User Avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-medium">{chat.name}</p>
            <p className="text-sm text-green-400">Active now</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {/* Add icons for call, video, and more */}
        </div>
      </div>
      <div className="flex-1 overflow-y-scroll p-4">
        {/* Messages will go here */}
      </div>
      <div className="p-4">
        <input
          type="text"
          placeholder="Type a message"
          className="w-full bg-gray-800 p-2 rounded-md"
        />
      </div>
    </div>
  );
};

export default ChatWindow;
