import React, { ReactNode, createContext, useEffect, useState } from 'react';

import { User, onAuthStateChanged } from 'firebase/auth';

import { auth } from '../firebase';

export const AuthContext = createContext<User | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const FirebaseAuthContextProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user as User);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
