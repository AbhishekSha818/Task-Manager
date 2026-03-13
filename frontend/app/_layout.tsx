import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import 'react-native-reanimated';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';

export default function RootLayout() {
  // Inject global CSS on web platform to fix TextInput styling issues
  useEffect(() => {
    if (Platform.OS === 'web') {
      const style = document.createElement('style');
      style.textContent = `
        /* Fix for TextInput component styling on web */
        input[type="text"],
        input[type="password"],
        input[type="email"],
        input[type="number"],
        input[type="tel"],
        input[type="url"],
        textarea {
          box-sizing: border-box !important;
          -webkit-box-sizing: border-box !important;
          font-family: inherit !important;
        }

        /* Prevent browser auto-fill from overriding our styles */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
          transition: background-color 5000s ease-in-out 0s !important;
        }

        /* Remove focus outline - border styling handles focus state */
        input:focus,
        textarea:focus {
          outline: none !important;
        }

        /* Consistent sizing for all inputs */
        input,
        textarea {
          font-size: inherit;
          line-height: inherit;
        }

        /* Ensure multiline inputs have proper height */
        textarea {
          resize: vertical;
          font-family: monospace;
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
