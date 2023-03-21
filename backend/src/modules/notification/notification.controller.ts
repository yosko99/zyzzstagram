import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { NotificationService } from './notification.service';

import { RequestData } from '../../decorators/requestData.decorator';

import INotification from '../../interfaces/INotification';
import IToken from '../../interfaces/IToken';

import {
  CreateCommentNotificationDto,
  CreateLikeNotificationDto,
} from '../../dto/notification.dto';

@Controller('/notifications')
@ApiTags('Notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('/like')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Create like notification' })
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiResponse({ status: 201, description: 'Notification created' })
  @ApiResponse({ status: 400, description: 'Invalid/missing fields' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 498, description: 'Provided invalid token' })
  createPostNotification(
    @Body() createLikeNotificationDto: CreateLikeNotificationDto,
    @RequestData('userDataFromToken') tokenData: IToken,
  ) {
    return this.notificationService.createLikeNotification(
      createLikeNotificationDto,
      tokenData,
    );
  }

  @Post('/comment')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Create comment notification' })
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiResponse({ status: 201, description: 'Notification created' })
  @ApiResponse({ status: 400, description: 'Invalid/missing fields' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 498, description: 'Provided invalid token' })
  createCommentNotification(
    @Body() createCommentNotificationDto: CreateCommentNotificationDto,
    @RequestData('userDataFromToken') tokenData: IToken,
  ) {
    return this.notificationService.createCommentNotification(
      createCommentNotificationDto,
      tokenData,
    );
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete notification by id' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'Notification deleted' })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  deleteNotification(@RequestData('notification') notification: INotification) {
    return this.notificationService.deleteNotification(notification);
  }
}
