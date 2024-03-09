import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDYpwCa-Y6InylqqFRT9AXDzRxgEfqrx48',
  authDomain: 'vu-test-10984.firebaseapp.com',
  projectId: 'vu-test-10984',
  storageBucket: 'vu-test-10984.appspot.com',
  messagingSenderId: '222819710126',
  appId: '1:222819710126:web:c3a6e3327de51f1e34a93f',
};

export const app = initializeApp(firebaseConfig);

export const DB = getFirestore(app);
export const AUTH = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
