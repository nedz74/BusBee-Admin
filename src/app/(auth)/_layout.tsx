import React from "react";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Login", headerShown: false }}/>
      <Stack.Screen name="bus-owner-login" options={{ title: "Bus Owner Login", headerShown: false }}/>
      <Stack.Screen name="otp-verification" options={{ title: "Verify OTP", headerShown: false }}/>
    </Stack>
  );
}
