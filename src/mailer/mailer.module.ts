import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { ConfigModule } from '@nestjs/config';
import mailConfig from 'src/mail/config/mail.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [mailConfig],
    }),
  ],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
