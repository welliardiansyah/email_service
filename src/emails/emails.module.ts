import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { EmailsController } from './emails.controller';
import { ResponseService } from 'src/response/response.service';
import { MessageService } from 'src/message/message.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigEmailService } from 'src/config-email/config-email.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateOtpEmailHistoryEntities } from 'src/database/entities/create-otp.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([CreateOtpEmailHistoryEntities]),
  ],
  controllers: [EmailsController],
  providers: [
    EmailsService,
    ResponseService,
    MessageService,
    ConfigEmailService,
  ],
})
export class EmailsModule {}
