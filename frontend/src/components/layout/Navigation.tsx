import React, { ReactElement } from 'react';

import { Nav, Navbar } from 'react-bootstrap';
import {
  FaHome,
  FaSearch,
  FaCompass,
  FaPlay,
  FaEnvelope,
  FaBell,
  FaPlusSquare,
  FaUser
} from 'react-icons/fa';
import { IconType } from 'react-icons/lib';

interface Tab {
  label: string;
  icon: ReactElement<IconType>;
  href: string;
}

const Navigation = () => {
  const tabs: Tab[] = [
    { icon: <FaHome />, label: 'Home', href: 'home' },
    { icon: <FaSearch />, label: 'Search', href: 'search' },
    { icon: <FaCompass />, label: 'Explore', href: 'explore' },
    { icon: <FaPlay />, label: 'Reels', href: 'reels' },
    { icon: <FaEnvelope />, label: 'Messages', href: 'messages' },
    { icon: <FaBell />, label: 'Notifications', href: 'notifications' },
    { icon: <FaPlusSquare />, label: 'Create', href: 'create' },
    { icon: <FaUser />, label: 'Profile', href: 'profile' }
  ];
  return (
    <Navbar className="flex-column sticky-bottom fs-lg-5 fs-2 ms-lg-3 m-0 p-0">
      <Nav className="d-flex w-100 flex-lg-column flex-row justify-content-around">
        {tabs.map((tab, index: number) => (
          <Nav.Link href={tab.href} key={index}>
            <div className="d-block d-lg-none">{tab.icon}</div>
            <span className="d-none d-lg-block">{tab.label}</span>
          </Nav.Link>
        ))}
      </Nav>
    </Navbar>
  );
};

export default Navigation;
