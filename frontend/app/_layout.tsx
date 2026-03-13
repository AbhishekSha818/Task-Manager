import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
