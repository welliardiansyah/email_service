import { Injectable, Logger } from '@nestjs/common';
import { MessageService } from 'src/message/message.service';
import { ResponseService } from 'src/response/response.service';
import { ConfigEmailService } from 'src/config-email/config-email.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOtpEmailHistoryEntities } from 'src/database/entities/create-otp.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmailsService {
  constructor(
    @InjectRepository(CreateOtpEmailHistoryEntities)
    private readonly createOtpEmailRepository: Repository<CreateOtpEmailHistoryEntities>,
    private readonly responseService: ResponseService,
    private readonly messageService: MessageService,
    private readonly configEmailService: ConfigEmailService,
  ) {}

  async sendEmail(data: Record<string, any>): Promise<any> {
    const logger = new Logger();

    logger.log(data.subject, 'Createctl Sending Mail');
    const rdata: Record<string, any> = {
      email: data.subject,
    };

    try {
      // biarkan tanpa await karena dilakukan secara asynchronous
      this.configEmailService.sendMail({
        from: '"VNT NETWORK" <development@inovatif78.com>',
        to: data.email,
        subject: data.subject,
        html: data.message,
      });

      return this.responseService.success(
        true,
        this.messageService.get('api.create.success'),
        rdata,
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
