import { Test, TestingModule } from '@nestjs/testing';

import { NotificationServiceImpl } from '../../notification/notification.service.impl';
import { UserServiceImpl } from '../../user/user.service.impl';
import { PrismaService } from '../../../prisma/prisma.service';
import { TasksServiceImpl } from '../task.service.impl';

import { createUserForTasksDto } from '../../../dto/mock/user.mock';

describe('test TasksService', () => {
  let prisma: PrismaService;
  let tasksService: TasksServiceImpl;
  let userService: UserServiceImpl;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksServiceImpl,
        PrismaService,
        UserServiceImpl,
        NotificationServiceImpl,
      ],
    }).compile();

    tasksService = module.get<TasksServiceImpl>(TasksServiceImpl);
    prisma = module.get<PrismaService>(PrismaService);
    userService = module.get<UserServiceImpl>(UserServiceImpl);
  });

  it('should delete old stories correctly', async () => {
    const now = new Date();
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);

    const { user: userForTasks } = await userService.createUser(
      createUserForTasksDto,
    );

    await prisma.story.createMany({
      data: [
        {
          imageURL: 'old-image-url',
          createdAt: twoDaysAgo,
          userId: userForTasks.id,
        },
        {
          imageURL: 'new-image-url',
          createdAt: now,
          userId: userForTasks.id,
        },
      ],
    });

    await tasksService.cleanOldStories();

    const { stories } = await prisma.user.findUnique({
      where: { username: userForTasks.username },
      select: { stories: { select: { imageURL: true } } },
    });

    expect(stories).toHaveLength(1);
    expect(stories[0].imageURL).toEqual('new-image-url');

    await userService.deleteUser(userForTasks);
  });
});
