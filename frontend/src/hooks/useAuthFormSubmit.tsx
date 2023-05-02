import React, { useState } from 'react';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useQueryClient } from 'react-query';

import CustomAlert from '../components/utils/CustomAlert';
import { auth, db } from '../firebase';
import setTokenAndRedirect from '../functions/setTokenAndRedirect';
import ExtendedAxiosError from '../types/ExtendedAxiosError';
import useMutationWithToken from './useMutationWithToken';

interface FormData {
  username?: string;
  email?: string;
  password?: string;
}

const useAuthFormSubmit = (
  routeURL: string,
  typeOfAuth: 'login' | 'register'
) => {
  const [alert, setAlert] = useState<React.ReactNode>();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutationWithToken(routeURL, false);
  const [loading, setLoading] = useState(isLoading);

  const handleSubmit = (data: FormData) => {
    mutate(
      { ...data },
      {
        onSuccess: async (response) => {
          queryClient.resetQueries();

          setAlert(<CustomAlert variant="success" text={response.message} />);

          if (typeOfAuth === 'register') {
            setLoading(true);
            const userCredentials = await createUserWithEmailAndPassword(
              auth,
              data.email!,
              data.password!
            );

            const user = userCredentials.user;

            await updateProfile(user, {
              displayName: data.username,
              photoURL: 'no-image.png'
            });

            await setDoc(doc(db, 'users', user.uid), {
              displayName: data.username,
              email: data.email,
              photoURL: 'no-image.png',
              uid: user.uid
            });
            await setDoc(doc(db, 'userChats', user.uid), {});
          } else {
            setLoading(true);
            await signInWithEmailAndPassword(auth, data.email!, data.password!);
          }

          setLoading(false);
          setTokenAndRedirect(response.token);
        },
        onError: (err) => {
          const { response } = err as ExtendedAxiosError;

          setAlert(
            <CustomAlert variant="danger" text={response.data.message} />
          );
        }
      }
    );
  };

  return { alert, handleSubmit, isLoading: loading };
};

export default useAuthFormSubmit;
