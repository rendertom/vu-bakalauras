import { useContext } from 'react';
import { Redirect, Stack } from 'expo-router';

import { AuthContext } from '../../../context/AuthContext';
import { TasksProvider } from '../../../context/TasksContext';

const SchoolLayout = () => {
  const { session } = useContext(AuthContext);

  if (!session) {
    return <Redirect href={'/'} />;
  }

  return (
    <TasksProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="answersFinal" />
        <Stack.Screen name="course" />
        <Stack.Screen name="followers" />
        <Stack.Screen name="task" />
        <Stack.Screen name="topic" />
      </Stack>
    </TasksProvider>
  );
};

export default SchoolLayout;
