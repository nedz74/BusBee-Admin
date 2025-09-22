import React, { useState } from 'react';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import BusOwnerOnboardingScreen, { BusOwnerDetails } from '../components/BusOwnerOnboardingScreen';
import apiService from '../services/api';

export default function BusOwnerOnboarding() {
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async (data: BusOwnerDetails) => {
    setIsLoading(true);
    
    try {
      // Save bus owner details to backend
      const response = await apiService.saveBusOwnerDetails(data);
      
      if (response.success) {
        // Navigate to dashboard
        router.replace('/bus-owner-dashboard');
      } else {
        Alert.alert('Error', response.message || 'Failed to save details. Please try again.');
      }
    } catch (error) {
      console.error('Error saving bus owner details:', error);
      Alert.alert('Error', 'Failed to save details. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    // Navigate to dashboard without saving details
    router.replace('/bus-owner-dashboard');
  };

  return (
    <BusOwnerOnboardingScreen
      onComplete={handleComplete}
      onSkip={handleSkip}
      isLoading={isLoading}
    />
  );
}
