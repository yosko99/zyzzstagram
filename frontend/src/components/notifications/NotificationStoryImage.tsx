import React from 'react';

import { Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import {
  PUBLIC_IMAGES_PREFIX,
  getFollowingUsersStoriesRoute
} from '../../constants/apiRoutes';
import useFetch from '../../hooks/useFetch';
import INotification from '../../interfaces/INotification';
import IUser from '../../interfaces/IUser';

interface Props {
  notification: INotification;
}

const NotificationStoryImage = ({ notification }: Props) => {
  const { data, refetch } = useFetch(
    'stories',
    getFollowingUsersStoriesRoute(),
    false,
    true
  );

  const navigate = useNavigate();

  const response = data as IUser[];

  const handleClick = () => {
    refetch();
    navigate('/stories', { state: { users: response, startIndex: 0 } });
  };

  return (
    <Image
      fluid
      style={{ minWidth: '50px', maxHeight: '50px', objectFit: 'cover' }}
      src={PUBLIC_IMAGES_PREFIX + notification.story?.imageURL}
      role="button"
      onClick={handleClick}
    />
  );
};

export default NotificationStoryImage;
