import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '../mailer/mailer.service';
import * as ejs from 'ejs';
import * as path from 'path';
import { AllConfigType } from 'src/config/config.types';
import { MailData } from './interface/mail-data.interface';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  async verifyWaitlistEmail(
    mailData: MailData<{ hash: string }>,
  ): Promise<void> {
    const frontendDomain = this.configService.getOrThrow('app.frontendDomain', {
      infer: true,
    });
    const confirmationUrl = new URL(`${frontendDomain}/confirm-email`);
    confirmationUrl.searchParams.set('hash', mailData.data.hash);

    const workingDirectory =
      this.configService.getOrThrow('app.workingDirectory', {
        infer: true,
      }) || process.cwd();
    const templatePath = path.join(
      workingDirectory,
      'src',
      'mail',
      'mail-templates',
      'verification-email.ejs',
    );

    const html = await ejs.renderFile(templatePath, {
      user: { name: mailData.firstName },
      url: confirmationUrl.toString(),
    });

    return await this.mailerService.sendMail({
      to: mailData.to,
      subject: 'Phyken Network Email verification',
      html: html,
    });
  }
}
