import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database/database.service';
import { EmailsModule } from './emails/emails.module';
import { EmailsTempalateModule } from './emails-tempalate/emails-tempalate.module';
import { ConfigEmailModule } from './config-email/config-email.module';
import { EmailChannelsModule } from './email-channels/email-channels.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
    }),
    EmailsModule,
    EmailsTempalateModule,
    ConfigEmailModule,
    EmailChannelsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
