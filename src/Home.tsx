import React, { useEffect, useState, useRef } from 'react';
import { Github, Linkedin, Mail, ArrowRight, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Import chỉ các ảnh cần thiết từ thư mục slides
const images = Object.values(
  import.meta.glob('/src/assets/slides/*.{png,jpg,jpeg,svg}', { eager: true })
).map((module: any) => module.default);

// Import trực tiếp các ảnh từ thư mục assets/flags
import usFlag from '/src/assets/flags/us.png';
import vnFlag from '/src/assets/flags/vn.png';

// Import ảnh portrait
import portrait from '/src/assets/portrait/portrait_01.jpg';

const flags = {
  us: usFlag,
  vn: vnFlag,
};

const languages = [
  { code: 'en', label: 'English', flag: flags['us'] },
  { code: 'vi', label: 'Tiếng Việt', flag: flags['vn'] },
];

function Home() {
  const { t, i18n } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visitorCount, setVisitorCount] = useState<number | null>(null); // null = loading, -1 = failed, 0+ = success
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [timer, setTimer] = useState<number | null>(null); // Use number for `setTimeout`
  const visitorCountInitialized = useRef(false); // Prevent double-count in StrictMode

  const startTimer = () => {
    const newTimer = window.setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Set timer to 5 seconds
    setTimer(newTimer);
  };

  const resetTimer = () => {
    if (timer) {
      clearTimeout(timer); // Clear the existing timer
    }
    startTimer(); // Start a new timer
  };

  useEffect(() => {
    startTimer(); // Start the initial timer

    return () => {
      if (timer) clearTimeout(timer); // Cleanup timer on unmount
    };
  }, [images.length]);

  useEffect(() => {
    // Use localStorage to track visitor count
    // Prevent double-counting in React StrictMode using useRef
    if (visitorCountInitialized.current) return;
    visitorCountInitialized.current = true;
    
    try {
      const storedCount = localStorage.getItem('visitorCount');
      const currentCount = storedCount ? parseInt(storedCount, 10) + 1 : 1;
      
      localStorage.setItem('visitorCount', currentCount.toString());
      setVisitorCount(currentCount);
    } catch (error) {
      console.warn('Failed to update visitor count:', error);
      setVisitorCount(-1);
    }
  }, [visitorCountInitialized]);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    resetTimer(); // Reset timer on previous click
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    resetTimer(); // Reset timer on next click
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentImageIndex(index);
    resetTimer(); // Reset timer on indicator click
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
    setIsDropdownOpen(false); // Đóng dropdown sau khi chọn
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark text-dark dark:text-white transition-colors">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 dark:bg-dark/80 backdrop-blur-sm transition-colors">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-primary"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {t('siteTitle')}
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-primary transition"
            >
              {t('about')}
            </button>
            <button
              onClick={() => scrollToSection('work')}
              className="hover:text-primary transition"
            >
              {t('project')}
            </button>
            <button
              onClick={() => scrollToSection('connect')}
              className="hover:text-primary transition"
            >
              {t('connect')}
            </button>
            <ThemeToggle />
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="flex items-center gap-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-t px-2 py-1 text-gray-800 dark:text-gray-200 bg-white dark:bg-dark focus:outline-none focus:ring-2 focus:ring-primary whitespace-nowrap w-40">
                <img
                  src={languages.find((lang) => lang.code === currentLanguage)?.flag}
                  alt={`${currentLanguage} Flag`}
                  className="inline-block w-5 h-5 rounded-full"
                />
                {languages.find((lang) => lang.code === currentLanguage)?.label}
              </button>
              <ul
                className={`absolute left-0 w-40 bg-white dark:bg-dark border border-gray-300 dark:border-gray-600 rounded-b shadow-lg transition-all duration-250 ${
                  isDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                {languages.map((lang) => (
                  <li
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer whitespace-nowrap"
                  >
                    <img src={lang.flag} alt={`${lang.label} Flag`} className="inline-block w-5 h-5 rounded-full" />
                    {lang.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center bg-white dark:bg-dark transition-colors">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed transition-opacity duration-1000"
            style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
          ></div>
          <div className="absolute inset-0 bg-dark/50 dark:bg-dark/75 transition-colors"></div>
        </div>
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl">
            <h1 className="text-7xl md:text-9xl font-bold mb-6 animate-fade-in-up">
              <span className="text-stroke dark:text-stroke-light">{t('welcome')}</span>
              <br />
              <span className="text-primary">{t('name')}</span>
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-300 mb-8 max-w-2xl animate-fade-in-up delay-200">
              {t('heroDescription')}
            </p>
            <div className="flex gap-4 animate-fade-in-up delay-400">
              <button onClick={() => scrollToSection('work')} className="bg-primary hover:bg-primary-dark px-8 py-4 rounded-full flex items-center gap-2">
                {t('myProject.title')} <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={() => scrollToSection('about')} className="bg-primary hover:bg-primary-dark px-8 py-4 rounded-full flex items-center gap-2">
                {t('aboutMe.title')} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <button onClick={handlePrevClick} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={handleNextClick} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full">
          <ChevronRight className="w-6 h-6" />
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleIndicatorClick(index)}
              className={`w-3 h-3 rounded-full ${currentImageIndex === index ? 'bg-primary' : 'bg-gray-400'}`}
            ></button>
          ))}
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-100 dark:bg-dark-light transition-colors">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="reveal">
              <h2 className="text-6xl font-bold mb-8">
                {t('aboutMe.title').split(' ').slice(0, -1).join(' ')}{' '}
                <span className="text-primary">{t('aboutMe.title').split(' ').slice(-1)}</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('aboutMe.description')}
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-2">{t('skills')}</h3>
                  <div className="space-y-4">
                    {[
                      { skill: 'C/C++', level: 8 },
                      { skill: 'Java', level: 7 },
                      { skill: 'Kotlin', level: 5 },
                      { skill: 'C#', level: 6 },
                    ].map((item, index) => (
                      <div key={index} className="reveal">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{item.skill}</span>
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{item.level}/10</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-primary to-primary-light h-2.5 rounded-full"
                            style={{
                              '--progress-width': `${item.level * 10}%`,
                            } as React.CSSProperties}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative reveal">
              <img 
                src={portrait} // Sử dụng biến import để đảm bảo ảnh được bao gồm trong build
                alt={t('developerWorkspace')}
                className="rounded-lg"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 bg-white dark:bg-dark transition-colors">
        <div className="container mx-auto px-4">
          <h2 className="text-6xl font-bold mb-16 reveal">
            {t('myProject.title').split(' ').slice(0, -1).join(' ')}{' '}
            <span className="text-primary">{t('myProject.title').split(' ').slice(-1)}</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((project) => (
              <div key={project} className="relative h-[400px] project-card group reveal">
                <img 
                  src={`https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=800&fit=crop`}
                  alt={`${t('project')} ${project}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <h3 className="text-2xl font-bold mb-2">{t('project')} {project}</h3>
                  <p className="text-gray-300 mb-4">{t('webDevelopment')} / {t('uiDesign')}</p>
                  <a href="#" className="inline-flex items-center gap-2 text-primary hover:gap-4 transition-all">
                    {t('myProject.view')} <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* connect Section */}
      <section id="connect" className="py-20 bg-white dark:bg-dark transition-colors">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center reveal">
            <h2 className="text-6xl font-bold mb-8">
              {t('connectWithMe.title').split(' ').slice(0, -1).join(' ')}{' '}
              <span className="text-primary">{t('connectWithMe.title').split(' ').slice(-1).join(' ')}</span>
            </h2>
            <div className="flex justify-center gap-6">
              <a href="https://github.com/NTH2k4" className="social-button github">
                <div className="icon">
                  <Github className="w-6 h-6" />
                </div>
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/beater/" className="social-button linkedin">
                <div className="icon">
                  <Linkedin className="w-6 h-6" />
                </div>
                <span>LinkedIn</span>
              </a>
              <a href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSHxjWGvdvdSqrxpQRgWXWDnkFbCtDXnbwcvFFPBMSzJqGpJXczbQfFJFTKKMXPvKrtfQfMW" className="social-button email">
                <div className="icon">
                  <Mail className="w-6 h-6" />
                </div>
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-dark-light py-8 transition-colors relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400">© 2025 BEATER. {t('allRightsReserved')}</p>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 text-sm text-gray-600 dark:text-gray-400">
          {visitorCount !== null && visitorCount >= 0 && `${t('visitors')}: ${visitorCount}`}
        </div>
      </footer>
    </div>
  );
}

export default Home;