import { Module } from '@nestjs/common';
import { EmailChannelsService } from './email-channels.service';
import { EmailChannelsController } from './email-channels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelEmailEntities } from 'src/database/entities/channels-email.entity';
import { TemplateEmailEntities } from 'src/database/entities/template-email.entity';
import { MessageService } from 'src/message/message.service';
import { ResponseService } from 'src/response/response.service';
import { EmailChannelRepository } from './email-channels.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChannelEmailEntities, TemplateEmailEntities]),
  ],
  controllers: [EmailChannelsController],
  providers: [
    EmailChannelsService,
    MessageService,
    ResponseService,
    EmailChannelRepository,
  ],
})
export class EmailChannelsModule {}
