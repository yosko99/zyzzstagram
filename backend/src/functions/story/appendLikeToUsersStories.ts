import IUser from '../../interfaces/IUser';

const appendLikeToUsersStories = (users: IUser[]) => {
  const updatedUsers: IUser[] = [];

  for (let i = 0; i < users.length; i++) {
    if (users[i].stories.length !== 0) {
      const updatedStoriesWithLike = users[i].stories.map((story) => {
        return {
          ...story,
          likedByUser: story.likedBy.length > 0,
        };
      });

      updatedUsers.push({ ...users[i], stories: updatedStoriesWithLike });
    }
  }

  return updatedUsers;
};

export default appendLikeToUsersStories;
