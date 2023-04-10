const email = 'test@example.com';
const password = 'testpassword';
const username = 'testuser';

const userData = {
  password,
  id: '1',
  imageURL: 'url',
  description: 'bio',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const createUserDto = {
  email,
  username,
  ...userData,
};

export const createUserForPostDto = {
  email: 'testPost@example.com',
  username: 'testPost',
  ...userData,
};

export const createFirstUserForNotificationDto = {
  email: 'testNotification1@example.com',
  username: 'testNotification1',
  ...userData,
};

export const createSecondUserForNotificationDto = {
  email: 'testNotification2@example.com',
  username: 'testNotification2',
  ...userData,
};

export const createInvalidUserDto = { email: '', password: '', username: '' };
