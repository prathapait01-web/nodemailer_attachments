import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailService } from './mail.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'mail',
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
