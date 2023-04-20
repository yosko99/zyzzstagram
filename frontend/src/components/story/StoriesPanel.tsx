/* eslint-disable multiline-ternary */
import React from 'react';

import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { getFollowingUsersStoriesRoute } from '../../constants/apiRoutes';
import useFetch from '../../hooks/useFetch';
import IUser from '../../interfaces/IUser';
import CreateStoryButton from '../buttons/story/CreateStoryButton';
import StoryBubble from './StoryBubble';

const StoriesPanel = () => {
  const { isLoading, data } = useFetch(
    'stories',
    getFollowingUsersStoriesRoute(),
    true,
    true
  );

  const navigate = useNavigate();

  const response = data as {
    currentUser?: IUser;
    followingUsersWithStories?: IUser[];
  };

  const handleStoryClick = (username: string) => {
    const stories = [
      response.currentUser,
      ...response.followingUsersWithStories!
    ];

    const startIndex = stories.findIndex((user) => user?.username === username);

    navigate('/stories', { state: { users: stories, startIndex } });
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
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                {response.currentUser && (
                  <StoryBubble
                    onClick={() =>
                      handleStoryClick(response.currentUser!.username)
                    }
                    imageURL={response.currentUser.imageURL}
                    username={response.currentUser.username}
                  />
                )}
                {response.followingUsersWithStories &&
                  response.followingUsersWithStories.map(
                    (user, index: number) => (
                      <StoryBubble
                        onClick={() => handleStoryClick(user.username)}
                        key={index}
                        username={user.username}
                        imageURL={user.imageURL}
                      />
                    )
                  )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoriesPanel;
