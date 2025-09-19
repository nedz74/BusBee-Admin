import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Keyboard,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

interface OTPVerificationScreenProps {
  phoneNumber?: string;
  onVerify?: (otp: string) => void;
  onEditPhone?: () => void;
  onResendOTP?: () => void;
  isVerifying?: boolean;
  isResending?: boolean;
}

export default function OTPVerificationScreen({
  phoneNumber = '9188593928',
  onVerify,
  onEditPhone,
  onResendOTP,
  isVerifying = false,
  isResending = false,
}: OTPVerificationScreenProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const inputRefs = useRef<TextInput[]>([]);
  const [isFirstRender, setIsFirstRender] = useState(true);

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

  // Keyboard event listeners
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        setIsKeyboardVisible(true);
        setIsFirstRender(false);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
        setIsKeyboardVisible(false);
        setIsFirstRender(false);
      }
    );

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

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
    if (otpString.length === 6 && !isVerifying && onVerify) {
      onVerify(otpString);
    }
  };

  const handleResendOTP = () => {
    if (!isResendDisabled && !isResending) {
      setTimeLeft(120);
      setIsResendDisabled(true);
      if (onResendOTP) {
        onResendOTP();
      }
    }
  };

  const handleEditPhone = () => {
    onEditPhone?.();
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          isKeyboardVisible && { paddingBottom: keyboardHeight }
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
      >
        <View style={styles.content}>
          {/* Header */}
          {/* <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
          </View> */}

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
                <TouchableOpacity onPress={handleResendOTP} disabled={isResending}>
                  {isResending ? (
                    <ActivityIndicator size="small" color="#8B5CF6" />
                  ) : (
                    <Text style={styles.resendButton}>Resend OTP</Text>
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Continue Button */}
          <View >
            <TouchableOpacity
              style={[
                styles.continueButton, 
                (!isOtpComplete || isVerifying) && styles.continueButtonDisabled, 
                { marginBottom: isFirstRender ? 304 : (isKeyboardVisible ? 10 : 10) }
              ]}
              onPress={handleVerify}
              disabled={!isOtpComplete || isVerifying}
            >
              {isVerifying ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <Text style={styles.continueButtonText}>Continue</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  redBorder: { borderWidth: 1, borderColor: '#D81030' },
  scrollView: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  content: { flex: 1 },
  header: { paddingTop: 10, paddingBottom: 20 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' },
  backButtonText: { fontSize: 18, color: '#333', fontFamily: 'Arquitecta' },
  mainContent: { flex: 1, paddingTop: 35 },
  title: { fontSize: 28, fontFamily: 'ArquitectaBold', color: '#333', marginBottom: 16, lineHeight: 34 },
  subtitle: { fontSize: 16, fontFamily: 'Arquitecta', color: '#666', marginBottom: 40, lineHeight: 22 },
  editLink: { color: '#8B5CF6', fontFamily: 'ArquitectaMedium' },
  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, paddingHorizontal: 10 },
  otpInput: { width: 45, height: 50, borderBottomWidth: 2, borderBottomColor: '#e0e0e0', fontSize: 24, fontFamily: 'ArquitectaBold', color: '#333', textAlign: 'center' },
  resendContainer: { alignItems: 'flex-end', marginBottom: 40 },
  resendText: { fontSize: 14, fontFamily: 'Arquitecta', color: '#999' },
  timerText: { color: '#333', fontFamily: 'ArquitectaBold' },
  resendButton: { fontSize: 14, fontFamily: 'ArquitectaMedium', color: '#8B5CF6', marginTop: 5 },
  continueButton: { backgroundColor: '#D81030', paddingVertical: 10, borderRadius: 8, alignItems: 'center'},
  continueButtonDisabled: { backgroundColor: '#ccc' },
  continueButtonText: { color: '#ffffff', fontSize: 18, fontFamily: 'ArquitectaBold' },
});

