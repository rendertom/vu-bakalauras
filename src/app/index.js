import { useContext } from 'react';
import { Text, View } from 'react-native';
import { Link, Redirect } from 'expo-router';

import { AuthContext } from '../context/AuthContext';

const Index = () => {
  const { session, isSessionLoading, isTeacher } = useContext(AuthContext);

  if (isSessionLoading) {
    return;
  }

  if (!session) {
    return <Redirect href="../(auth)/signIn" />;
  }

  if (isTeacher) {
    return <Redirect href="/(teacher)/students" />;
  }

  return <Redirect href={'/(app)/home'} />;
};

export default Index;
