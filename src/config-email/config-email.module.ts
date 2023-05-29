import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigEmailService } from './config-email.service';

@Module({
  imports: [ConfigModule],
  providers: [ConfigEmailService],
  exports: [ConfigEmailService],
})
export class ConfigEmailModule {}
