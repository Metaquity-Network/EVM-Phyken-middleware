export interface MailData<T = never> {
  to: string;
  firstName: string;
  data: T;
}
