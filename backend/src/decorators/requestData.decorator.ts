import { createParamDecorator, ExecutionContext } from '@nestjs/common';

type IPassedRequestData = 'user' | 'userDataFromToken' | 'post';

export const RequestData = createParamDecorator(
  (data: IPassedRequestData, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request[data];
  },
);
