/* eslint-disable multiline-ternary */
import React, { useEffect } from 'react';

import { Button, Form, Image } from 'react-bootstrap';

import {
  PUBLIC_IMAGES_PREFIX,
  getCurrentUserPhotoRoute
} from '../../constants/apiRoutes';
import { useUploadForm } from '../../hooks/useUploadImage';
import ImageUploadInput from '../inputs/ImageUploadInput';
import CustomModal from '../utils/CustomModal';
import LoadingSpinner from '../utils/LoadingSpinner';

interface Props {
  imageURL: string;
  isSameAsRequester: boolean;
}

const ProfilePhoto = ({ imageURL, isSameAsRequester }: Props) => {
  const { setAlert, setImageFile, isLoading, imageFile, handleSubmit, alert } =
    useUploadForm(getCurrentUserPhotoRoute(), '', false, true);

  useEffect(() => {
    setAlert(null);
  }, [imageFile]);

  return isSameAsRequester ? (
    <CustomModal
      modalHeader={'Update your photo'}
      activateButtonOnClick={() => setAlert(null)}
      activateButtonElement={
        <Image
          src={PUBLIC_IMAGES_PREFIX + imageURL}
          height={'120px'}
          width={'120px'}
          role="button"
          style={{ objectFit: 'cover' }}
          roundedCircle
        />
      }
      modalBody={
        <>
          <Form onSubmit={(e) => handleSubmit(e)} className="pt-5">
            <ImageUploadInput aspectRatio={3 / 2} setImageFile={setImageFile} />

            {alert}
            {isLoading && <LoadingSpinner />}

            <Button type="submit" className="w-100 mt-4 mb-2" variant="success">
              Update your profile photo
            </Button>
          </Form>
        </>
      }
    />
  ) : (
    <Image
      src={PUBLIC_IMAGES_PREFIX + imageURL}
      height={'120px'}
      style={{ objectFit: 'cover' }}
      width={'120px'}
      roundedCircle
    />
  );
};

export default ProfilePhoto;
