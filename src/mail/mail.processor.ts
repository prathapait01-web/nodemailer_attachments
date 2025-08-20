import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import * as nodemailer from 'nodemailer';

@Processor('mail-queue')
export class MailProcessor {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'YOUR_EMAIL@gmail.com',
      pass: 'YOUR_APP_PASSWORD', // Gmail app password
    },
  });

  // Simple mail
  @Process('send-mail')
  async handleSendMail(job: Job) {
    const { to, subject, text } = job.data;
    await this.transporter.sendMail({ from: 'YOUR_EMAIL@gmail.com', to, subject, text });
  }

  // Mail with attachment
  @Process('send-mail-attachment')
  async handleSendMailAttachment(job: Job) {
    const { to, subject, text, filePath } = job.data;
    await this.transporter.sendMail({
      from: 'YOUR_EMAIL@gmail.com',
      to,
      subject,
      text,
      attachments: [{ path: filePath }],
    });
  }
}
