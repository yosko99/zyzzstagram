/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NotificationServiceImpl } from '../../notification/notification.service.impl';
import { UserServiceImpl } from '../../user/user.service.impl';
import { PrismaService } from '../../../prisma/prisma.service';
import { StoryServiceImpl } from '../story.service.impl';

import { createUserForStoryDto } from '../../../dto/mock/user.mock';

describe('test story API', () => {
  const prisma = new PrismaService();
  const notificationService = new NotificationServiceImpl(prisma);
  const storyService = new StoryServiceImpl(prisma, notificationService);
  const userService = new UserServiceImpl(prisma, notificationService);
  const filename = 'testimage.jpg';

  describe('test createStory service', () => {
    it('should create story successfully', async () => {
      const userForStory = await userService.createUser(createUserForStoryDto);

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
      const userForStory = await userService.createUser(createUserForStoryDto);

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

  describe('test getStories service', () => {
    it('should get array of all stories', async () => {
      const response = await storyService.getStories({
        username: 'test',
        password: 'test',
      });

      expect(response).toEqual(expect.any(Array));
    });

    it('should get following users stories', async () => {
      const userForStory = await userService.createUser(createUserForStoryDto);

      const response = await storyService.getStories(
        {
          username: createUserForStoryDto.username,
          password: 'test',
        },
        'following',
      );

      expect(response).toEqual(expect.any(Array));

      await userService.deleteUser(userForStory.user);
    });
  });

  describe('test likeStory service', () => {
    it('should successfully like a story', async () => {
      const userForStory = await userService.createUser(createUserForStoryDto);

      const createdStory = await storyService.createStory(filename, {
        username: createUserForStoryDto.username,
        password: createUserForStoryDto.password,
      });

      const response = await storyService.likeStory(createdStory.story, {
        username: createUserForStoryDto.username,
        password: 'test',
      });

      expect(response.message).toBe('Liked story');

      await userService.deleteUser(userForStory.user);
    });
  });
});
