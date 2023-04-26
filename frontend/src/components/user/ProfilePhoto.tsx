import React from 'react';

import { Image } from 'react-bootstrap';

import { PUBLIC_IMAGES_PREFIX } from '../../constants/apiRoutes';

interface Props {
  imageURL: string;
  isSameAsRequester: boolean;
}

const ProfilePhoto = ({ imageURL, isSameAsRequester }: Props) => {
  const handleClick = () => {};

  return (
    <Image
      src={PUBLIC_IMAGES_PREFIX + imageURL}
      height={'120px'}
      width={'120px'}
      role={isSameAsRequester ? 'button' : 'img'}
      onClick={handleClick}
      roundedCircle
    />
  );
};

export default ProfilePhoto;
