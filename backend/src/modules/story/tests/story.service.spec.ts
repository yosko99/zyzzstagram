/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NotificationService } from '../../../modules/notification/notification.service';
import { UserService } from '../../../modules/user/user.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { StoryService } from '../story.service';

import { createUserForStoryDto } from '../../../dto/mock/user.mock';

describe('test story API', () => {
  const prisma = new PrismaService();
  const storyService = new StoryService(prisma);
  const notificationService = new NotificationService(prisma);
  const userService = new UserService(prisma, notificationService);
  const filename = 'testimage.jpg';

  describe('test createStory service', () => {
    it('should create story successfully', async () => {
      const userForStory = await userService.createUser(
        createUserForStoryDto,
        filename,
      );

      const response = await storyService.createStory(filename, {
        username: createUserForStoryDto.username,
        password: createUserForStoryDto.password,
      });

      expect(response.message).toEqual('Story created successfully');
      expect(response.story).toBeTruthy();

      await userService.deleteUser(userForStory.user);
    });

    it('should return an error if input is invalid', async () => {
      await expect(
        // @ts-ignore
        storyService.createStory(),
      ).rejects.toThrow(TypeError);
    });
  });

  describe('test deleteStory service', () => {
    it('should delete story successfully', async () => {
      const userForStory = await userService.createUser(
        createUserForStoryDto,
        filename,
      );

      const createdStory = await storyService.createStory(filename, {
        username: createUserForStoryDto.username,
        password: createUserForStoryDto.password,
      });
      const response = await storyService.deleteStory(createdStory.story);

      expect(response.message).toEqual('Story deleted successfully');

      await userService.deleteUser(userForStory.user);
    });

    it('should return an error if input is invalid', async () => {
      await expect(
        // @ts-ignore
        storyService.deleteStory(),
      ).rejects.toThrow(TypeError);
    });
  });
});
