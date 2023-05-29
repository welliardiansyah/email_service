import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { TemplateEmailStatus } from 'src/database/enums/template-status.enum';

export class EmailTemplateDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  status: TemplateEmailStatus;

  @IsString()
  @IsOptional()
  html_code: string;

  channles: any;
}

export class TemplatesFilter {
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

  @IsString()
  @IsOptional()
  status: TemplateEmailStatus;
}
