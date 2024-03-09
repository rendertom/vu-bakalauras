import { useContext, useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';

import { ProgressProvider } from '../context/ProgressContext';
import { TasksProvider } from '../context/TasksContext';
import { UserContext, UserProvider } from '../context/UserContext';

import firebaseClient from '../api/firebaseClient';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = firebaseClient.onAuthStateChanged((user) => {
      if (user) {
        console.log('connected');

        console.log('NICEEEE', user.uid);

        firebaseClient.getUser(user.uid).then((docSnapshot) => {
          if (docSnapshot) {
            console.log('got from db', docSnapshot.data());
            // return docSnapshot.data();
          }
        });
      } else {
        console.log('no user');
      }
    });
    return unsubscribe;
  }, []);

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
