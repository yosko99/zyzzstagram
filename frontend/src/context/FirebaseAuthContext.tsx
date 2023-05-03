import React, { ReactNode, createContext, useEffect, useState } from 'react';

import { User, onAuthStateChanged } from 'firebase/auth';

import { auth } from '../firebase';

export const FirebaseAuthContext = createContext<User | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const FirebaseAuthContextProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(() => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : undefined;
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user as User);
      localStorage.setItem('currentUser', JSON.stringify(user));
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <FirebaseAuthContext.Provider value={currentUser}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};
