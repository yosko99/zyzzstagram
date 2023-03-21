import { Test } from '@nestjs/testing';
import { NextFunction, Request, Response } from 'express';

import { PrismaService } from '../../../prisma/prisma.service';

import { CheckExistingNotificationByIdMiddleware } from '../checkExistingNotificationById.middleware';

import INotification from '../../../interfaces/INotification';

describe('test checkExistingNotificationById middleware', () => {
  let middleware: CheckExistingNotificationByIdMiddleware;
  let mockPrismaService: PrismaService;

  let mockRequest: Request & { notification: INotification };
  let mockResponse: Response;
  let mockNextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      params: { id: '1' },
    } as unknown as Request & { notification: INotification };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    mockNextFunction = jest.fn();
  });

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CheckExistingNotificationByIdMiddleware,
        {
          provide: PrismaService,
          useValue: {
            notification: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    middleware = moduleRef.get<CheckExistingNotificationByIdMiddleware>(
      CheckExistingNotificationByIdMiddleware,
    );

    mockPrismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when the notification exists', () => {
    const mockNotification = {} as any;

    beforeEach(async () => {
      jest
        .spyOn(mockPrismaService.notification, 'findUnique')
        .mockResolvedValueOnce(mockNotification);

      await middleware.use(mockRequest, mockResponse, mockNextFunction);
    });

    it('should set the notification on the request object', () => {
      expect(mockRequest.notification).toEqual(mockNotification);
    });

    it('should call next', () => {
      expect(mockNextFunction).toHaveBeenCalled();
    });

    it('should not send a response', () => {
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.send).not.toHaveBeenCalled();
    });
  });

  describe('when the notification does not exist', () => {
    beforeEach(async () => {
      jest
        .spyOn(mockPrismaService.notification, 'findUnique')
        .mockResolvedValueOnce(null);

      await middleware.use(mockRequest, mockResponse, mockNextFunction);
    });

    it('should not set the notification on the request object', () => {
      expect(mockRequest.notification).toBeUndefined();
    });

    it('should not call next', () => {
      expect(mockNextFunction).not.toHaveBeenCalled();
    });

    it('should send a 404 response', () => {
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.send).toHaveBeenCalledWith({
        message: 'Could not find notification with provided ID',
      });
    });
  });
});
