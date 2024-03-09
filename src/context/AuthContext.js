import React, { createContext, useEffect, useState } from 'react';

import firebaseClient from '../api/firebaseClient';
import { AUTH } from '../api/FirebaseConfig';

export const AuthContext = createContext({
  authUser: undefined,
  isAuthLoaded: false,
});

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = firebaseClient.onAuthStateChanged((authUser) => {
      setAuthUser(authUser);
      setIsAuthLoaded(true);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, isAuthLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};
