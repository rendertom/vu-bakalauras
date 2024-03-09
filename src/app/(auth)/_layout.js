import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="signIn" options={{ headerShown: true }} />
      <Stack.Screen name="signUp" options={{ headerShown: true }} />
    </Stack>
  );
};

export default AuthLayout;
