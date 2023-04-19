/* eslint-disable multiline-ternary */
import React from 'react';

import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

import Post from '../../components/post/Post';
import MainPageStoriesPanel from '../../components/story/MainPageStoriesPanel';
import MainPageStory from '../../components/story/MainPageStory';
import LoadingSpinner from '../../components/utils/LoadingSpinner';
import { getFollowingUsersPostsRoute } from '../../constants/apiRoutes';
import useFetch from '../../hooks/useFetch';
import IPost from '../../interfaces/IPost';
import CenteredItems from '../../styles/CenteredItems';

const MainPageTab = () => {
  const { data, error, isLoading } = useFetch(
    'posts',
    getFollowingUsersPostsRoute(),
    true,
    true
  );

  const posts = data as unknown as IPost[];

  return (
    <div className="d-flex flex-column">
      <MainPageStoriesPanel>
        <MainPageStory
          imageURL="https://cdn.marica.bg/images/marica.bg/967/1200_azis-shashna-s-priznania-za-jivota-i-karierata-si-video-1.jpg"
          username="test"
        />
      </MainPageStoriesPanel>
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
