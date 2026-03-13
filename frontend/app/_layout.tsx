import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import { LoadingSpinner } from '../components/LoadingSpinner';

function RootLayoutNav() {
  const { isLoading, token } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {token ? (
        <Stack.Screen
          name="(app)"
          options={{ gestureEnabled: false }}
        />
      ) : (
        <Stack.Screen
          name="(auth)"
          options={{ gestureEnabled: false }}
        />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RootLayoutNav />
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
