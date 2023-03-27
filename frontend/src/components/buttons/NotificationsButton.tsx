import React, { useEffect, useState } from 'react';

import { FaBell } from 'react-icons/fa';

import { NOTIFICATIONS_ROUTE } from '../../constants/apiRoutes';
import useFetch from '../../hooks/useFetch';
import INotification from '../../interfaces/INotification';
import NotificationNumberStyle from '../../styles/NotificationNumberStyle';

interface Props {
  setNotifications: React.Dispatch<React.SetStateAction<INotification[]>>;
}

const NotificationsButton = ({ setNotifications }: Props) => {
  const [numberOfUnread, setNumberOfUnread] = useState(0);
  const { data, isLoading } = useFetch(
    'notifications',
    NOTIFICATIONS_ROUTE,
    true,
    true
  );

  const notifications = data as INotification[];

  useEffect(() => {
    if (!isLoading) {
      setNotifications(notifications);

      setNumberOfUnread(
        notifications.filter((notification) => !notification.read).length
      );
    }
  }, [isLoading]);

  return (
    <span style={{ position: 'relative' }}>
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
