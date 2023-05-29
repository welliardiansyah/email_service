import { Module } from '@nestjs/common';
import { EmailsTempalateService } from './emails-tempalate.service';
import { EmailsTempalateController } from './emails-tempalate.controller';
import { TemplateEmailEntities } from 'src/database/entities/template-email.entity';
import { ChannelEmailEntities } from 'src/database/entities/channels-email.entity';
import { ResponseService } from 'src/response/response.service';
import { MessageService } from 'src/message/message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TempalteEmailsRepositroy } from './email-template.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TemplateEmailEntities, ChannelEmailEntities]),
  ],
  controllers: [EmailsTempalateController],
  providers: [
    EmailsTempalateService,
    ResponseService,
    MessageService,
    TempalteEmailsRepositroy,
  ],
})
export class EmailsTempalateModule {}
