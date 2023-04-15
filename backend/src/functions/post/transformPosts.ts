import IPost from 'src/interfaces/IPost';

const transformPosts = (posts: IPost[]) => {
  return posts.map((post) => {
    return {
      ...post,
      likedByUser: post.likedBy?.length > 0,
      savedByUser: post.savedBy?.length > 0,
    };
  });
};

export default transformPosts;
