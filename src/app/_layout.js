import { Slot } from 'expo-router';

import { AuthProvider } from '../context/AuthContext';
import { ProgressProvider } from '../context/ProgressContext';

export default function Root() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <Slot />
      </ProgressProvider>
    </AuthProvider>
  );
}
