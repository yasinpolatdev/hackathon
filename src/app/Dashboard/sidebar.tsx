import React, { useState } from 'react';
import { FaAsterisk } from 'react-icons/fa';
import { HiOutlineChatAlt2, HiOutlineClock, HiOutlineInformationCircle, HiOutlineCog } from 'react-icons/hi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`h-full text-gray-200 flex flex-col p-4 space-y-6 ${
        isOpen ? 'w-60' : 'w-16'
      } transition-all duration-300 ease-in-out bg-black`}
    >
      {/* Sidebar Header */}
      <button
        onClick={toggleSidebar}
        className={`text-gray-200 hover:text-gray-300 transition-colors mb-6 flex items-center ${
          isOpen ? 'justify-start space-x-2' : 'justify-center'
        }`}
      >
        <FaAsterisk size={24} />
        {isOpen && <h2 className="text-lg font-semibold">VisionAI</h2>}
      </button>

      {/* Chatbot Launch Button */}
      <button
        className={`${
          isOpen
            ? 'bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md'
            : 'bg-transparent'
        } text-gray-200 flex items-center transition-all ${
          isOpen ? 'justify-start space-x-2' : 'justify-center'
        }`}
      >
        <HiOutlineChatAlt2 size={20} />
        {isOpen && <span>Launch Chatbot</span>}
      </button>

      {/* Chat History */}
      <div className="flex flex-col space-y-2"> {/* Added space-y-2 for vertical spacing */}
        <div
          className={`flex items-center ${
            isOpen ? 'justify-start space-x-2' : 'justify-center'
          }`}
        >
          <HiOutlineClock size={20} />
          {isOpen && <h3 className="text-sm font-medium">Chat History</h3>}
        </div>
        {isOpen && (
          <ul className="space-y-1 text-sm mt-2">
            <li className="hover:text-gray-400">Recent Chat 1</li>
            <li className="hover:text-gray-400">Recent Chat 2</li>
            <li className="hover:text-gray-400">Recent Chat 3</li>
          </ul>
        )}
      </div>

      {/* About Section */}
      <div className="flex flex-col space-y-2">
        <div
          className={`flex items-center ${
            isOpen ? 'justify-start space-x-2' : 'justify-center'
          }`}
        >
          <HiOutlineInformationCircle size={20} />
          {isOpen && <h3 className="text-sm font-medium">About</h3>}
        </div>
        {isOpen && (
          <p className="text-xs mt-2">
            This chatbot is developed to interact with users.
          </p>
        )}
      </div>

      {/* Settings */}
      <div className="flex flex-col space-y-2">
        <div
          className={`flex items-center ${
            isOpen ? 'justify-start space-x-2' : 'justify-center'
          }`}
        >
          <HiOutlineCog size={20} />
          {isOpen && <h3 className="text-sm font-medium">Settings</h3>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
