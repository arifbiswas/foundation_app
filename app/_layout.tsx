import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function RootLayout() {
  const router = useRouter();

//   useEffect(() => {
//     // Redirect to public routes initially
//     router.replace('/public');
//   }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
      initialRouteName='public'
    >
      <Stack.Screen name="public" />
      <Stack.Screen name="private" />
      
      {/* Error handling */}
      <Stack.Screen name="not-found" options={{ title: 'Page Not Found' }} />
    </Stack>

  );
}
