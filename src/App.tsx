import React, { useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, Menu } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Link, Route, Routes } from 'react-router-dom'; // Add Route and Routes
import About from './About'; // Import About component
import Home from './Home'; // Ensure the path is correct

function App() {
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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;