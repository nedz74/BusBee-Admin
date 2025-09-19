import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from '../components/SplashScreen';
import ErrorBoundary from '../components/ErrorBoundary';
import apiService from '../services/api';

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const [authCheckDone, setAuthCheckDone] = useState(false);
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

  // Check authentication status once after splash and fonts are ready
  useEffect(() => {
    const checkAuth = async () => {
      // Only run once, after splash is done and fonts are loaded
      if (showSplash || (!fontsLoaded && !fontError) || authCheckDone) {
        return;
      }

      try {
        const isLoggedIn = await apiService.isLoggedIn();
        const userData = await apiService.getStoredUserData();
        
        if (isLoggedIn && userData) {
          // Navigate to appropriate dashboard
          if (userData.userType === 'bus_owner') {
            router.replace('/bus-owner-dashboard');
          } else {
            router.replace('/user-dashboard');
          }
        }
        // If no valid session, let natural flow handle it (go to auth)
      } catch (error) {
        // On error, let natural flow handle it
      } finally {
        setAuthCheckDone(true);
      }
    };

    checkAuth();
  }, [showSplash, fontsLoaded, fontError, authCheckDone]);

  // Show splash screen while fonts are loading or if there's an error
  if (showSplash || (!fontsLoaded && !fontError)) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  // If fonts failed to load, continue anyway with system fonts
  if (fontError) {
    console.warn('Font loading error:', fontError);
  }

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <Stack>
          <Stack.Screen 
            name="(auth)" 
            options={{ 
              headerShown: false,
            }} 
          />
          <Stack.Screen 
            name="bus-owner-dashboard" 
            options={{ 
              headerShown: false,
            }} 
          />
          <Stack.Screen 
            name="user-dashboard" 
            options={{ 
              headerShown: false,
            }} 
          />
          <Stack.Screen 
            name="sideNavScreens" 
            options={{ 
              headerShown: false,
            }} 
          />
        </Stack>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
