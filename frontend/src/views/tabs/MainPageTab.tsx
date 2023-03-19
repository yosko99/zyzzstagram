import React from 'react';

import Post from '../../components/layout/Post';
import StoriesHolder from '../../components/layout/StoriesHolder';
import Story from '../../components/layout/Story';
import LoadingSpinner from '../../components/utils/LoadingSpinner';
import { POSTS_ROUTE } from '../../constants/apiRoutes';
import useFetch from '../../hooks/useFetch';
import IPost from '../../interfaces/IPost';
import IStory from '../../interfaces/IStory';
import IUser from '../../interfaces/IUser';

const MainPageTab = () => {
  const user: IUser = {
    username: 'yosko99',
    email: 'azis@asdsa.com',
    password: 'a',
    createdAt: new Date(),
    updatedAt: new Date(),
    id: 'asdaads',
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

  const { data, error, isLoading } = useFetch('posts', POSTS_ROUTE, true);

  const posts = data as unknown as IPost[];
  return (
    <div className="d-flex flex-column w-100">
      <StoriesHolder>
        <Story story={story} />
        <Story story={story} />
        <Story story={story} />
        <Story story={story} />
        <Story story={story} />
        <Story story={story} />
        <Story story={story} />
      </StoriesHolder>
      {isLoading
        ? (
        <LoadingSpinner />
          )
        : (
        <div className="d-flex flex-column">
          {posts.map((post, index: number) => (
            <Post user={post.author} post={post} key={index} />
          ))}
        </div>
          )}
    </div>
  );
};

export default MainPageTab;
