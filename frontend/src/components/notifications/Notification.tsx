/* eslint-disable multiline-ternary */
import React from 'react';

import { Col, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { PUBLIC_IMAGES_PREFIX } from '../../constants/apiRoutes';
import dateFormatter from '../../functions/dateFormatter';
import INotification from '../../interfaces/INotification';
import NotificationPostImage from './NotificationPostImage';
import NotificationStoryImage from './NotificationStoryImage';

interface Props {
  notification: INotification;
}

const Notification = ({ notification }: Props) => {
  return (
    <Row
      style={{
        backgroundColor: notification.read ? 'none' : 'whitesmoke'
      }}
      className={'shadow-sm p-3 my-1 m-0 p-0'}
    >
      <Col xs={2} className="d-flex justify-content-center align-items-center">
        <Link to={`/profile/${notification.sender?.username}`}>
          <Image
            fluid
            style={{ minWidth: '50px', minHeight: '50px' }}
            src={PUBLIC_IMAGES_PREFIX + notification.sender?.imageURL}
            alt={notification.sender?.username}
          />
        </Link>
      </Col>
      <Col xs={8} className="text-break">
        <p className="m-0">
          {notification.message}
          {notification.comment?.content &&
            `: ${notification.comment?.content}`}{' '}
          <span className="text-muted" style={{ fontSize: '0.8em' }}>
            {dateFormatter(new Date(notification.createdAt))}
          </span>
        </p>
      </Col>
      <Col xs={2} className="d-flex justify-content-center align-items-center">
        {notification.post ? (
          <NotificationPostImage notification={notification} />
        ) : (
          <NotificationStoryImage notification={notification} />
        )}
      </Col>
    </Row>
  );
};

export default Notification;
