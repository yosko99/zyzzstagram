import React, { useRef } from 'react';

import { AiFillTags } from 'react-icons/ai';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { FaVoteYea } from 'react-icons/fa';

import IUser from '../../interfaces/IUser';
import ProfilePagePostTab from '../../views/tabs/profilePage/ProfilePagePostTab';
import ProfilePageSavedTab from '../../views/tabs/profilePage/ProfilePageSavedTab';
import ProfilePageTaggedTab from '../../views/tabs/profilePage/ProfilePageTaggedTab';

interface Props {
  user: IUser;
  setCurrentTab: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

const ProfileNavigation = ({ user, setCurrentTab }: Props) => {
  const currentTab = useRef('posts');

  const handleNavigationClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    currentTab.current = e.currentTarget.id;
    switch (e.currentTarget.id) {
      case 'posts':
        setCurrentTab(
          <ProfilePagePostTab
            isSameAsRequester={user.isSameAsRequester}
            posts={user.posts!}
          />
        );
        break;
      case 'saved':
        setCurrentTab(<ProfilePageSavedTab />);
        break;
      case 'tagged':
        setCurrentTab(<ProfilePageTaggedTab />);
        break;
    }
  };

  return (
    <div className="text-uppercase d-flex justify-content-around justify-content-lg-center">
      <div
        id="posts"
        className={`me-3 mt-2 ${currentTab.current === 'posts' && 'text-info'}`}
        onClick={(e) => handleNavigationClick(e)}
      >
        <div role={'button'} className="d-block d-lg-none fs-2">
          <BsFillGrid3X3GapFill />
        </div>
        <span role={'button'} className="d-none d-lg-block">
          Posts
        </span>
      </div>
      {user.isSameAsRequester && (
        <div
          className={`mx-3 mt-2 ${
            currentTab.current === 'saved' && 'text-info'
          }`}
          id="saved"
          onClick={(e) => handleNavigationClick(e)}
        >
          <div role={'button'} className="d-block d-lg-none fs-2">
            <FaVoteYea />
          </div>
          <span role={'button'} className="d-none d-lg-block">
            Saved
          </span>
        </div>
      )}
      <div
        className={`ms-3 mt-2 ${
          currentTab.current === 'tagged' && 'text-info'
        }`}
        id="tagged"
        onClick={(e) => handleNavigationClick(e)}
      >
        <div role={'button'} className="d-block d-lg-none fs-2">
          <AiFillTags />
        </div>
        <span role={'button'} className="d-none d-lg-block">
          Tagged
        </span>
      </div>
    </div>
  );
};

export default ProfileNavigation;
