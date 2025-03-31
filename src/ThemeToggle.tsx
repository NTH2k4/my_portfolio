import React, { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="btn-container">
      <div className="btn-color-mode-switch">
        <input
          type="checkbox"
          id="theme-toggle"
          checked={isDarkMode}
          onChange={handleToggle}
        />
        <label
          htmlFor="theme-toggle"
          className="btn-color-mode-switch-inner"
          data-on="Dark"
          data-off="Light"
        ></label>
      </div>
    </div>
  );
};