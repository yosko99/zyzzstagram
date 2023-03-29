const API_PREFIX = '/api/';
export const PUBLIC_IMAGES_PREFIX = '/public/';

// USERS
export const getUsersRoute = () => API_PREFIX + 'users/';
export const getUserByUsernameRoute = (username: string) =>
  `${getUsersRoute()}${username}/user`;
export const getLoginRoute = () => getUsersRoute() + 'login';
export const getCurrentUserRoute = () => getUsersRoute() + 'current';

// POSTS
export const getPostsRoute = () => API_PREFIX + 'posts/';
export const getLikePostRoute = (id: string) => `${getPostsRoute()}${id}/likes`;

// NOTIFICATIONS
export const getNotificationsRoute = () => API_PREFIX + 'notifications/';
export const getNotificationsLikeRoute = () => getNotificationsRoute() + 'like';
export const getNotificationsReadRoute = () => getNotificationsRoute() + 'read';
