import { useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';

import { ProgressProvider } from '../context/ProgressContext';
import { TasksProvider } from '../context/TasksContext';
import { UserProvider } from '../context/UserContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts({
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
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // console.log('OUT');

  return (
    <UserProvider>
      <ProgressProvider>
        <TasksProvider>
          <Stack>
            {/* <Stack.Screen name='(tabs)' options={{
        headerShown: false,
      }}/>  */}
            {/* <Stack.Screen name='index' options={{
        headerTitle: 'Home page'
      }}/>
      <Stack.Screen name='users/[id]' options={{
        headerTitle: 'User page'
      }}/> */}
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="course" options={{ headerShown: false }} />
            <Stack.Screen name="topic" options={{ headerShown: false }} />
            <Stack.Screen name="task" options={{ headerShown: false }} />
            <Stack.Screen
              name="answersFinal"
              options={{ headerShown: false }}
            />

            <Stack.Screen name="signIn" options={{ headerShown: true }} />
            <Stack.Screen name="signUp" options={{ headerShown: true }} />
          </Stack>
        </TasksProvider>
      </ProgressProvider>
    </UserProvider>
  );
};

export default RootLayout;
