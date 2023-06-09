import React, { useRef, useState } from 'react';

import { useQueryClient } from 'react-query';

import CustomAlert from '../components/utils/CustomAlert';
import ExtendedAxiosError from '../types/ExtendedAxiosError';
import useMutationWithToken from './useMutationWithToken';

export const useUploadImage = (
  routeURL: string,
  redirectOnSuccessURL: string = '',
  setToken: boolean,
  updateRequest: boolean,
  onSuccess?: () => void
) => {
  const [alert, setAlert] = useState<React.ReactNode>();
  const [imageFile, setImageFile] = useState<File>();
  const response = useRef<Object | null>(null);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutationWithToken(routeURL, updateRequest);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (imageFile === undefined) {
      setAlert(
        <CustomAlert variant="warning" text={'Please select a image'} />
      );
    } else {
      const formData = new FormData(e.target as HTMLFormElement);
      formData.set('image', imageFile);

      mutate(formData, {
        onSuccess: (data) => {
          onSuccess && onSuccess();

          setAlert(<CustomAlert variant="success" text={data.message} />);
          response.current = data as Object;

          queryClient.refetchQueries();

          setTimeout(() => {
            if (redirectOnSuccessURL !== '') {
              window.location.href = redirectOnSuccessURL;
            } else {
              const escKeyDownEvent = new KeyboardEvent('keydown', {
                key: 'Escape',
                keyCode: 27
              });
              document.dispatchEvent(escKeyDownEvent);
            }
          }, 1000);

          if (setToken) {
            localStorage.setItem('token', data.token);
          }
        },
        onError: (err: unknown) => {
          const {
            response: {
              data: { message }
            }
          } = err as ExtendedAxiosError;

          setAlert(<CustomAlert variant="danger" text={message} />);
        }
      });
    }
  };

  return {
    alert,
    setAlert,
    imageFile,
    setImageFile,
    handleSubmit,
    isLoading,
    response: response.current
  };
};
