import { useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';

import { AuthProvider } from '../context/AuthContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    'Roboto-Black': require('../../assets/fonts/Roboto/Roboto-Black.ttf'),
    'Roboto-Bold': require('../../assets/fonts/Roboto/Roboto-Bold.ttf'),
    'Roboto-Light': require('../../assets/fonts/Roboto/Roboto-Light.ttf'),
    'Roboto-Medium': require('../../assets/fonts/Roboto/Roboto-Medium.ttf'),
    'Roboto-Regular': require('../../assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Roboto-Thin': require('../../assets/fonts/Roboto/Roboto-Thin.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
};

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(app)" />
      <Stack.Screen name="(auth)" options={{ presentation: 'modal' }} />
      <Stack.Screen name="(old)" />
    </Stack>
  );
}
export default RootLayout;
