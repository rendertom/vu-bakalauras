import { useContext } from 'react';
import { Redirect, Stack } from 'expo-router';

import { AuthContext } from '../../context/AuthContext';
import { ProgressProvider } from '../../context/ProgressContext';
import { TasksProvider } from '../../context/TasksContext';

const AppLayout = () => {
  const { session } = useContext(AuthContext);

  if (!session) {
    return <Redirect href={'/'} />;
  }

  return (
    <ProgressProvider>
      <TasksProvider>
        <Stack>
          <Stack.Screen name="home" options={{ headerShown: false }} />
          <Stack.Screen name="course" options={{ headerShown: false }} />
          <Stack.Screen name="topic" options={{ headerShown: false }} />
          <Stack.Screen name="task" options={{ headerShown: false }} />
          <Stack.Screen name="answersFinal" options={{ headerShown: false }} />
        </Stack>
      </TasksProvider>
    </ProgressProvider>
  );
};

export default AppLayout;
