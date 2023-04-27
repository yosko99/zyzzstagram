import { Test, TestingModule } from '@nestjs/testing';

import { NotificationService } from '../../../modules/notification/notification.service';
import { UserService } from '../../../modules/user/user.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { TasksService } from '../tasks.service';

import { createUserForTasksDto } from '../../../dto/mock/user.mock';

describe('test TasksService', () => {
  let prisma: PrismaService;
  let tasksService: TasksService;
  let userService: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        PrismaService,
        UserService,
        NotificationService,
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    prisma = module.get<PrismaService>(PrismaService);
    userService = module.get<UserService>(UserService);
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
