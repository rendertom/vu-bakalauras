import { Redirect, Stack } from 'expo-router';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const AuthLayout = () => {
  const { session } = useContext(AuthContext);

  if (session) {
    return <Redirect href={'/'} />;
  }

  return (
    <Stack>
      <Stack.Screen name="signIn" options={{ headerShown: true }} />
      <Stack.Screen name="signUp" options={{ headerShown: true }} />
    </Stack>
  );
};

export default AuthLayout;
