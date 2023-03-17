import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Button, FloatingLabel, Form } from 'react-bootstrap';

import { POSTS_ROUTE } from '../../constants/apiRoutes';
import ExtendedAxiosError from '../../types/ExtendedAxiosError';
import ImageUploadInput from '../inputs/ImageUploadInput';
import CustomAlert from '../utils/CustomAlert';

const UploadPostForm = () => {
  const [alert, setAlert] = useState<React.ReactNode>();
  const [imageFile, setImageFile] = useState<File>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (imageFile === undefined) {
      setAlert(
        <CustomAlert variant="warning" text={'Please select a image'} />
      );
    } else {
      const formData = new FormData(e.target as HTMLFormElement);
      formData.set('image', imageFile);

      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };

      axios
        .post(POSTS_ROUTE, formData, config)
        .then((response) => {
          setAlert(
            <CustomAlert variant="success" text={response.data.message} />
          );
        })
        .catch((err) => {
          const { response } = err as ExtendedAxiosError;

          setAlert(
            <CustomAlert variant="danger" text={response.data.message} />
          );
        });
    }
  };

  useEffect(() => {
    setAlert(null);
  }, [imageFile]);

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <FloatingLabel
        controlId="floatingTextarea"
        label="Description"
        className="mb-4"
      >
        <Form.Control
          required
          name="description"
          maxLength={255}
          style={{ height: '100px' }}
          as="textarea"
          placeholder="Write your posts description"
        />
      </FloatingLabel>
      <ImageUploadInput setImageFile={setImageFile} />

      {alert}

      <Button type="submit" className="w-100 mt-4 mb-2" variant="success">
        Submit your post
      </Button>
    </Form>
  );
};

export default UploadPostForm;
