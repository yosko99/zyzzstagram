import { Controller, Delete, Get, Inject, Put } from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { NotificationServiceImpl } from './notification.service.impl';

import { RequestData } from '../../decorators/requestData.decorator';

import INotification from '../../interfaces/INotification';
import IToken from '../../interfaces/IToken';

import { NotificationService } from './notification.service';

@Controller('/notifications')
@ApiTags('Notifications')
export class NotificationController {
  constructor(
    @Inject(NotificationService)
    private readonly notificationService: NotificationServiceImpl,
  ) {}

  @Get()
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiOperation({ summary: 'Get current user notifications' })
  @ApiResponse({ status: 200, description: 'Receive notifications' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 498, description: 'Provided invalid token' })
  getAllPosts(@RequestData('userDataFromToken') tokenData: IToken) {
    return this.notificationService.getCurrentUserNotifications(tokenData);
  }

  @Put('/read')
  @ApiOperation({ summary: 'Mark user notifications as read' })
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiResponse({ status: 200, description: 'Notifications marked as read' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 498, description: 'Provided invalid token' })
  markNotificationsAsRead(@RequestData('userDataFromToken') tokenData: IToken) {
    return this.notificationService.markNotificationsAsRead(tokenData);
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
