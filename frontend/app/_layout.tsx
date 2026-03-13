import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import 'react-native-reanimated';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';

export default function RootLayout() {
  // Inject global CSS on web platform to normalise input styles
  useEffect(() => {
    if (Platform.OS === 'web') {
      const style = document.createElement('style');
      style.textContent = `
        input, textarea {
          box-sizing: border-box !important;
          outline: none !important;
        }
        input:focus, textarea:focus {
          outline: none !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
