import { Stack } from 'expo-router';

import { LocalizationProvider } from '../../context/LocalizationContext';
import { TasksProvider } from '../../context/TasksContext';
import { TimeProvider } from '../../context/TimeContext';

const OldLayout = () => {
  return (
    <LocalizationProvider>
      <TimeProvider>
        <TasksProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="setupScreen" />
            <Stack.Screen name="taskScreen" />
            <Stack.Screen name="answersInterScreen" />
            <Stack.Screen name="summaryScreen" />
            <Stack.Screen
              name="historyScreen"
              options={{ presentation: 'modal' }}
            />
            <Stack.Screen
              name="settingsScreen"
              options={{ presentation: 'modal' }}
            />
            <Stack.Screen
              name="answersFinalScreen"
              options={{ presentation: 'modal' }}
            />
          </Stack>
        </TasksProvider>
      </TimeProvider>
    </LocalizationProvider>
  );
};

export default OldLayout;
