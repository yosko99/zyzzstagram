import { ScheduleModule } from '@nestjs/schedule';
import { Module } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { TasksService } from './tasks.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [TasksService, PrismaService],
  exports: [TasksService],
})
export class TasksModule {}
