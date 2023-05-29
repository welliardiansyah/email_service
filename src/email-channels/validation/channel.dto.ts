import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ChannelNameEnums } from 'src/database/enums/channel-name.enum';

export class ChannelsDto {
  @IsString()
  @IsOptional()
  name: ChannelNameEnums;

  @IsString()
  @IsOptional()
  subject: string;

  @IsString()
  @IsOptional()
  text1: string;

  @IsString()
  @IsOptional()
  text2: string;

  @IsString()
  @IsOptional()
  text3: string;

  @IsString()
  @IsOptional()
  link: string;
}

export class ChannelsFilter {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit: number;

  @IsString()
  @IsOptional()
  search: string;
}
