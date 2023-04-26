import React from 'react';

import { Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { PUBLIC_IMAGES_PREFIX } from '../../constants/apiRoutes';
import INotification from '../../interfaces/INotification';

interface Props {
  notification: INotification;
}

const NotificationPostImage = ({ notification }: Props) => {
  const navigate = useNavigate();

  return (
    <Image
      fluid
      style={{ minWidth: '50px', maxHeight: '50px' }}
      src={PUBLIC_IMAGES_PREFIX + notification.post?.imageURL}
      role="button"
      onClick={() => navigate(`/post/${notification.post?.id}`)}
    />
  );
};

export default NotificationPostImage;
