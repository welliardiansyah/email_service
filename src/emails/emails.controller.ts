import { Body, Controller, Post } from '@nestjs/common';
import { EmailsService } from './emails.service';

@Controller('api/v1/emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @Post()
  create(@Body() data: any): Promise<any> {
    return this.emailsService.sendEmail(data);
  }
}
