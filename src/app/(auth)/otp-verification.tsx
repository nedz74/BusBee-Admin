import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import OTPVerificationScreen from '../../components/OTPVerificationScreen';

export default function OTPVerificationPage() {
  const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();

  const handleVerify = (otp: string) => {
    console.log('OTP verified:', otp);
    // Navigate to dashboard after successful verification
    // You can add your OTP validation logic here
  };

  const handleEditPhone = () => {
    // Navigate back to login screen
    // You can add logic to go back to phone number input
  };

  const handleResendOTP = () => {
    console.log('Resending OTP...');
    // Add your resend OTP logic here
  };

  return (
    <OTPVerificationScreen
      phoneNumber={phoneNumber}
      onVerify={handleVerify}
      onEditPhone={handleEditPhone}
      onResendOTP={handleResendOTP}
    />
  );
}
