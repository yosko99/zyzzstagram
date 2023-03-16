import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';

import { PrismaService } from '../../../prisma/prisma.service';

import { CheckExistingPostByIdMiddleware } from '../checkExistingPostById.middleware';

describe('test CheckExistingPostById middleware', () => {
  let middleware: CheckExistingPostByIdMiddleware;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckExistingPostByIdMiddleware,
        {
          provide: PrismaService,
          useValue: {
            post: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    middleware = module.get<CheckExistingPostByIdMiddleware>(
      CheckExistingPostByIdMiddleware,
    );
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('use', () => {
    it('should set the post in the request object if it exists', async () => {
      const post = {
        id: '1',
        description: 'a',
        authorId: '1',
        createdAt: new Date(),
        imageURL: 'image',
        published: true,
        updatedAt: new Date(),
      };

      jest.spyOn(prismaService.post, 'findUnique').mockResolvedValue(post);

      const req = {
        params: { id: '1' },
      } as unknown as Request & { post?: any };
      const res = {} as Response;
      const next = jest.fn();

      await middleware.use(req, res, next);

      expect(prismaService.post.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: { author: true },
      });
      expect(req.post).toEqual(post);
      expect(next).toHaveBeenCalled();
    });

    it('should return 404 if post does not exist', async () => {
      jest.spyOn(prismaService.post, 'findUnique').mockResolvedValue(null);
      const req = {
        params: { id: '1' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;

      const next = jest.fn();

      await middleware.use(req, res, next);

      expect(prismaService.post.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: { author: true },
      });

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        message: 'Could not find post with provided ID',
      });
      expect(next).not.toHaveBeenCalled();
    });
  });
});
