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
    
    // Add current theme class
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.setProperty('--bg-color', '#0f0f12');
    } else if (theme === 'light') {
      root.classList.remove('dark');
      root.style.setProperty('--bg-color', '#ffffff');
    } else if (theme === 'gaming') {
      root.classList.add('dark', 'gaming');
      root.style.setProperty('--bg-color', '#0a0a12');
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
