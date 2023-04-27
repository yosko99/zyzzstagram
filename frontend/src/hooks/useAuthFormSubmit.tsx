import React, { useState } from 'react';

import { useQueryClient } from 'react-query';

import CustomAlert from '../components/utils/CustomAlert';
import ExtendedAxiosError from '../types/ExtendedAxiosError';
import useMutationWithToken from './useMutationWithToken';

const useAuthFormSubmit = (routeURL: string) => {
  const [alert, setAlert] = useState<React.ReactNode>();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutationWithToken(routeURL, false);

  const handleSubmit = (data: object) => {
    mutate(
      { ...data },
      {
        onSuccess: (response) => {
          queryClient.resetQueries();

          setAlert(<CustomAlert variant="success" text={response.message} />);
          setTimeout(() => {
            localStorage.setItem('token', response.token);
            window.location.href = '/';
          }, 1000);
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

  return { alert, handleSubmit, isLoading };
};

export default useAuthFormSubmit;
