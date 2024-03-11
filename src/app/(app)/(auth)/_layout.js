import { useContext } from 'react';
import { Redirect, Stack } from 'expo-router';

import { AuthContext } from '../../../context/AuthContext';

const AuthLayout = () => {
  const { session } = useContext(AuthContext);

  if (session) {
    return <Redirect href={'/'} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signIn" />
      <Stack.Screen name="signUp" />
    </Stack>
  );
};

export default AuthLayout;
