const API_PREFIX = '/api/';
export const PUBLIC_IMAGES_PREFIX = '/public/';

// USERS
export const getUsersRoute = () => API_PREFIX + 'users';
export const getUsersRouteWithSearchQuery = (search: string) =>
  `${getUsersRoute()}?search=${search}`;
export const getUserByUsernameRoute = (username: string) =>
  `${getUsersRoute()}/${username}/user`;
export const getLoginRoute = () => getUsersRoute() + '/login';
export const getCurrentUserRoute = () => getUsersRoute() + '/current';
export const getUserFollowersRoute = (username: string) =>
  `${getUsersRoute()}/${username}/followers`;
export const getUserFollowingRoute = (username: string) =>
  `${getUsersRoute()}/${username}/following`;
export const getCurrentUserSavedPostsRoute = () =>
  `${getCurrentUserRoute()}/saved-posts`;
export const getCurrentUserSuggestedUsers = () =>
  `${getCurrentUserRoute()}/suggested`;

// POSTS
export const getPostsRoute = () => API_PREFIX + 'posts';
export const getExplorePostsRoute = () =>
  `${getPostsRoute()}?posts_type=explore`;
export const getFollowingUsersPostsRoute = () =>
  `${getPostsRoute()}?posts_type=following`;
export const getPostRoute = (id: string) => `${getPostsRoute()}/${id}`;
export const getLikePostRoute = (id: string) =>
  `${getPostsRoute()}/${id}/likes`;
export const getCommentPostRoute = (id: string) =>
  `${getPostsRoute()}/${id}/comments`;
export const getPostSavedByRoute = (id: string) =>
  `${getPostsRoute()}/${id}/saved-by`;
export const getLikeCommentRoute = (postId: string, commentId: string) =>
  `${getPostsRoute()}/${postId}/comments/${commentId}/likes`;

// NOTIFICATIONS
export const getNotificationsRoute = () => API_PREFIX + 'notifications/';
export const getNotificationsLikeRoute = () => getNotificationsRoute() + 'like';
export const getNotificationsReadRoute = () => getNotificationsRoute() + 'read';

// STORIES
export const getStoriesRoute = () => API_PREFIX + 'stories';
export const getFollowingUsersStoriesRoute = () =>
  `${getStoriesRoute()}?stories_type=following`;
