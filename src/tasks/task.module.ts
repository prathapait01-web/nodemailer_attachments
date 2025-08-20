import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [MailModule],
  providers: [TaskService],
})
export class TaskModule {}
