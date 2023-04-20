import IUser from '../../interfaces/IUser';

const appendLikeToUsersStories = (users: IUser[]) => {
  return users.map((user) => {
    const updatedStoriesWithLike = user.stories.map((story) => {
      return {
        ...story,
        likedByUser: story.likedBy.length > 0,
      };
    });

    return {
      ...user,
      stories: updatedStoriesWithLike,
    };
  });
};

export default appendLikeToUsersStories;
