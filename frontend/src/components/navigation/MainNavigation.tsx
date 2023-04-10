import React, { ReactElement, useState } from 'react';

import { Nav, Navbar } from 'react-bootstrap';
import {
  FaHome,
  FaSearch,
  FaCompass,
  FaPlay,
  FaEnvelope,
  FaUser,
  FaPlusSquare
} from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { useNavigate } from 'react-router-dom';

import INotification from '../../interfaces/INotification';
import NotificationsButton from '../buttons/NotificationsButton';
import UploadPostForm from '../forms/UploadPostForm';
import Notifications from '../notifications/Notifications';
import CustomModal from '../utils/CustomModal';

interface Tab {
  label: string | React.ReactNode;
  icon: ReactElement<IconType>;
  href?: string;
}

const MainNavigation = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const navigate = useNavigate();

  const tabs: Tab[] = [
    { icon: <FaHome />, label: 'Home', href: '/' },
    { icon: <FaSearch />, label: 'Search', href: '/search' },
    { icon: <FaCompass />, label: 'Explore', href: '/explore' },
    { icon: <FaPlay />, label: 'Reels', href: '/reels' },
    { icon: <FaEnvelope />, label: 'Messages', href: '/messages' },
    {
      icon: (
        <CustomModal
          activateButtonElement={
            <NotificationsButton setNotifications={setNotifications} />
          }
          modalHeader={<p className="m-0">Notifications</p>}
          modalBody={<Notifications notifications={notifications} />}
        />
      ),
      label: (
        <CustomModal
          activateButtonClassName="m-0"
          activateButtonElement={
            <NotificationsButton setNotifications={setNotifications} />
          }
          modalHeader={<p className="m-0">Notifications</p>}
          modalBody={<Notifications notifications={notifications} />}
        />
      )
    },
    {
      icon: (
        <CustomModal
          activateButtonElement={<FaPlusSquare />}
          modalHeader={<p className="m-0">Upload your image</p>}
          modalBody={<UploadPostForm />}
        />
      ),
      label: (
        <CustomModal
          activateButtonClassName="m-0"
          activateButtonElement="Create"
          modalHeader={<p className="m-0">Upload your image</p>}
          modalBody={<UploadPostForm />}
        />
      )
    },
    { icon: <FaUser />, label: 'Profile', href: '/profile' }
  ];

  const handleRedirect = (href: string | undefined) => {
    if (href !== undefined) {
      navigate(href);
    }
  };

  return (
    <Navbar className="flex-column sticky-bottom fs-lg-5 fs-2 ms-lg-3 m-0 p-0">
      <Nav className="d-flex w-100 flex-lg-column flex-row justify-content-around">
        {tabs.map((tab, index: number) => (
          <div
            onClick={() => handleRedirect(tab.href)}
            key={index}
            className="m-1"
          >
            <div role={'button'} className="d-block d-lg-none">
              {tab.icon}
            </div>
            <span role={'button'} className="d-none d-lg-block">
              {tab.label}
            </span>
          </div>
        ))}
      </Nav>
    </Navbar>
  );
};

export default MainNavigation;
