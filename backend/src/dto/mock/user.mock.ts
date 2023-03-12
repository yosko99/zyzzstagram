const email = 'test@example.com';
const password = 'testpassword';
const username = 'testuser';

export const createUserDto = { email, password, username };

export const createInvalidUserDto = { email: '', password: '', username: '' };
