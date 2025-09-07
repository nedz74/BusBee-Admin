import React from 'react';
import { Stack } from 'expo-router';

export default function SideNavScreensLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="help-support" />
      <Stack.Screen name="my-buses" />
      <Stack.Screen name="passengers" />
      <Stack.Screen name="payments" />
      <Stack.Screen name="reports" />
      <Stack.Screen name="schedule" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
