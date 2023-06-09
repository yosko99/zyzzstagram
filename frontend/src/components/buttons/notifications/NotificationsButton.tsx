import React, { useEffect, useState } from 'react';

import { FaBell } from 'react-icons/fa';
import { useQueryClient } from 'react-query';

import {
  getNotificationsReadRoute,
  getNotificationsRoute
} from '../../../constants/apiRoutes';
import useFetch from '../../../hooks/useFetch';
import useMutationWithToken from '../../../hooks/useMutationWithToken';
import INotification from '../../../interfaces/INotification';
import NotificationNumberStyle from '../../../styles/NotificationNumberStyle';

interface Props {
  setNotifications: React.Dispatch<React.SetStateAction<INotification[]>>;
}

const NotificationsButton = ({ setNotifications }: Props) => {
  const [numberOfUnread, setNumberOfUnread] = useState(0);
  const { data, isLoading } = useFetch(
    'notifications',
    getNotificationsRoute(),
    true,
    true
  );

  const { mutate } = useMutationWithToken(getNotificationsReadRoute(), true);
  const queryClient = useQueryClient();

  const notifications = data as INotification[];

  const markAsRead = () => {
    mutate(
      {},
      {
        onSuccess: () => {
          setNumberOfUnread(0);
          queryClient.resetQueries({ queryKey: 'notifications' });
        }
      }
    );
  };

  useEffect(() => {
    if (!isLoading) {
      setNotifications(notifications);

      setNumberOfUnread(
        notifications.filter((notification) => !notification.read).length
      );
    }
  }, [isLoading]);

  return (
    <span style={{ position: 'relative' }} onClick={() => markAsRead()}>
      <span className="d-none d-lg-block">Notifications</span>
      <span className="d-block d-lg-none">
        <FaBell />
      </span>
      {numberOfUnread !== 0 && (
        <NotificationNumberStyle>{numberOfUnread}</NotificationNumberStyle>
      )}
    </span>
  );
};

export default NotificationsButton;
