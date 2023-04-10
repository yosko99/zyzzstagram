import React from 'react';

import { AiFillTags } from 'react-icons/ai';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { FaVoteYea } from 'react-icons/fa';

const ProfileNavigation = () => {
  return (
    <div className="text-uppercase d-flex justify-content-around justify-content-lg-center">
      <div className="me-3 mt-2">
        <div role={'button'} className="d-block d-lg-none fs-2">
          <BsFillGrid3X3GapFill />
        </div>
        <span role={'button'} className="d-none d-lg-block">
          Posts
        </span>
      </div>
      <div className="mx-3 mt-2">
        <div role={'button'} className="d-block d-lg-none fs-2">
          <FaVoteYea />
        </div>
        <span role={'button'} className="d-none d-lg-block">
          Saved
        </span>
      </div>
      <div className="ms-3 mt-2">
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
