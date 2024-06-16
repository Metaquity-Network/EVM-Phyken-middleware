import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from 'src/mailer/mailer.module';
import { MailService } from './mail.service';
import appConfig from 'src/config/app.config';
import mailConfig from './config/mail.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [appConfig, mailConfig],
    }),
    MailerModule,
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
