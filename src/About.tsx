import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';

function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const dates = ['09/2022', '12/2023', '12/2024'];

  const indicatorStyle = useSpring({
    top: `${activeIndex * 100}px`, // Adjust based on the height of each timeline dot
    config: { tension: 200, friction: 20 },
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.timeline-section');
      let index = 0;
      sections.forEach((section, i) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          index = i;
        }
      });
      setActiveIndex(index);
    };

    document.querySelector('.content')?.addEventListener('scroll', handleScroll);
    return () => document.querySelector('.content')?.removeEventListener('scroll', handleScroll);
  }, []);

  const handleIndicatorClick = (index: number) => {
    setActiveIndex(index);
    document.getElementById(`section-${index}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark text-dark dark:text-white transition-colors flex">
      <div className="w-1/4 relative">
        <div className="sticky top-20 flex flex-col items-center">
          <animated.div
            style={indicatorStyle}
            className="absolute w-6 h-6 bg-primary rounded-full -left-3 z-10"
          ></animated.div>
          {dates.map((date, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`timeline-dot cursor-pointer transition-colors duration-500 ${
                  activeIndex === index ? 'active' : ''
                }`}
                onClick={() => handleIndicatorClick(index)}
              >
                {date}
              </div>
              {index < dates.length - 1 && (
                <div className={`timeline-line transition-colors duration-500 ${activeIndex >= index ? 'active' : ''}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="w-3/4 content overflow-y-auto">
        <div id="section-0" className="timeline-section mb-20">
          <h2 className="text-4xl font-bold mb-4">09/2022</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Hello! I'm Hieu, a creative developer with a passion for building beautiful, functional websites and applications.
          </p>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            With expertise in modern web technologies, I bring ideas to life through clean code and intuitive design.
          </p>
        </div>
        <div id="section-1" className="timeline-section mb-20">
          <h2 className="text-4xl font-bold mb-4">12/2023</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            I have experience in various programming languages and frameworks, including C/C++, Java, Kotlin, and SQL Server.
          </p>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Over the past 3+ years, I have worked on multiple projects and collaborated with clients to deliver high-quality solutions.
          </p>
        </div>
        <div id="section-2" className="timeline-section mb-20">
          <h2 className="text-4xl font-bold mb-4">12/2024</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Feel free to explore my portfolio and get in touch if you have any questions or would like to work together.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
