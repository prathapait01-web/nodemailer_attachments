import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MailService } from '../mail/mail.service';

@Injectable()
export class TaskService {
  constructor(private mailService: MailService) {}

  @Cron('*/10 * * * * *') // every 10 sec
  handleCron() {
    console.log('Cron running...');
    this.mailService.sendMailQueue(
      'test@example.com',
      'Cron Mail',
      'This mail is sent from cron every 10 sec'
    );
  }
}
