import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import SplashScreen from '../src/components/SplashScreen';

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'BB Admin',
            headerStyle: {
              backgroundColor: '#007AFF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          }} 
        />
        <Stack.Screen 
          name="profile" 
          options={{ 
            title: 'Profile',
            headerStyle: {
              backgroundColor: '#007AFF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          }} 
        />
        <Stack.Screen 
          name="settings" 
          options={{ 
            title: 'Settings',
            headerStyle: {
              backgroundColor: '#007AFF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          }} 
        />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
