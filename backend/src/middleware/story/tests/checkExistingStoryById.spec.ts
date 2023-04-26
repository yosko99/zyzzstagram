import { Test } from '@nestjs/testing';
import { NextFunction, Request, Response } from 'express';

import { PrismaService } from '../../../prisma/prisma.service';

import { CheckExistingStoryById } from '../checkExistingStoryById.middleware';
import IStory from '../../../interfaces/IStory';
import IToken from 'src/interfaces/IToken';

describe('test checkExistingStoryById middleware', () => {
  let middleware: CheckExistingStoryById;
  let mockPrismaService: PrismaService;

  let mockRequest: Request & { story: IStory };
  let mockResponse: Response;
  let mockNextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      params: { id: '1' },
      userDataFromToken: { username: 'test', password: ' test' },
    } as unknown as Request & { story: IStory; userDataFromToken: IToken };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    mockNextFunction = jest.fn();
  });

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CheckExistingStoryById,
        {
          provide: PrismaService,
          useValue: {
            story: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    middleware = moduleRef.get<CheckExistingStoryById>(CheckExistingStoryById);

    mockPrismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when the story exists', () => {
    const mockStory = {} as any;

    beforeEach(async () => {
      jest
        .spyOn(mockPrismaService.story, 'findUnique')
        .mockResolvedValueOnce(mockStory);

      await middleware.use(mockRequest, mockResponse, mockNextFunction);
    });

    it('should set the story on the request object', () => {
      expect(mockRequest.story).toEqual(mockStory);
    });

    it('should call next', () => {
      expect(mockNextFunction).toHaveBeenCalled();
    });

    it('should not send a response', () => {
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.send).not.toHaveBeenCalled();
    });
  });

  describe('when the story does not exist', () => {
    beforeEach(async () => {
      jest
        .spyOn(mockPrismaService.story, 'findUnique')
        .mockResolvedValueOnce(null);

      await middleware.use(mockRequest, mockResponse, mockNextFunction);
    });

    it('should not set the story on the request object', () => {
      expect(mockRequest.story).toBeUndefined();
    });

    it('should not call next', () => {
      expect(mockNextFunction).not.toHaveBeenCalled();
    });

    it('should send a 404 response', () => {
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.send).toHaveBeenCalledWith({
        message: 'Could not find story with provided ID',
      });
    });
  });
});
