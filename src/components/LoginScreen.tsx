import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Keyboard,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import apiService from "../services/api";

type LoginMode = "user" | "bus-owner";

export default function LoginScreen({ mode = "user" }: { mode?: LoginMode }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        setIsKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
        setIsKeyboardVisible(false);
      }
    );


    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  const validatePhoneNumber = (phone: string) => {
    // Remove any non-numeric characters
    const cleanPhone = phone.replace(/\D/g, "");

    if (cleanPhone.length === 0) {
      return "Phone number is required";
    }

    if (cleanPhone.length < 10) {
      return "Phone number must be at least 10 digits";
    }

    if (cleanPhone.length > 10) {
      return "Phone number must be exactly 10 digits";
    }

    // Check if it starts with valid digits (6-9 for Indian mobile numbers)
    if (!/^[6-9]/.test(cleanPhone)) {
      return "Please enter a valid mobile number";
    }

    return "";
  };

  const handlePhoneChange = (text: string) => {
    // Only allow numeric input and limit to 10 digits
    const numericText = text.replace(/\D/g, "").slice(0, 10);
    setPhoneNumber(numericText);

    // Clear error when user starts typing
    if (phoneError) {
      setPhoneError("");
    }
  };

  const handleContinue = async () => {
    const error = validatePhoneNumber(phoneNumber);

    if (error) {
      setPhoneError(error);
      return;
    }

    setIsLoading(true);
    
    try {
      // Send OTP via API
      const userType = mode === "bus-owner" ? "bus_owner" : "user";
      const response = await apiService.sendOTP(phoneNumber, userType);

      if (response.success) {
        // Navigate to OTP verification page with phone number
        router.push({
          pathname: "/otp-verification",
          params: { 
            phoneNumber: phoneNumber,
            userType: userType
          },
        });
      } else {
        setPhoneError(response.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Network error. Please check your connection.";
      
      Alert.alert(
        "Connection Error",
        errorMessage,
        [
          {
            text: "OK",
            onPress: () => setPhoneError("Please check your internet connection and try again.")
          }
        ]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBusOwnerLogin = () => {
    router.push("/bus-owner-login");
  };

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
        {/* Top Content */}
        <View style={styles.topContent}>
          <Text style={styles.title}>
            {mode === "bus-owner" ? "Bus Owner Login" : "Login or Sign up"}
          </Text>
          <Text style={styles.subtitle}>
            {mode === "bus-owner"
              ? "Enter your phone number to continue as a Bus Owner"
              : "Enter your mobile number to continue"}
          </Text>

          {/* Phone Number Input */}
          <View style={styles.phoneInputContainer}>
            <TextInput
              style={[styles.phoneInput, phoneError && styles.phoneInputError]}
              placeholder="Your Mobile Number"
              placeholderTextColor="#999"
              value={phoneNumber}
              onChangeText={handlePhoneChange}
              keyboardType="numeric"
              maxLength={10}
            />
            <View
              style={[
                styles.inputUnderline,
                phoneError && styles.inputUnderlineError,
              ]}
            />
            {phoneError && <Text style={styles.errorText}>{phoneError}</Text>}
          </View>
        </View>

        {/* Bottom Content */}
        <View style={styles.bottomContent}>
          {mode === "user" && (
            <TouchableOpacity
              style={styles.guestButton}
              onPress={handleBusOwnerLogin}
            >
              <Text style={styles.guestText}>Login as Bus Owner</Text>
            </TouchableOpacity>
          )}

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By continuing, you agree to our{" "}
              <Text style={styles.termsLink}>Terms & Conditions</Text>
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.continueButton, isLoading && styles.continueButtonDisabled]}
            onPress={handleContinue}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text style={styles.continueButtonText}>Continue</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  redBorder: { borderWidth: 1, borderColor: "#D81030" },
  container: { flex: 1, backgroundColor: "#ffffff" },
  scrollView: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: "space-between", paddingHorizontal: 20 },
  topContent: { marginTop: 30 },
  bottomContent: { marginTop: "auto" },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 40, justifyContent: "space-between", minHeight: "100%" },
  title: { fontSize: 32, fontFamily: "ArquitectaBold", color: "#333", marginBottom: 12 },
  subtitle: { fontSize: 16, fontFamily: "Arquitecta", color: "#666", marginBottom: 50, lineHeight: 22 },
  phoneInputContainer: { marginBottom: 40 },
  phoneInput: { fontSize: 16, fontFamily: "Arquitecta", color: "#333", paddingVertical: 12 },
  phoneInputError: { color: "#FF3B30" },
  inputUnderline: { height: 1, backgroundColor: "#e0e0e0" },
  inputUnderlineError: { backgroundColor: "#FF3B30" },
  errorText: { fontSize: 14, fontFamily: "Arquitecta", color: "#FF3B30", marginTop: 8, marginLeft: 4 },
  guestButton: { alignItems: "center", marginBottom: 30 },
  guestText: { fontSize: 16, fontFamily: "Arquitecta", color: "#333", textDecorationLine: "underline" },
  termsContainer: { alignItems: "center", marginBottom: 10 },
  termsText: { fontSize: 14, fontFamily: "Arquitecta", color: "#666", textAlign: "center", lineHeight: 20 },
  termsLink: { color: "#8B5CF6", textDecorationLine: "underline", fontFamily: "ArquitectaMedium" },
  continueButton: { backgroundColor: "#D81030", paddingVertical: 10, borderRadius: 8, alignItems: "center", marginBottom: 10 },
  continueButtonDisabled: { backgroundColor: "#ccc" },
  continueButtonText: { color: "#ffffff", fontSize: 18, fontFamily: "ArquitectaBold" },
});

