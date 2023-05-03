import React from 'react';

import ChatNavbar from './ChatNavbar';
import Chats from './Chats';
import Search from './ChatUserSearch';

const Sidebar = () => {
  return (
    <div className="sidebar shadow">
      <ChatNavbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
