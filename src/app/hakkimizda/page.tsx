// app/about/page.tsx

import React from 'react';
import Sidebar from "../Dashboard/Sidebar";

const AboutPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-white">
      <Sidebar /> 
      
      <main className="flex-grow p-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 dark:text-white">Hakkımızda</h1>

          {/* About VisionAI Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">VisionAI Nedir?</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              VisionAI, gelişmiş yapay zeka çözümlerini kullanarak bireylere ve işletmelere günlük yaşamda ve iş süreçlerinde daha akıllı kararlar
              vermeleri için yardımcı olan bir platformdur. VisionAI, chatbot entegrasyonu, etkileşimli quiz seçenekleri ve kullanıcı dostu bir deneyim
              sunarak, bilgiye daha hızlı ve etkili bir şekilde ulaşmayı sağlar.
            </p>
          </section>

          {/* Mission Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Misyonumuz</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              VisionAI olarak misyonumuz, yapay zekayı erişilebilir hale getirerek kullanıcılarımızın bilgiye daha hızlı ve doğru bir şekilde
              ulaşmalarını sağlamaktır. Teknolojiyi herkes için kolay ve erişilebilir hale getirmeyi amaçlıyoruz.
            </p>
          </section>

          {/* Vision Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Vizyonumuz</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Vizyonumuz, yapay zekanın gücünü kullanarak, insanların yaşamlarını daha verimli hale getirmek ve işletmelerin dijital dönüşüm süreçlerini
              hızlandırmaktır. İleri düzey yapay zeka algoritmalarıyla, dünya çapında güvenilir bir teknoloji sağlayıcısı olmayı hedefliyoruz.
            </p>
          </section>

          {/* Meet the Team Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Ekibimiz</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              VisionAI, alanında uzman mühendisler, veri bilimciler, ürün tasarımcıları ve müşteri destek ekiplerinden oluşmaktadır. 
              Ekibimiz, yapay zeka teknolojilerini daha erişilebilir ve kullanıcı dostu hale getirmek için tutkuyla çalışmaktadır.
            </p>
          </section>

          {/* Contact Information Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Bizimle İletişime Geçin</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              VisionAI hakkında daha fazla bilgi almak veya önerilerinizi paylaşmak için bizimle iletişime geçin. Destek ekibimiz, 
              sorularınızı yanıtlamaktan mutluluk duyar. Bize{' '}
              <a href="mailto:info@visionai.com" className="text-blue-600 dark:text-blue-400 underline">
                info@visionai.com
              </a>{' '}
              adresinden ulaşabilirsiniz.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
