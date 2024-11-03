// app/about/page.tsx

import React from 'react';
import Sidebar from "../Dashboard/Sidebar";

const AboutPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <Sidebar />

      <main className="flex-grow p-8">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
          <h1 className="text-3xl font-bold mb-8 text-center">Hakkımızda</h1>

          {/* About VisionAI Section */}
          <section className="mb-8 pb-8 border-b border-gray-300 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-2">VisionAI Nedir?</h2>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              VisionAI, yapay zeka çözümlerini günlük hayatın ve iş dünyasının çeşitli alanlarına entegre ederek bireylerin ve işletmelerin akıllı kararlar almasına olanak tanır. Gelişmiş analiz araçlarımız ve öğrenme algoritmalarımız sayesinde, kullanıcılarımıza veri odaklı çözümler sunuyoruz. VisionAI, nesne tanıma, doğal dil işleme ve veri analizinde güçlü teknolojilere sahiptir ve iş akışlarını daha verimli hale getirmek amacıyla yenilikçi çözümler sunmaktadır.
            </p>
          </section>

          {/* Mission Section */}
          <section className="mb-8 pb-8 border-b border-gray-300 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-2">Misyonumuz</h2>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Yapay zekayı herkes için erişilebilir kılmak ve bilgiye ulaşmayı daha hızlı ve doğru hale getirmek temel misyonumuzdur. VisionAI olarak, teknolojiyi sadeleştirip herkesin kolaylıkla kullanabileceği hale getirmek için çalışıyoruz. Teknolojiyle güçlendirilmiş bir dünyada, bilginin doğru kullanılması ile topluma fayda sağlamayı amaçlıyoruz. Yapay zekanın hayatın her alanında yer alabileceğine inanıyoruz. Misyonumuz, kullanıcılarımızın ve müşterilerimizin günlük sorunlarını çözmelerine yardımcı olacak araçlar geliştirmek ve yapay zeka teknolojilerini sosyal sorumluluk bilinciyle harmanlayarak topluma değer katmaktır.
            </p>
          </section>

          {/* Vision Section */}
          <section className="mb-8 pb-8 border-b border-gray-300 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-2">Vizyonumuz</h2>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Teknolojinin hızla geliştiği dünyada, VisionAI olarak öncü bir rol üstlenmeyi hedefliyoruz. Vizyonumuz, yapay zeka teknolojilerini yaşamları kolaylaştıracak ve daha verimli hale getirecek çözümler sunarak dijital dönüşümü desteklemektir. Küresel bir teknoloji sağlayıcısı olarak, güvenilirlik ve şeffaflık ilkeleri doğrultusunda inovasyonu sürdürmeye kararlıyız.
            </p>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              VisionAI, iş dünyasında ve günlük yaşamda daha sürdürülebilir ve bilinçli bir geleceği mümkün kılmayı amaçlar. Yenilikçi ve etik bir yapay zeka ekosistemi oluşturarak, dünyayı daha iyi bir yer haline getirmeye katkı sağlamak öncelikli hedefimizdir.
            </p>
          </section>

          {/* Developer Credits */}
          <footer className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              Bu uygulama, iki kişilik öğrenci geliştirici ekibimiz tarafından hazırlanmıştır.{' '}
              <a href="https://github.com/Abdussamed-1" className="font-medium text-blue-600 dark:text-blue-400 underline">
                Abdussamet Erkalp
              </a>{' '}
              ve{' '}
              <a href="https://github.com/yasinpolatdev/" className="font-medium text-blue-600 dark:text-blue-400 underline">
                Yasin Polat
              </a>{' '}
              olarak, eğitim hayatımız süresince öğrendiklerimizi uygulayarak bu projeyi geliştirdik. VisionAI ekibine ve tüm katkıda bulunanlara teşekkür ederiz.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
