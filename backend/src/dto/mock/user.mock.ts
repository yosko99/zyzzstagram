const email = 'test@example.com';
const password = 'testpassword';
const username = 'testuser';

export const createUserDto = { email, password, username };

export const createInvalidUserDto = { email: '', password: '', username: '' };

export const createUserForPostDto = {
  email: 'testPost@example.com',
  password,
  username: 'testPost',
};

export const createFirstUserForNotificationDto = {
  email: 'testNotification1@example.com',
  password,
  username: 'testNotification1',
};

export const createSecondUserForNotificationDto = {
  email: 'testNotification2@example.com',
  password,
  username: 'testNotification2',
};
