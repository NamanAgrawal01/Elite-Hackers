import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('terminal-theme') || 'matrix');

  const themes = {
    matrix: { name: 'Matrix Green', primary: '#00ff88', glow: 'rgba(0, 255, 136, 0.4)', bg: '#050508' },
    cobalt: { name: 'Cobalt Blue', primary: '#00d4ff', glow: 'rgba(0, 212, 255, 0.4)', bg: '#050a14' },
    cyber: { name: 'Cyber Red', primary: '#ff003c', glow: 'rgba(255, 0, 60, 0.4)', bg: '#0b0404' },
    amber: { name: 'Classic Amber', primary: '#ffb300', glow: 'rgba(255, 179, 0, 0.4)', bg: '#0a0805' },
    ghost: { name: 'Ghost White', primary: '#e2e8f0', glow: 'rgba(255, 255, 255, 0.2)', bg: '#0d1117' }
  };

  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = themes[theme] || themes.matrix;
    
    root.style.setProperty('--primary', currentTheme.primary);
    root.style.setProperty('--primary-glow', currentTheme.glow);
    root.style.setProperty('--bg-primary', currentTheme.bg);
    root.setAttribute('data-theme', theme);
    
    localStorage.setItem('terminal-theme', theme);
  }, [theme]);

  const toggleTheme = (newTheme) => {
    if (themes[newTheme]) {
      setTheme(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeProvider;