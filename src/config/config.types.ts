import { MailConfig } from 'src/mail/config/mail-config.types';
import { AppConfig } from './app-config.types';

export type AllConfigType = {
  app: AppConfig;
  mail: MailConfig;
};
