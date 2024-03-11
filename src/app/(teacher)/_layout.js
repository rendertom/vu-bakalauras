import { useContext } from 'react';
import { Redirect, Stack } from 'expo-router';

import { AuthContext } from '../../context/AuthContext';

const TeacherLayout = () => {
  const { session, isTeacher } = useContext(AuthContext);

  if (!session || !isTeacher) {
    return <Redirect href={'/'} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="exams" />
      <Stack.Screen name="results" />
    </Stack>
  );
};

export default TeacherLayout;
