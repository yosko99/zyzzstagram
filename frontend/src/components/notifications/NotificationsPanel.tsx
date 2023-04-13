/* eslint-disable multiline-ternary */
import React from 'react';

import { BsBellSlash } from 'react-icons/bs';

import INotification from '../../interfaces/INotification';
import CenteredItems from '../../styles/CenteredItems';
import Notification from './Notification';

interface Props {
  notifications: INotification[];
}

const NotificationsPanel = ({ notifications }: Props) => {
  return (
    <div style={{ maxHeight: '50vh', overflow: 'auto' }}>
      {notifications.length === 0 ? (
        <CenteredItems className="p-5" flexColumn>
          <BsBellSlash size={'4em'} />
          <p className="mt-3 fs-3 mb-0">No notifications yet</p>
          <p className="fs-5">
            When you get notifications, they&apos;ll show up here
          </p>
        </CenteredItems>
      ) : (
        notifications.map((notification, index: number) => (
          <Notification key={index} notification={notification} />
        ))
      )}
    </div>
  );
};

export default NotificationsPanel;
