import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import SplashScreen from '../components/SplashScreen';
import ErrorBoundary from '../components/ErrorBoundary';

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const [fontsLoaded, fontError] = useFonts({
    'Arquitecta': require('../assets/fonts/Arquitecta/Arquitecta.otf'),
    'ArquitectaBold': require('../assets/fonts/Arquitecta/ArquitectaBold.otf'),
    'ArquitectaMedium': require('../assets/fonts/Arquitecta/ArquitectaMedium.otf'),
    'ArquitectaLight': require('../assets/fonts/Arquitecta/ArquitectaLight.otf'),
    'ArquitectaThin': require('../assets/fonts/Arquitecta/ArquitectaThin.otf'),
    'ArquitectaHeavy': require('../assets/fonts/Arquitecta/ArquitectaHeavy.otf'),
    'ArquitectaBook': require('../assets/fonts/Arquitecta/ArquitectaBook.otf'),
    'ArquitectaBlack': require('../assets/fonts/Arquitecta/ArquitectaBlack.otf'),
  });

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  // Show splash screen while fonts are loading or if there's an error
  if (showSplash || (!fontsLoaded && !fontError)) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  // If fonts failed to load, continue anyway with system fonts
  if (fontError) {
    console.warn('Font loading error:', fontError);
  }

  return (
    <ErrorBoundary>
      <Stack>
        <Stack.Screen 
          name="(auth)" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="my-buses" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="schedule" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="passengers" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="payments" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="reports" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="settings" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="help-support" 
          options={{ 
            headerShown: false,
          }} 
        />
      </Stack>
      <StatusBar style="light" />
    </ErrorBoundary>
  );
}
