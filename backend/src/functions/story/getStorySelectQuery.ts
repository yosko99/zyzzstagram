import { Prisma } from '@prisma/client';

const getStorySelectQuery = (username: string) => {
  const storySelectQuery: Prisma.StorySelect = {
    createdAt: true,
    likedBy: {
      where: {
        username,
      },
      select: { username: true },
    },
    id: true,
    imageURL: true,
  };

  return storySelectQuery;
};

export default getStorySelectQuery;
