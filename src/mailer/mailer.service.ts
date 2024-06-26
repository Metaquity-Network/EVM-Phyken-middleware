import { Injectable } from '@nestjs/common';
import fs from 'node:fs/promises';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import { AllConfigType } from 'src/config/config.types';

@Injectable()
export class MailerService {
  private readonly transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService<AllConfigType>) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.getOrThrow('mail.host', { infer: true }),
      port: this.configService.getOrThrow('mail.port', { infer: true }),
      ignoreTLS: this.configService.getOrThrow('mail.ignoreTLS', {
        infer: true,
      }),
      secure: this.configService.getOrThrow('mail.secure', { infer: true }),
      requireTLS: this.configService.getOrThrow('mail.requireTLS', {
        infer: true,
      }),
      auth: {
        user: this.configService.getOrThrow('mail.user', { infer: true }),
        pass: this.configService.getOrThrow('mail.password', { infer: true }),
      },
    });
  }

  async sendMail({
    templatePath,
    context,
    ...mailOptions
  }: nodemailer.SendMailOptions & {
    templatePath: string;
    context: Record<string, unknown>;
  }): Promise<void> {
    let html: string | undefined;

    if (templatePath) {
      const template = await fs.readFile(templatePath, 'utf-8');
      html = Handlebars.compile(template, {
        strict: true,
      })(context);
    }

    return await this.transporter.sendMail(
      {
        ...mailOptions,
        from: mailOptions.from,
        html: mailOptions.html ? mailOptions.html : html,
      },
      function (error) {
        if (error) {
          return console.log('Error in sending mail to ' + mailOptions.to);
        }
        console.log('Success set email to ' + mailOptions.to);
      },
    );
  }
}
