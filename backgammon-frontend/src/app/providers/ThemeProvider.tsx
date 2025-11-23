import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light' | 'gaming';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('dark', 'light', 'gaming');
    
    // Theme CSS variables
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.setProperty('--bg-primary', '#0f1117');
      root.style.setProperty('--bg-secondary', '#1a1d29');
      root.style.setProperty('--surface', '#1e2330');
      root.style.setProperty('--surface-elevated', '#252b3d');
      root.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.08)');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#a1a1aa');
      root.style.setProperty('--text-tertiary', '#71717a');
    } else if (theme === 'light') {
      root.classList.remove('dark');
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--bg-secondary', '#f8f9fa');
      root.style.setProperty('--surface', '#ffffff');
      root.style.setProperty('--surface-elevated', '#f8f9fa');
      root.style.setProperty('--border-color', '#e5e7eb');
      root.style.setProperty('--text-primary', '#18181b');
      root.style.setProperty('--text-secondary', '#52525b');
      root.style.setProperty('--text-tertiary', '#a1a1aa');
    } else if (theme === 'gaming') {
      root.classList.add('dark', 'gaming');
      root.style.setProperty('--bg-primary', '#0a0a12');
      root.style.setProperty('--bg-secondary', '#1a0f2e');
      root.style.setProperty('--surface', '#1e1338');
      root.style.setProperty('--surface-elevated', '#2a1a4a');
      root.style.setProperty('--border-color', 'rgba(168, 85, 247, 0.2)');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#c4b5fd');
      root.style.setProperty('--text-tertiary', '#a78bfa');
    }
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
