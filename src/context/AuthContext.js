import React, { createContext, useEffect, useState } from 'react';

import firebaseClient from '../api/firebaseClient';

export const AuthContext = createContext({
  session: null,
  isSessionLoading: true,
  user: null,
});

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebaseClient.onAuthStateChanged(async (session) => {
      setSession(session);

      if (session) {
        const snap = await firebaseClient.getUser(session.uid);
        setUser(snap.data());
      }

      setIsSessionLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ session, isSessionLoading, user }}>
      {children}
    </AuthContext.Provider>
  );
};
