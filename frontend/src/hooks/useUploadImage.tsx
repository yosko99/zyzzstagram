import React, { useState } from 'react';

import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import CustomAlert from '../components/utils/CustomAlert';
import ExtendedAxiosError from '../types/ExtendedAxiosError';

const usePostMutationWithToken = (routeURL: string) => {
  const uploadPost = async (formData: FormData) => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
    const response = await axios.post(routeURL, formData, config);
    return response.data;
  };

  return useMutation(uploadPost);
};

const useUploadForm = (routeURL: string, redirectOnSuccessURL?: string) => {
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

export default useUploadForm;
