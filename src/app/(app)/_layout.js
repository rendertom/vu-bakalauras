import { useContext, useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';

import { AuthContext } from '../../context/AuthContext';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const { isSessionLoading } = useContext(AuthContext);
  const [fontsLoaded, error] = useFonts({
    'Roboto-Black': require('../../../assets/fonts/Roboto/Roboto-Black.ttf'),
    'Roboto-Bold': require('../../../assets/fonts/Roboto/Roboto-Bold.ttf'),
    'Roboto-Light': require('../../../assets/fonts/Roboto/Roboto-Light.ttf'),
    'Roboto-Medium': require('../../../assets/fonts/Roboto/Roboto-Medium.ttf'),
    'Roboto-Regular': require('../../../assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Roboto-Thin': require('../../../assets/fonts/Roboto/Roboto-Thin.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (fontsLoaded && !isSessionLoading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isSessionLoading]);

  if (!fontsLoaded) {
    return null;
  }

  return <RootLayoutNav />;
};

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(aritmetika)" />
      <Stack.Screen name="(auth)" options={{ presentation: 'modal' }} />
      <Stack.Screen name="(school)" />
    </Stack>
  );
}
export default RootLayout;
