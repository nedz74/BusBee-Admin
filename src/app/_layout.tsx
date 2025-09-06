import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import SplashScreen from '../components/SplashScreen';

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const [fontsLoaded] = useFonts({
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

  if (showSplash || !fontsLoaded) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <>
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
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
