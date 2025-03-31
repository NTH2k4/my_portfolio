import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Github, Linkedin, Mail, ArrowRight, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Link } from 'react-router-dom';

// Import all images from the slides directory
const images = Object.values(import.meta.glob('/dist/assets/slides/*.{png,jpg,jpeg,svg}', { eager: true })).map((module: any) => module.default);

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);

  const marqueeAnimation = useSpring({
    from: { transform: 'translateX(0%)' },
    to: { transform: 'translateX(-100%)' },
    config: { duration: 30000 }, // 30 seconds for smooth motion
    loop: true,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    // Fetch and update visitor count using CountAPI
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch('https://api.countapi.xyz/hit/beater-portfolio/homepage-visitors');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVisitorCount(data.value);
      } catch (error) {
        console.error('Failed to fetch visitor count:', error);
        setVisitorCount(0); // Fallback value
      }
    };

    fetchVisitorCount();
  }, []);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentImageIndex(index);
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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"], button');
    links.forEach(link => {
      link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href')?.substring(1);
        if (targetId) {
          event.preventDefault();
          scrollToSection(targetId);
        }
      });
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', (event) => {
          const targetId = link.getAttribute('href')?.substring(1);
          if (targetId) {
            event.preventDefault();
            scrollToSection(targetId);
          }
        });
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-dark text-dark dark:text-white transition-colors">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 dark:bg-dark/80 backdrop-blur-sm transition-colors">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">BEATER.</Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="hover:text-primary transition">About</a>
            <a href="#work" className="hover:text-primary transition">Work</a>
            <a href="#contact" className="hover:text-primary transition">Contact</a>
            <ThemeToggle />
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
          <div className="absolute inset-0 bg-white/75 dark:bg-dark/75 transition-colors"></div>
        </div>
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl">
            <h1 className="text-7xl md:text-9xl font-bold mb-6 animate-fade-in-up">
              <span className="text-stroke dark:text-stroke-light">Welcome!</span>
              <br />
              <span className="text-primary">My name is Hieu.</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl animate-fade-in-up delay-200">
              Welcome to my portfolio website!
            </p>
            <div className="flex gap-4 animate-fade-in-up delay-400">
              <button onClick={() => scrollToSection('work')} className="bg-primary hover:bg-primary-dark px-8 py-4 rounded-full flex items-center gap-2">
                My Project <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={() => scrollToSection('about')} className="bg-primary hover:bg-primary-dark px-8 py-4 rounded-full flex items-center gap-2">
                About Me <ArrowRight className="w-5 h-5" />
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
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <h2 className="text-6xl font-bold mb-8">
                About <span className="text-primary">Me</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                I'm a creative developer with a passion for building beautiful, functional websites and applications. With expertise in modern web technologies, I bring ideas to life through clean code and intuitive design.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-2">Skills</h3>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                    <li>C/C++</li>
                    <li>Java</li>
                    <li>Kotlin</li>
                    <li>C#</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Experience</h3>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                    <li>3+ Years</li>
                    <li>2+ Projects</li>
                    <li>1+ Clients</li>
                  </ul>
                </div>
              </div>
              <Link to="/about" className="inline-block mt-4 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full">
                See more
              </Link>
            </div>
            <div className="relative reveal">
              <img 
                src="dist/assets/portrait/portrait_01.jpg"
                alt="Developer workspace"
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
            My <span className="text-primary">Project</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((project) => (
              <div key={project} className="relative h-[400px] project-card group reveal">
                <img 
                  src={`https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=800&fit=crop`}
                  alt={`Project ${project}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <h3 className="text-2xl font-bold mb-2">Project {project}</h3>
                  <p className="text-gray-300 mb-4">Web Development / UI Design</p>
                  <a href="#" className="inline-flex items-center gap-2 text-primary hover:gap-4 transition-all">
                    View Project <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-dark transition-colors">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center reveal">
            <h2 className="text-6xl font-bold mb-8">
              My <span className="text-primary">Social Network</span>
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
            <p className="text-gray-600 dark:text-gray-400">© 2024 BEATER. All rights reserved.</p>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 text-sm text-gray-600 dark:text-gray-400">
          Visitors: {visitorCount}
        </div>
      </footer>
    </div>
  );
}

export default Home;