import React, { ReactElement } from 'react';

import { IconType } from 'react-icons';
import {
  FaCompass,
  FaEnvelope,
  FaHome,
  FaPlay,
  FaPlusSquare,
  FaSearch,
  FaUser
} from 'react-icons/fa';

import NotificationsButton from '../components/buttons/notifications/NotificationsButton';
import UploadPostForm from '../components/forms/UploadPostForm';
import NotificationsPanel from '../components/notifications/NotificationsPanel';
import SearchBox from '../components/search/SearchBox';
import CustomModal from '../components/utils/CustomModal';
import INotification from '../interfaces/INotification';

interface INavigationTabs {
  label: string | React.ReactNode;
  icon: ReactElement<IconType>;
  href?: string;
}

const getNavigationTabs = (
  setNotifications: React.Dispatch<React.SetStateAction<INotification[]>>,
  notifications: INotification[]
) => {
  const tabs: INavigationTabs[] = [
    { icon: <FaHome />, label: 'Home', href: '/' },
    { icon: <FaCompass />, label: 'Explore', href: '/explore' },
    { icon: <FaEnvelope />, label: 'Messages', href: '/messages' },
    {
      icon: (
        <CustomModal
          activateButtonElement={<FaSearch />}
          modalHeader={<p className="m-0">Search</p>}
          modalBody={<SearchBox />}
        />
      ),
      label: (
        <CustomModal
          activateButtonClassName="m-0"
          activateButtonElement="Search"
          modalHeader={<p className="m-0">Search</p>}
          modalBody={<SearchBox />}
        />
      )
    },
    {
      icon: (
        <CustomModal
          activateButtonElement={
            <NotificationsButton setNotifications={setNotifications} />
          }
          modalHeader={<p className="m-0">Notifications</p>}
          modalBody={<NotificationsPanel notifications={notifications} />}
        />
      ),
      label: (
        <CustomModal
          activateButtonClassName="m-0"
          activateButtonElement={
            <NotificationsButton setNotifications={setNotifications} />
          }
          modalHeader={<p className="m-0">Notifications</p>}
          modalBody={<NotificationsPanel notifications={notifications} />}
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

  return tabs;
};

export default getNavigationTabs;
