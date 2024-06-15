import { AppConfig } from './app-config.type';
import { FileConfig } from '../files/config/file-config.type';

export type AllConfigType = {
  app: AppConfig;
  file: FileConfig;
};
