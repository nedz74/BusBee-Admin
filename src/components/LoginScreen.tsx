import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router";

type LoginMode = "user" | "bus-owner";

export default function LoginScreen({ mode = "user" }: { mode?: LoginMode }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");

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

  const handleContinue = () => {
    const error = validatePhoneNumber(phoneNumber);

    if (error) {
      setPhoneError(error);
      return;
    }

    // TODO: add your login validation / API call here
    // Navigate to OTP verification page with phone number
    router.push({
      pathname: "/otp-verification",
      params: { phoneNumber: phoneNumber },
    });
  };

  const handleBusOwnerLogin = () => {
    router.push("/bus-owner-login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={0}
        showsVerticalScrollIndicator={false}
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
              keyboardType="phone-pad"
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
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  scrollView: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  topContent: { marginTop: 30 },
  bottomContent: { marginTop: "auto" },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: "space-between",
    minHeight: "100%",
  },
  title: {
    fontSize: 32,
    fontFamily: "ArquitectaBold",
    color: "#333",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Arquitecta",
    color: "#666",
    marginBottom: 50,
    lineHeight: 22,
  },
  phoneInputContainer: { marginBottom: 40 },
  phoneInput: {
    fontSize: 16,
    fontFamily: "Arquitecta",
    color: "#333",
    paddingVertical: 12,
  },
  phoneInputError: { color: "#FF3B30" },
  inputUnderline: { height: 1, backgroundColor: "#e0e0e0" },
  inputUnderlineError: { backgroundColor: "#FF3B30" },
  errorText: {
    fontSize: 14,
    fontFamily: "Arquitecta",
    color: "#FF3B30",
    marginTop: 8,
    marginLeft: 4,
  },
  guestButton: { alignItems: "center", marginBottom: 30 },
  guestText: {
    fontSize: 16,
    fontFamily: "Arquitecta",
    color: "#333",
    textDecorationLine: "underline",
  },
  termsContainer: { alignItems: "center", marginBottom: 10 },
  termsText: {
    fontSize: 14,
    fontFamily: "Arquitecta",
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  termsLink: {
    color: "#8B5CF6",
    textDecorationLine: "underline",
    fontFamily: "ArquitectaMedium",
  },
  continueButton: {
    backgroundColor: "#D81030",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  continueButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontFamily: "ArquitectaBold",
  },
});
