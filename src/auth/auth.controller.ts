import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MailService } from '../mail/mail.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private mailService: MailService,
  ) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.authService.register(email, password);

    // 🚀 send mail via queue
    await this.mailService.sendMailQueue(
      user.email,
      'Welcome 🎉',
      `Hello ${user.email}, thanks for registering!`,
    );

    return user;
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.login(email, password);
  }
}
