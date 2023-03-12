import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import mkdirp from 'mkdirp';

@Injectable()
export class CheckIfUploadsFolderExistsMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    mkdirp.sync('./uploads');

    next();
  }
}
