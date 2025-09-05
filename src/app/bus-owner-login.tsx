import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import LoginScreen from '../components/LoginScreen';

export default function BusOwnerLoginScreen() {
  const handleLogin = (phoneNumber: string) => {
    console.log('Bus Owner Login with phone number:', phoneNumber);
    // Navigate to dashboard after successful login
    router.replace('/dashboard');
  };

  const handleGuestLogin = () => {
    console.log('Bus Owner Guest login');
    // Navigate to dashboard
    router.replace('/dashboard');
  };

  return (
    <LoginScreen 
      onLogin={handleLogin} 
      onGuestLogin={handleGuestLogin}
      isBusOwner={true}
    />
  );
}
