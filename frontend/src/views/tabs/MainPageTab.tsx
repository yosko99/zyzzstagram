/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import React from 'react';

import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

import StoriesHolder from '../../components/layout/StoriesHolder';
import Story from '../../components/layout/Story';
import Post from '../../components/post/Post';
import LoadingSpinner from '../../components/utils/LoadingSpinner';
import { getFollowingUsersPostsRoute } from '../../constants/apiRoutes';
import useFetch from '../../hooks/useFetch';
import IPost from '../../interfaces/IPost';
import IStory from '../../interfaces/IStory';
import IUser from '../../interfaces/IUser';
import CenteredItems from '../../styles/CenteredItems';

const MainPageTab = () => {
  const user: IUser = {
    username: 'yosko99',
    isFollowedByRequester: false,
    email: 'azis@asdsa.com',
    password: 'a',
    createdAt: new Date(),
    updatedAt: new Date(),
    id: 'asdaads',
    isSameAsRequester: false,
    imageURL:
      'https://cdn.marica.bg/images/marica.bg/967/1200_azis-shashna-s-priznania-za-jivota-i-karierata-si-video-1.jpg'
  };

  const story: IStory = {
    createdAt: new Date(),
    id: '1',
    imageURL: 'https://pbs.twimg.com/media/CJOYk7QXAAA_0fd.jpg',
    user,
    userId: user.id
  };

  const { data, error, isLoading } = useFetch(
    'posts',
    getFollowingUsersPostsRoute(),
    true,
    true
  );

  const posts = data as unknown as IPost[];

  return (
    <div className="d-flex flex-column">
      <StoriesHolder>
        <Story story={story} />
        <Story story={story} />
        <Story story={story} />
        <Story story={story} />
        <Story story={story} />
        <Story story={story} />
        <Story story={story} />
      </StoriesHolder>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="d-flex flex-column">
          {posts.length === 0 ? (
            <CenteredItems flexColumn className="mt-5">
              <IoIosCheckmarkCircleOutline size={'5em'} />
              <p className="fs-2 mb-0">You are all caught up</p>
              <p className="fs-4 text-muted mt-0">
                You have seen all new posts recently
              </p>
            </CenteredItems>
          ) : (
            posts.map((post, index: number) => (
              <Post
                className="mt-5"
                user={post.author}
                post={post}
                key={index}
                showComments={false}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MainPageTab;
