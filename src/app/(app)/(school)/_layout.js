import { useContext } from 'react';
import { Redirect, Stack } from 'expo-router';

import { AuthContext } from '../../../context/AuthContext';
import { ProgressProvider } from '../../../context/ProgressContext';
import { TasksProvider } from '../../../context/TasksContext';

const SchoolLayout = () => {
  const { session } = useContext(AuthContext);

  if (!session) {
    return <Redirect href={'/'} />;
  }

  return (
    <ProgressProvider>
      <TasksProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="answersFinal" />
          <Stack.Screen name="course" />
          <Stack.Screen name="followers" />
          <Stack.Screen name="task" />
          <Stack.Screen name="topic" />
        </Stack>
      </TasksProvider>
    </ProgressProvider>
  );
};

export default SchoolLayout;
