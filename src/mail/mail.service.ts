import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class MailService {
  constructor(@InjectQueue('mail') private mailQueue: Queue) {}

  async sendMailQueue(to: string, subject: string, text: string) {
    await this.mailQueue.add('send-mail', { to, subject, text });
  }

  async sendMailWithAttachmentQueue(
    to: string,
    subject: string,
    text: string,
    filePath: string,
  ) {
    await this.mailQueue.add('send-mail-attachment', { to, subject, text, filePath });
  }

  // nodemailer actual sending
  async sendMail({ to, subject, text, filePath }: any) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions: any = { from: process.env.MAIL_USER, to, subject, text };
    if (filePath) mailOptions.attachments = [{ path: filePath }];

    await transporter.sendMail(mailOptions);
  }
}
