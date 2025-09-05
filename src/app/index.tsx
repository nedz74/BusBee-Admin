import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import LoginScreen from '../components/LoginScreen';

export default function HomeScreen() {
  const handleLogin = (phoneNumber: string) => {
    console.log('Login with phone number:', phoneNumber);
    // Navigate to main app after successful login
    router.replace('/dashboard');
  };

  const handleGuestLogin = () => {
    console.log('Guest login');
    // Navigate to main app
    router.replace('/dashboard');
  };

  return (
    <LoginScreen 
      onLogin={handleLogin} 
      onGuestLogin={handleGuestLogin}
      isBusOwner={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 10,
    minWidth: 200,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
