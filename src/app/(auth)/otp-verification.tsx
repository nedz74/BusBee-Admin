import React, { useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { Alert } from 'react-native';
import OTPVerificationScreen from '../../components/OTPVerificationScreen';
import apiService from '../../services/api';

export default function OTPVerificationPage() {
  const { phoneNumber, userType } = useLocalSearchParams<{ 
    phoneNumber: string; 
    userType: string;
  }>();
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // DRY: Common error message handler
  const getErrorMessage = (error: unknown): string => {
    return error instanceof Error ? error.message : "Network error. Please try again.";
  };

  // DRY: Common alert handler
  const showAlert = (title: string, message: string, onPress?: () => void) => {
    Alert.alert(title, message, [{ text: "OK", onPress }]);
  };

  const handleVerify = async (otp: string) => {
    if (!phoneNumber) return;
    
    setIsVerifying(true);
    
    try {
      const response = await apiService.verifyOTP(
        phoneNumber,
        otp,
        (userType as 'user' | 'bus_owner') || 'user'
      );

      if (response.success && response.data) {
        // Show success message for new users
        if (response.data.isNewUser) {
          showAlert(
            "Welcome to BusBee!",
            "Your account has been created successfully.",
            () => navigateToDashboard(response.data!.user)
          );
        } else {
          // Use the actual user data from the API response
          navigateToDashboard(response.data.user);
        }
      } else {
        showAlert(
          "Verification Failed",
          response.message || "Invalid OTP. Please try again."
        );
      }
    } catch (error) {
      showAlert("Verification Error", getErrorMessage(error));
    } finally {
      setIsVerifying(false);
    }
  };

  const navigateToDashboard = (userData?: any) => {
    // Use actual user data from API response if available, otherwise fall back to URL parameter
    const actualUserType = userData?.userType || userType;
    
    // Navigate to appropriate dashboard based on actual user type
    if (actualUserType === 'bus_owner') {
      // Check if bus owner needs onboarding (first time login)
      if (userData?.isNewUser || !userData?.hasCompletedOnboarding) {
        router.replace('/bus-owner-onboarding');
      } else {
        router.replace('/bus-owner-dashboard');
      }
    } else {
      router.replace('/user-dashboard');
    }
  };

  const handleEditPhone = () => {
    router.back();
  };

  const handleResendOTP = async () => {
    if (!phoneNumber) return;
    
    setIsResending(true);
    
    try {
      const response = await apiService.resendOTP(phoneNumber);
      
      if (response.success) {
        showAlert("OTP Resent", "A new OTP has been sent to your phone number.");
      } else {
        showAlert("Resend Failed", response.message || "Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      showAlert("Resend Error", getErrorMessage(error));
    } finally {
      setIsResending(false);
    }
  };

  return (
    <OTPVerificationScreen
      phoneNumber={phoneNumber}
      onVerify={handleVerify}
      onEditPhone={handleEditPhone}
      onResendOTP={handleResendOTP}
      isVerifying={isVerifying}
      isResending={isResending}
    />
  );
}
