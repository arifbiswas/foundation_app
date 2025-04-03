import { Stack } from "expo-router";

import React, { useEffect } from "react";


export default function RootLayout() {

  return (
    <Stack screenOptions={{ headerShown: false }}>
    
      
      {/* Private routes */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="admin" options={{ headerShown: false }} />
      
      
    </Stack>
  );
}
