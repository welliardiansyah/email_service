import { IsEmail, IsString } from 'class-validator';

export class SendEmailValidation {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  subject: string;

  @IsString()
  message: string;

  name: string;
}
