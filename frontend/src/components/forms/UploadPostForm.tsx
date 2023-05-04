import React, { useEffect } from 'react';

import { Button, FloatingLabel, Form } from 'react-bootstrap';

import { getPostsRoute } from '../../constants/apiRoutes';
import { useUploadImage } from '../../hooks/useUploadImage';
import ImageUploadInput from '../inputs/ImageUploadInput';
import LoadingSpinner from '../utils/LoadingSpinner';

const UploadPostForm = () => {
  const { setAlert, setImageFile, isLoading, imageFile, handleSubmit, alert } =
    useUploadImage(getPostsRoute(), '', false, false);

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
      <ImageUploadInput aspectRatio={4 / 3} setImageFile={setImageFile} />

      {alert}
      {isLoading && <LoadingSpinner />}

      <Button type="submit" className="w-100 mt-4 mb-2" variant="success">
        Submit your post
      </Button>
    </Form>
  );
};

export default UploadPostForm;
