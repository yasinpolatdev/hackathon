import React, { useState, useEffect } from 'react';
import { FaAsterisk } from 'react-icons/fa';
import { HiOutlineChatAlt2, HiOutlineClock, HiOutlineInformationCircle, HiOutlineCog } from 'react-icons/hi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar başlangıçta kapalı
  const [isChatbotStarted, setIsChatbotStarted] = useState(false); // Chatbot durumu
  const [sidebarWidth, setSidebarWidth] = useState('4rem'); // Genişliği başta dar olarak ayarla

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // isOpen değiştiğinde genişlik ayarlarını güncelle
    if (isOpen) {
      setSidebarWidth('16rem'); // Açık genişlik
    } else {
      setSidebarWidth('4rem'); // Kapalı genişlik
    }
  }, [isOpen]);

  const startChatbot = () => {
    setIsChatbotStarted(true);
    console.log("Chatbot Başlatıldı!");
  };

  return (
    <div
      className={`h-full flex flex-col p-4 transition-all duration-300 ease-in-out shadow-lg bg-gray-800 rounded-r-lg`}
      style={{ width: sidebarWidth, transition: 'width 0.3s ease-in-out' }}
    >
      {/* Sidebar Aç/Kapa Butonu */}
      <button
        onClick={toggleSidebar}
        className={`flex items-center mb-6 text-white transition-colors duration-200 hover:text-gray-300 ${
          isOpen ? 'justify-start space-x-3' : 'justify-center'
        }`}
      >
        <FaAsterisk size={24} className="text-[#990000] dark:text-white" />
        {isOpen && <h2 className="text-lg font-semibold text-gray-100 ml-2">VisionAI</h2>}
      </button>

      {/* Menü Öğeleri */}
      <div className="flex flex-col space-y-3 mt-4">
        <SidebarItem
          icon={<HiOutlineChatAlt2 size={20} />}
          label="Chatbot Başlat"
          onClick={startChatbot}
          isOpen={isOpen}
        />
        <SidebarItem
          icon={<HiOutlineClock size={20} />}
          label="Geçmiş"
          onClick={() => console.log("Geçmiş")}
          isOpen={isOpen}
        />
        <SidebarItem
          icon={<HiOutlineInformationCircle size={20} />}
          label="Hakkında"
          onClick={() => console.log("Hakkında")}
          isOpen={isOpen}
        />
        <SidebarItem
          icon={<HiOutlineCog size={20} />}
          label="Ayarlar"
          onClick={() => console.log("Ayarlar")}
          isOpen={isOpen}
        />
      </div>

      {/* Chatbot Durumunu Koşullu Olarak Göster */}
      {isChatbotStarted && isOpen && (
        <div className="mt-4 text-sm text-green-500">
          Chatbot Başlatıldı!
        </div>
      )}
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
    {isOpen && <span className="text-md ml-2">{label}</span>} {/* Label ile ikon arasına boşluk ekledik */}
  </button>
);

export default Sidebar;
