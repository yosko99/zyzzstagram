import React, { useContext, useState } from 'react';

import axios, { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import CustomAlert from '../components/utils/CustomAlert';
import { TokenContext } from '../context/TokenContext';
import ExtendedAxiosError from '../types/ExtendedAxiosError';

export const useMutationWithToken = (
  routeURL: string,
  updateRequest: boolean,
  onMutate?: () => any
) => {
  const token = useContext(TokenContext);

  const uploadPost = async (data: any) => {
    const config = {
      headers: { Authorization: `Bearer ${token?.token}` }
    };
    let response: AxiosResponse<any, any>;
    if (!updateRequest) {
      response = await axios.post(routeURL, data, config);
    } else {
      response = await axios.put(routeURL, data, config);
    }
    return response.data;
  };

  return useMutation(uploadPost, { onMutate: onMutate && onMutate });
};

export const useUploadForm = (
  routeURL: string,
  redirectOnSuccessURL: string = '',
  setToken: boolean
) => {
  const [alert, setAlert] = useState<React.ReactNode>();
  const [imageFile, setImageFile] = useState<File>();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutationWithToken(routeURL, false);

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

          if (redirectOnSuccessURL !== '') {
            setTimeout(() => {
              window.location.href = redirectOnSuccessURL;
            }, 1000);
          }

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

  return { alert, setAlert, imageFile, setImageFile, handleSubmit, isLoading };
};
