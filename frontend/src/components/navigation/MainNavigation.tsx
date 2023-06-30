import React, { useState } from 'react';

import { Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import getNavigationTabs from '../../data/navigationTabs';
import INotification from '../../interfaces/INotification';

const StickyNavigation = styled.div`
  @media only screen and (max-width: 1000px) {
    background-color: white;
    width: 100%;
    position: fixed;
    height: 50px;
    bottom: 0;
    margin-top: 50px;
  }
`;

const MainNavigation = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const navigate = useNavigate();

  const tabs = getNavigationTabs(setNotifications, notifications);

  const handleRedirect = (href: string | undefined) => {
    if (href !== undefined) {
      navigate(href);
    }
  };

  return (
    <Navbar className="flex-column sticky-bottom fs-lg-5 fs-2 ms-lg-3 m-0 p-0">
      <StickyNavigation>
        <Nav className="d-flex w-100 flex-lg-column flex-row justify-content-around">
          {tabs.map((tab, index: number) => (
            <div
              onClick={() => handleRedirect(tab.href)}
              key={index}
              onMouseOver={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
              className={`m-1 ${
                window.location.pathname === tab.href
                  ? 'text-dark'
                  : 'text-muted'
              }`}
            >
              <div className={` ${hoveredIndex === index && 'text-dark'}`}>
                <div role={'button'} className={'d-block d-lg-none'}>
                  {tab.icon}
                </div>
                <span role={'button'} className="d-none d-lg-block">
                  {tab.label}
                </span>
              </div>
            </div>
          ))}
        </Nav>
      </StickyNavigation>
    </Navbar>
  );
};

export default MainNavigation;
