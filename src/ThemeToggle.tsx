import React from 'react';
import { useTheme } from './ThemeContext';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="btn-container">
      <div className="btn-color-mode-switch">
        <input
          type="checkbox"
          id="theme-toggle"
          checked={theme === 'dark'}
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