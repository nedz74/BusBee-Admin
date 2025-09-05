import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { router } from 'expo-router';

interface OTPVerificationScreenProps {
  phoneNumber?: string;
  onVerify?: (otp: string) => void;
  onEditPhone?: () => void;
  onResendOTP?: () => void;
}

export default function OTPVerificationScreen({
  phoneNumber = '9188593928',
  onVerify,
  onEditPhone,
  onResendOTP,
}: OTPVerificationScreenProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const inputRefs = useRef<TextInput[]>([]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    // Handle backspace - move to previous input
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    if (otpString.length === 6) {
      if (onVerify) {
        onVerify(otpString);
        router.replace('/dashboard');

      } else {
        // Default behavior - navigate to dashboard
        router.replace('/dashboard');
      }
    }
  };

  const handleResendOTP = () => {
    if (!isResendDisabled) {
      setTimeLeft(120);
      setIsResendDisabled(true);
      if (onResendOTP) {
        onResendOTP();
      }
    }
  };

  const handleEditPhone = () => {
    if (onEditPhone) {
      onEditPhone();
    } else {
      router.back();
    }
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={90}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            <Text style={styles.title}>Verify Your Mobile Number</Text>
            
            <Text style={styles.subtitle}>
              Enter the OTP sent to your mobile number {phoneNumber} to verify and proceed.{' '}
              <Text style={styles.editLink} onPress={handleEditPhone}>
                Edit
              </Text>
            </Text>

            {/* OTP Input Fields */}
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    if (ref) {
                      inputRefs.current[index] = ref;
                    }
                  }}
                  style={styles.otpInput}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  textAlign="center"
                  selectTextOnFocus
                  autoFocus={index === 0}
                />
              ))}
            </View>

            {/* Resend OTP */}
            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>
                Resend OTP in{' '}
                <Text style={styles.timerText}>
                  {isResendDisabled ? formatTime(timeLeft) : '00:00'}
                </Text>
              </Text>
              {!isResendDisabled && (
                <TouchableOpacity onPress={handleResendOTP}>
                  <Text style={styles.resendButton}>Resend OTP</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Continue Button */}
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={[styles.continueButton, !isOtpComplete && styles.continueButtonDisabled]}
              onPress={handleVerify}
              disabled={!isOtpComplete}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  scrollView: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  content: { flex: 1 },
  header: { paddingTop: 10, paddingBottom: 20 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' },
  backButtonText: { fontSize: 18, color: '#333', fontFamily: 'Arquitecta' },
  mainContent: { flex: 1, paddingTop: 20 },
  title: { fontSize: 28, fontFamily: 'ArquitectaBold', color: '#333', marginBottom: 16, lineHeight: 34 },
  subtitle: { fontSize: 16, fontFamily: 'Arquitecta', color: '#666', marginBottom: 40, lineHeight: 22 },
  editLink: { color: '#8B5CF6', fontFamily: 'ArquitectaMedium' },
  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, paddingHorizontal: 10 },
  otpInput: { width: 45, height: 50, borderBottomWidth: 2, borderBottomColor: '#e0e0e0', fontSize: 24, fontFamily: 'ArquitectaBold', color: '#333', textAlign: 'center' },
  resendContainer: { alignItems: 'flex-end', marginBottom: 40 },
  resendText: { fontSize: 14, fontFamily: 'Arquitecta', color: '#999' },
  timerText: { color: '#333', fontFamily: 'ArquitectaBold' },
  resendButton: { fontSize: 14, fontFamily: 'ArquitectaMedium', color: '#8B5CF6', marginTop: 5 },
  bottomContainer: { marginTop: 'auto', marginBottom: 20 },
  continueButton: { backgroundColor: '#D81030', paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  continueButtonDisabled: { backgroundColor: '#ccc' },
  continueButtonText: { color: '#ffffff', fontSize: 18, fontFamily: 'ArquitectaBold' },
});

