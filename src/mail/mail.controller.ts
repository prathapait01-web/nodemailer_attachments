import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendMail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('text') text: string,
  ) {
    return this.mailService.sendMail(to, subject, text);
  }

  @Post('send-attachment')
  @UseInterceptors(FileInterceptor('file'))
  async sendMailWithAttachment(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('text') text: string,
    @UploadedFile() file?: Express.Multer.File, 
  ) {
    if (!file) {
      throw new Error('File not provided');
    }
    return this.mailService.sendMailWithAttachment(to, subject, text, file);
  }
}
