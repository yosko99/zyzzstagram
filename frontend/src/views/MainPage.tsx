import React from 'react';

import Navigation from '../components/layout/Navigation';
import Post from '../components/layout/Post';
import StoriesHolder from '../components/layout/StoriesHolder';
import Story from '../components/layout/Story';
import useAuth from '../hooks/useAuth';
import IPost from '../interfaces/IPost';
import IStory from '../interfaces/IStory';
import IUser from '../interfaces/IUser';

const MainPage = () => {
  useAuth('/login');
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

  const post: IPost = {
    id: '1',
    imageURL:
      'https://img-s2.onedio.com/id-5d12321b352f4df72b2ae76d/rev-0/w-635/listing/f-jpg-webp/s-26ac11675c6dbb789c1e202cac0428be2487c4a9.webp',
    published: true,
    description: 'nice',
    author: user,
    likedBy: [user],
    authorId: user.id,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const story: IStory = {
    createdAt: new Date(),
    id: '1',
    imageURL: 'https://pbs.twimg.com/media/CJOYk7QXAAA_0fd.jpg',
    user,
    userId: user.id
  };

  return (
    <div className="d-flex flex-lg-row flex-column">
      <Navigation />
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
        <div className="d-flex flex-column">
          <Post user={user} post={post} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
