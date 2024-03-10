import { useContext } from 'react';
import { Redirect, Stack } from 'expo-router';

import { AuthContext } from '../../context/AuthContext';

const TeacherLayout = () => {
  const { session, isTeacher } = useContext(AuthContext);

  if (!session || !isTeacher) {
    return <Redirect href={'/'} />;
  }

  return (
    <Stack>
      <Stack.Screen name="students" options={{ headerShown: false }} />
      <Stack.Screen name="exams" options={{ headerShown: false }} />
      <Stack.Screen name="results" options={{ headerShown: false }} />
    </Stack>
  );
};

export default TeacherLayout;
