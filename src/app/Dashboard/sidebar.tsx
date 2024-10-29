import React, { useState } from 'react';
import { FaAsterisk } from 'react-icons/fa';
import { HiOutlineChatAlt2, HiOutlineClock, HiOutlineInformationCircle, HiOutlineCog } from 'react-icons/hi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar başlangıçta kapalı

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`h-full text-gray-200 flex flex-col p-4 ${
        isOpen ? 'w-48' : 'w-14'
      } transition-all duration-300 ease-in-out bg-gray-900 shadow-lg`}
    >
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`text-white hover:text-gray-300 transition-colors mb-6 flex items-center ${
          isOpen ? 'justify-start space-x-3' : 'justify-center'
        }`}
      >
        <FaAsterisk size={24} />
        {isOpen && <h2 className="text-base font-semibold text-white">VisionAI</h2>}
      </button>

      {/* Menü Öğeleri */}
      <div className="flex flex-col space-y-4">
        {/* Chatbot Launch Button */}
        <button
          className={`${
            isOpen ? 'flex items-center space-x-3' : 'justify-center'
          } text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-2 py-2 transition-all`}
        >
          <HiOutlineChatAlt2 size={20} />
          {isOpen && <span>Chatbot Başlat</span>}
        </button>

        {/* Chat History */}
        <button
          className={`${
            isOpen ? 'flex items-center space-x-3' : 'justify-center'
          } text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-2 py-2 transition-all`}
        >
          <HiOutlineClock size={20} />
          {isOpen && <span>Geçmiş</span>}
        </button>

        {/* About */}
        <button
          className={`${
            isOpen ? 'flex items-center space-x-3' : 'justify-center'
          } text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-2 py-2 transition-all`}
        >
          <HiOutlineInformationCircle size={20} />
          {isOpen && <span>Hakkında</span>}
        </button>

        {/* Settings */}
        <button
          className={`${
            isOpen ? 'flex items-center space-x-3' : 'justify-center'
          } text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-2 py-2 transition-all`}
        >
          <HiOutlineCog size={20} />
          {isOpen && <span>Ayarlar</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
