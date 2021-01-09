export type MailConfiguration = {
  from: string;
  to: string;
  subject: string;
  rawText: string;
  html: string;
  attachment: Buffer;
};
