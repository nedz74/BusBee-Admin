import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import * as Font from 'expo-font';
import { router } from 'expo-router';

interface LoginScreenProps {
  onLogin: (phoneNumber: string) => void;
  onGuestLogin: () => void;
  isBusOwner?: boolean;
}

export default function LoginScreen({ onLogin, onGuestLogin, isBusOwner = false }: LoginScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Arquitecta': require('../assets/fonts/Arquitecta/Arquitecta.otf'),
      'ArquitectaBold': require('../assets/fonts/Arquitecta/ArquitectaBold.otf'),
      'ArquitectaMedium': require('../assets/fonts/Arquitecta/ArquitectaMedium.otf'),
    });
    setFontsLoaded(true);
  };

  const handleContinue = () => {
    if (phoneNumber.trim()) {
      onLogin(phoneNumber);
    }
  };

  const handleGuestLogin = () => {
    onGuestLogin();
  };

  const handleBusOwnerLogin = () => {
    router.push('/bus-owner-login');
  };

  if (!fontsLoaded) {
    return null; // or a loading screen
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.topContent}>
          <Text style={styles.title}>Login or Sign up</Text>
          <Text style={styles.subtitle}>Enter your mobile number to continue</Text>
          
          {/* Phone Number Input */}
          <View style={styles.phoneInputContainer}>
            <TextInput
              style={styles.phoneInput}
              placeholder="Your Mobile Number"
              placeholderTextColor="#999"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              maxLength={10}
            />
            <View style={styles.inputUnderline} />
          </View>
        </View>

        <View style={styles.bottomContent}>
          {/* Login as Bus Owner - only show if not already in bus owner mode */}
          {!isBusOwner && (
            <TouchableOpacity style={styles.guestButton} onPress={handleBusOwnerLogin}>
              <Text style={styles.guestText}>Login as Bus Owner</Text>
            </TouchableOpacity>
          )}

          {/* Terms & Conditions */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By continuing, you agree to our{' '}
              <Text style={styles.termsLink}>Terms & Conditions</Text>
            </Text>
          </View>

          {/* Continue Button */}
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: 'space-between',
  },
  topContent: {
    flex: 1,
    marginTop: 30,
  },
  bottomContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'ArquitectaBold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Arquitecta',
    color: '#666',
    marginBottom: 50,
    textAlign: 'left',
    lineHeight: 22,
  },
  phoneInputContainer: {
    marginBottom: 40,
  },
  phoneInput: {
    fontSize: 16,
    fontFamily: 'Arquitecta',
    color: '#333',
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderBottomWidth: 0,
  },
  inputUnderline: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginTop: 0,
  },
  guestButton: {
    alignItems: 'center',
    marginBottom: 30,
  },
  guestText: {
    fontSize: 16,
    fontFamily: 'Arquitecta',
    color: '#333',
    textDecorationLine: 'underline',
  },
  termsContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  termsText: {
    fontSize: 14,
    fontFamily: 'Arquitecta',
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  termsLink: {
    color: '#8B5CF6',
    textDecorationLine: 'underline',
    fontFamily: 'ArquitectaMedium',
  },
  continueButton: {
    backgroundColor: '#D81030',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 60,
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'ArquitectaBold',
  },
});
