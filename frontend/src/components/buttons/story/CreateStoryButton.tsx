import React, { useEffect } from 'react';

import { Button, Form } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';

import { getStoriesRoute } from '../../../constants/apiRoutes';
import { useUploadForm } from '../../../hooks/useUploadImage';
import ImageUploadInput from '../../inputs/ImageUploadInput';
import CustomModal from '../../utils/CustomModal';
import LoadingSpinner from '../../utils/LoadingSpinner';

const CreateStoryButton = () => {
  const { setAlert, setImageFile, isLoading, imageFile, handleSubmit, alert } =
    useUploadForm(getStoriesRoute(), '/profile', false, false);

  useEffect(() => {
    setAlert(null);
  }, [imageFile]);

  return (
    <CustomModal
      modalHeader={'Upload your story'}
      activateButtonElement={
        <AiOutlinePlusCircle
          role={'button'}
          style={{ width: '100%', height: '100%', color: 'white' }}
        />
      }
      modalBody={
        <Form onSubmit={(e) => handleSubmit(e)} className="pt-5">
          <ImageUploadInput aspectRatio={9 / 16} setImageFile={setImageFile} />

          {alert}
          {isLoading && <LoadingSpinner />}

          <Button type="submit" className="w-100 mt-4 mb-2" variant="success">
            Submit your story
          </Button>
        </Form>
      }
    />
  );
};

export default CreateStoryButton;
