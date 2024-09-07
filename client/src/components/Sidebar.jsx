import React, { useState } from 'react';
import axios from 'axios';

const Sidebar = ({ onChatSelect }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [chats, setChats] = useState([
    // Initial dummy chat data
    { name: "My Number (You)", lastMessage: "Sticker", time: "29-08-2024", profilePic: "https://via.placeholder.com/50", unreadCount: 0 },
    { name: "Ultimate fitness club", lastMessage: "Majeed Ultimate Gym Batheri: H...", time: "10:09 PM", profilePic: "https://via.placeholder.com/50", unreadCount: 1 },
    { name: "Nihal Nethram", lastMessage: "Image", time: "08:37 PM", profilePic: "https://via.placeholder.com/50", unreadCount: 0 },
    { name: "SILENCE ❤️ CORNER", lastMessage: "", time: "08:31 PM", profilePic: "https://via.placeholder.com/50", unreadCount: 3 },
  ]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/getUsers');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    fetchUsers();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddUserToChat = (user) => {
    const newChat = {
      name: `${user.firstName} ${user.lastName}`,
      lastMessage: "",
      time: new Date().toLocaleTimeString(),
      profilePic: "https://via.placeholder.com/50",
      unreadCount: 0,
    };

    setChats((prevChats) => [...prevChats, newChat]);
    handleCloseModal();
  };

  return (
    <div className="w-1/4 h-full bg-gray-800 p-4 flex flex-col">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-white">Chats</h1>
        <button
          onClick={handleOpenModal}
          className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 focus:outline-none"
        >
          New
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search or start a new chat"
          className="w-full p-2 rounded-full bg-gray-700 text-white placeholder-gray-400"
        />
      </div>

      <div className="flex-grow overflow-y-auto">
        {chats.map((chat, index) => (
          <div
            key={index}
            className="flex items-center p-2 hover:bg-gray-700 cursor-pointer"
            onClick={() => onChatSelect(chat)} // Call onChatSelect when chat is clicked
          >
            <img
              src={chat.profilePic}
              alt={chat.name}
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="text-white font-semibold">{chat.name}</h3>
                <span className="text-sm text-gray-400">{chat.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400">{chat.lastMessage}</p>
                {chat.unreadCount > 0 && (
                  <span className="bg-green-500 text-white text-xs rounded-full px-2">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg w-1/3">
            <h2 className="text-lg font-semibold mb-4">New Chat</h2>
            <input
              type="text"
              placeholder="Search contacts"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 mb-4 rounded bg-gray-700 text-white placeholder-gray-400"
            />
            <div className="overflow-y-auto max-h-64">
              {users
                .filter((user) =>
                  `${user.firstName} ${user.lastName}`
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map((user) => (
                  <div
                    key={user._id}
                    className="p-2 hover:bg-gray-700 cursor-pointer rounded-lg"
                    onClick={() => handleAddUserToChat(user)}
                  >
                    {user.firstName} {user.lastName} ({user.email})
                  </div>
                ))}
            </div>
            <button
              onClick={handleCloseModal}
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
