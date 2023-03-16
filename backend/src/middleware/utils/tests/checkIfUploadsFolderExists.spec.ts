import { CheckIfUploadsFolderExistsMiddleware } from '../checkIfUploadsFolderExists.middleware';
import { Request, Response } from 'express';
import * as fs from 'fs';

describe('test CheckIfUploadsFolderExists middleware', () => {
  let middleware: CheckIfUploadsFolderExistsMiddleware;

  beforeEach(() => {
    middleware = new CheckIfUploadsFolderExistsMiddleware();
  });

  describe('use', () => {
    it('should create the uploads folder if it does not exist', async () => {
      const req = {} as Request;
      const res = {} as Response;
      const next = jest.fn();

      await middleware.use(req, res, next);

      expect(fs.existsSync('./uploads')).toBe(true);
    });

    it('should call the next function', async () => {
      const req = {} as Request;
      const res = {} as Response;
      const next = jest.fn();

      await middleware.use(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
