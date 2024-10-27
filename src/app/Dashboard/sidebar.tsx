import React, { useState } from 'react';
import { FaAsterisk, FaHistory, FaInfoCircle, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`h-full text-gray-800 flex flex-col p-4 space-y-6 shadow-lg ${
        isOpen ? 'w-60' : 'w-16'
      } transition-all duration-300 ease-in-out border border-gray-300 mt-2 ml-2`}
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }} // Arka plan rengi %90 opak beyaz
    >
      {/* Sidebar Başlığı */}
      <button
        onClick={toggleSidebar}
        className="text-gray-800 hover:text-gray-900 transition-colors mb-6 flex items-center justify-center space-x-2"
      >
        {isOpen ? (
          <>
            <FaAsterisk size={24} className="text-center" />
            <h2 className="text-lg font-semibold tracking-wide text-left">Menü</h2>
          </>
        ) : (
          <FaAsterisk size={24} className="text-center" />
        )}
      </button>

      {/* Chatbot Başlatma Butonu */}
      <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md flex items-center justify-center space-x-2 transition-all">
        {isOpen ? (
          <>
            <FaAsterisk />
            <span className="text-left">Chatbot Başlat</span>
          </>
        ) : (
          <FaAsterisk />
        )}
      </button>

      {/* Sohbet Geçmişi */}
      <div className="flex flex-col">
        <div className="flex items-center justify-center space-x-2">
          {isOpen ? (
            <>
              <FaHistory />
              <h3 className="text-sm font-medium text-gray-700 text-left">Sohbet Geçmişi</h3>
            </>
          ) : (
            <FaHistory />
          )}
        </div>
        {isOpen && (
          <ul className="space-y-1 text-sm text-gray-600 mt-2 text-left">
            <li className="hover:text-gray-800 transition-colors">Son sohbet 1</li>
            <li className="hover:text-gray-800 transition-colors">Son sohbet 2</li>
            <li className="hover:text-gray-800 transition-colors">Son sohbet 3</li>
          </ul>
        )}
      </div>

      {/* Hakkında Bölümü */}
      <div className="flex flex-col">
        <div className="flex items-center justify-center space-x-2">
          {isOpen ? (
            <>
              <FaInfoCircle />
              <h3 className="text-sm font-medium text-gray-700 text-left">Hakkında</h3>
            </>
          ) : (
            <FaInfoCircle />
          )}
        </div>
        {isOpen && (
          <p className="text-xs text-gray-600 mt-2 text-left">
            Bu chatbot, kullanıcılarla etkileşim kurmak için geliştirilmiştir.
          </p>
        )}
      </div>

      {/* Ayarlar */}
      <div className="flex flex-col">
        <div className="flex items-center justify-center space-x-2">
          {isOpen ? (
            <>
              <FaCog />
              <h3 className="text-sm font-medium text-gray-700 text-left">Ayarlar</h3>
            </>
          ) : (
            <FaCog />
          )}
        </div>
        {isOpen && (
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 w-full rounded-md mt-2 text-sm text-left transition-all">
            Dil Seçimi
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
