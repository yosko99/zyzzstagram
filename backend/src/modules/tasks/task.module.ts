import { ScheduleModule } from '@nestjs/schedule';
import { Module } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { TasksServiceImpl } from './task.service.impl';
import { TaskService } from './task.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [
    {
      provide: TaskService,
      useClass: TasksServiceImpl,
    },
    PrismaService,
  ],
})
export class TaskModule {}
