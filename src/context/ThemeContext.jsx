import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('terminal-theme') || 'matrix');

  const themes = {
    matrix: { name: 'Matrix Green', primary: '#00ff88', glow: 'rgba(0, 255, 136, 0.4)', bg: '#02040a' },
    cobalt: { name: 'Cobalt Blue', primary: '#00f2ff', glow: 'rgba(0, 242, 255, 0.4)', bg: '#020617' },
    cyber: { name: 'Cyber Red', primary: '#ff3e3e', glow: 'rgba(255, 62, 62, 0.4)', bg: '#080202' },
    amber: { name: 'Classic Amber', primary: '#ffc107', glow: 'rgba(255, 193, 7, 0.4)', bg: '#0a0802' },
    ghost: { name: 'Ghost White', primary: '#f8fafc', glow: 'rgba(248, 250, 252, 0.2)', bg: '#0f172a' }
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