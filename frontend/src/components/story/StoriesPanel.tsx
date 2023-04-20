/* eslint-disable multiline-ternary */
import React from 'react';

import { Spinner } from 'react-bootstrap';

import { getFollowingUsersStoriesRoute } from '../../constants/apiRoutes';
import useFetch from '../../hooks/useFetch';
import IStory from '../../interfaces/IStory';
import CreateStoryButton from '../buttons/story/CreateStoryButton';
import StoryBubble from './StoryBubble';

const StoriesPanel = () => {
  const { isLoading, data } = useFetch(
    'stories',
    getFollowingUsersStoriesRoute(),
    true,
    true
  );

  if (isLoading) {
    <Spinner />;
  }

  const response = data as {
    userStories?: IStory[];
    followingUsersWithStories?: IStory[];
  };

  return (
    <section className="main">
      <div className="wrapper">
        <div className="left-col">
          <div className="status-wrapper">
            <div className="status-card">
              <div className="profile-pic">
                <CreateStoryButton />
              </div>
              <p className="username">Your story</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoriesPanel;
