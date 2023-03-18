import { PrismaService } from '../../../prisma/prisma.service';

import { CheckExistingUserByUsernameMiddleware } from '../checkExistingUserByUsername.middleware';

describe('test checkExistingUserByUsername middleware', () => {
  const prismaService = new PrismaService();
  const middleware: CheckExistingUserByUsernameMiddleware =
    new CheckExistingUserByUsernameMiddleware(prismaService);

  it('should set user property on request object if user with provided username exists', async () => {
    const req: any = { params: { username: 'testuser' } };
    const res: any = {};
    const next = jest.fn();

    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue({
      username: 'testuser',
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'a',
      id: 'á',
      password: 'a',
      imageURL: 'https://testuser.com/profile.jpg',
      description: 'Test user',
    });

    await middleware.use(req, res, next);

    expect(req.user).toBeDefined();
    expect(req.user.username).toBe('testuser');
    expect(req.user.imageURL).toBe('https://testuser.com/profile.jpg');
    expect(req.user.description).toBe('Test user');
    expect(next).toHaveBeenCalled();
  });

  it('should return 404 error response if user with provided username does not exist', async () => {
    const req: any = { params: { username: 'testuser' } };
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const next = jest.fn();

    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

    await middleware.use(req, res, next);

    expect(req.user).toBeUndefined();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      message: 'Could not find user with provided username',
    });

    expect(next).not.toHaveBeenCalled();
  });
});
