import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import SplashScreen from '../components/SplashScreen';

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
            title: 'Login',
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="bus-owner-login" 
          options={{ 
            title: 'Bus Owner Login',
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
          name="dashboard" 
          options={{ 
            title: 'BB Admin Dashboard',
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
