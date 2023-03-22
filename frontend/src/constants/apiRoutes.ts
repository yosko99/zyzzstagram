const API_PREFIX = '/api/';
export const PUBLIC_IMAGES_PREFIX = '/public/';

// USERS
export const USERS_ROUTE = API_PREFIX + 'users/';
export const LOGIN_ROUTE = USERS_ROUTE + 'login';
export const CURRENT_USER_ROUTE = USERS_ROUTE + 'current';

// POSTS
export const POSTS_ROUTE = API_PREFIX + 'posts/';
export const LIKE_POST_ROUTE = POSTS_ROUTE + 'like/';

// NOTIFICATIONS
export const NOTIFICATIONS_ROUTE = API_PREFIX + 'notifications/';
export const NOTIFICATIONS_LIKE_ROUTE = NOTIFICATIONS_ROUTE + 'like';
