import React, { useState } from 'react';

import { Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import getNavigationTabs from '../../data/navigationTabs';
import INotification from '../../interfaces/INotification';

const MainNavigation = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const navigate = useNavigate();

  const tabs = getNavigationTabs(setNotifications, notifications);

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
