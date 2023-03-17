import React, { useState } from 'react';

import axios from 'axios';
import { useMutation } from 'react-query';

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

  return useMutation(uploadPost, {
    onError: (err: ExtendedAxiosError) => {
      throw new Error(err.response.data.message);
    }
  });
};

const useUploadForm = (routeURL: string, redirectOnSuccessURL?: string) => {
  const [alert, setAlert] = useState<React.ReactNode>();
  const [imageFile, setImageFile] = useState<File>();

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
          if (redirectOnSuccessURL !== undefined) {
            setTimeout(() => {
              localStorage.setItem('token', data.token);
              window.location.href = redirectOnSuccessURL;
            }, 1000);
          }
        }
      });
    }
  };

  return { alert, setAlert, imageFile, setImageFile, handleSubmit, isLoading };
};

export default useUploadForm;
