// src/app/Dashboard/Sidebar.tsx

"use client"; // Ensure this component is treated as a Client Component

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import Next.js router for client-side navigation
import { FaAsterisk } from 'react-icons/fa';
import { HiOutlineChatAlt2, HiOutlineInformationCircle, HiOutlineCog } from 'react-icons/hi';
import { MdQuiz } from 'react-icons/md';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState('4rem');
  const router = useRouter(); // Use router to navigate to pages

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      setSidebarWidth('16rem');
    } else {
      setSidebarWidth('4rem');
    }
  }, [isOpen]);

  return (
    <div
      className={`h-full flex flex-col p-4 transition-all duration-300 ease-in-out shadow-lg bg-gray-800 rounded-r-lg`}
      style={{ width: sidebarWidth, transition: 'width 0.3s ease-in-out' }}
    >
      <button
        onClick={toggleSidebar}
        className={`flex items-center mb-6 text-white transition-colors duration-200 hover:text-gray-300 ${
          isOpen ? 'justify-start space-x-3' : 'justify-center'
        }`}
      >
        <FaAsterisk size={24} className="text-[#990000] dark:text-white" />
        {isOpen && <h2 className="text-lg font-semibold text-gray-100 ml-2">VisionAI</h2>}
      </button>

      <div className="flex flex-col space-y-3 mt-4">
        <SidebarItem
          icon={<HiOutlineChatAlt2 size={20} />}
          label="Chatbot Başlat"
          onClick={() => router.push('/')}
          isOpen={isOpen}
        />

        {/* Redirect "Hakkında" to /hakkimizda */}
        <SidebarItem
          icon={<HiOutlineInformationCircle size={20} />}
          label="Hakkında"
          onClick={() => router.push('/hakkimizda')}
          isOpen={isOpen}
        />

        <SidebarItem
          icon={<MdQuiz size={20} />}
          label="Quiz Ol"
          onClick={() => router.push('/quiz')}
          isOpen={isOpen}
        />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, onClick, isOpen }) => (
  <button
    onClick={onClick}
    className={`flex items-center p-2 rounded-md text-gray-300 hover:text-white transition-colors duration-200 hover:bg-gray-700 ${
      isOpen ? 'justify-start space-x-4' : 'justify-center'
    }`}
  >
    {icon}
    {isOpen && <span className="text-md ml-2">{label}</span>}
  </button>
);

export default Sidebar;
