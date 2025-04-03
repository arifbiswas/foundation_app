import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Load fonts
  const [fontsLoaded, fontError] = useFonts({
    // You can uncomment and use this if you have fonts
    // 'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Handle font loading errors
  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  // Hide splash screen when fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Return null while fonts are loading
  if (!fontsLoaded) {
    return null;
  }

  // Return the main Stack navigator
  return (
    <Stack screenOptions={{ headerShown: false }}>
    
      
      {/* Private routes */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="admin" options={{ headerShown: false }} />
      
      
    </Stack>
  );
}
