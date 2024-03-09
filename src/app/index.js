import { useContext } from 'react';
import { Text, View } from 'react-native';
import { Link, Redirect } from 'expo-router';

import { AuthContext } from '../context/AuthContext';

const Index = () => {
  const { session, isSessionLoading, user } = useContext(AuthContext);

  if (isSessionLoading) {
    return;
  }

  if (!session) {
    return <Redirect href="../(auth)/signIn" />;
  }

  console.log(user);

  // TODO
  // if (user.isAdmin) {
  //   return <Redirect href="../(admin)/" />;
  // }

  return (
    <View style={{ paddingTop: 100 }}>
      <Text>HELLLLLLLLOOOOOO</Text>
      <Link href="/(app)/home" asChild>
        <Text>GOGOGO</Text>
      </Link>
    </View>
  );
};

export default Index;
