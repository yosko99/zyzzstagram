import React, { useContext, useState } from 'react';

import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import CustomAlert from '../components/utils/CustomAlert';
import { TokenContext } from '../context/TokenContext';
import ExtendedAxiosError from '../types/ExtendedAxiosError';

export const usePostMutationWithToken = (
  routeURL: string,
  onMutate?: () => any
) => {
  const token = useContext(TokenContext);

  const uploadPost = async (data: any) => {
    const config = {
      headers: { Authorization: `Bearer ${token?.token}` }
    };
    const response = await axios.post(routeURL, data, config);
    return response.data;
  };

  return useMutation(uploadPost, { onMutate: onMutate && onMutate });
};

export const useUploadForm = (
  routeURL: string,
  redirectOnSuccessURL?: string
) => {
  const [alert, setAlert] = useState<React.ReactNode>();
  const [imageFile, setImageFile] = useState<File>();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = usePostMutationWithToken(routeURL);

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
          setAlert(<CustomAlert variant="success" text={data.message} />);
          queryClient.refetchQueries();

          if (redirectOnSuccessURL !== undefined) {
            setTimeout(() => {
              localStorage.setItem('token', data.token);
              window.location.href = redirectOnSuccessURL;
            }, 1000);
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

  return { alert, setAlert, imageFile, setImageFile, handleSubmit, isLoading };
};
