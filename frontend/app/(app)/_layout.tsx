import React from 'react';
import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen name="create" options={{ presentation: 'modal' }} />
      <Stack.Screen name="edit/[id]" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
