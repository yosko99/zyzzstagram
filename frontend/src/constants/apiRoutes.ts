const API_PREFIX = '/api/';
export const PUBLIC_IMAGES_PREFIX = '/public/';

// USERS
export const getUsersRoute = () => API_PREFIX + 'users/';
export const getUserByUsernameRoute = (username: string) =>
  `${getUsersRoute()}${username}/user`;
export const getLoginRoute = () => getUsersRoute() + 'login';
export const getCurrentUserRoute = () => getUsersRoute() + 'current';
export const getUserFollowersRoute = (username: string) =>
  `${getUsersRoute()}${username}/followers`;
export const getUserFollowingRoute = (username: string) =>
  `${getUsersRoute()}${username}/following`;

// POSTS
export const getPostsRoute = () => API_PREFIX + 'posts/';
export const getPostRoute = (id: string) => `${getPostsRoute()}${id}`;
export const getLikePostRoute = (id: string) => `${getPostsRoute()}${id}/likes`;
export const getCommentPostRoute = (id: string) =>
  `${getPostsRoute()}${id}/comments`;

// NOTIFICATIONS
export const getNotificationsRoute = () => API_PREFIX + 'notifications/';
export const getNotificationsLikeRoute = () => getNotificationsRoute() + 'like';
export const getNotificationsReadRoute = () => getNotificationsRoute() + 'read';
