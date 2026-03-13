import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../constants/config';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => Promise<void>;
  colors: typeof COLORS.light | typeof COLORS.dark;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const THEME_KEY = 'appTheme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  // Load stored theme
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const saved = await AsyncStorage.getItem(THEME_KEY);
        if (saved) setIsDark(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    await AsyncStorage.setItem(THEME_KEY, JSON.stringify(newTheme));
  };

  const colors = isDark ? COLORS.dark : COLORS.light;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
