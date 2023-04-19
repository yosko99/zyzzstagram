import React from 'react';

import StorySwiper from '../components/story/StorySwiper';
import IUser from '../interfaces/IUser';

const StoriesPage = () => {
  const users: IUser[] = [
    {
      username: 'yosko99',
      isFollowedByRequester: false,
      email: 'azis@asdsa.com',
      password: 'a',
      createdAt: new Date(),
      updatedAt: new Date(),
      id: 'asdaads',
      isSameAsRequester: false,
      stories: [
        {
          id: '2',
          createdAt: new Date(),
          imageURL: '37e8ca56-0897-4342-9dc6-3cce20475903-File name.jpg'
        },
        {
          id: '1',
          createdAt: new Date(),
          imageURL: '37e8ca56-0897-4342-9dc6-3cce20475903-File name.jpg'
        },
        {
          id: '1',
          createdAt: new Date(),
          imageURL: '37e8ca56-0897-4342-9dc6-3cce20475903-File name.jpg'
        }
      ],
      imageURL: '37e8ca56-0897-4342-9dc6-3cce20475903-File name.jpg'
    },
    {
      username: 'azis',
      isFollowedByRequester: false,
      email: 'azis@asdsa.com',
      password: 'a',
      createdAt: new Date(),
      updatedAt: new Date(),
      id: 'asdaads',
      isSameAsRequester: false,
      stories: [
        {
          id: '2',
          createdAt: new Date(),
          imageURL: '37e8ca56-0897-4342-9dc6-3cce20475903-File name.jpg'
        },
        {
          id: '1',
          createdAt: new Date(),
          imageURL: '37e8ca56-0897-4342-9dc6-3cce20475903-File name.jpg'
        }
      ],
      imageURL: '37e8ca56-0897-4342-9dc6-3cce20475903-File name.jpg'
    }
  ];

  return (
    <div>
      <StorySwiper users={users} />
    </div>
  );
};

export default StoriesPage;
