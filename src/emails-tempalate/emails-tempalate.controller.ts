import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MessageService } from 'src/message/message.service';
import { ResponseService } from 'src/response/response.service';
import { EmailsTempalateService } from './emails-tempalate.service';
import {
  EmailTemplateDTO,
  TemplatesFilter,
} from './validation/email-template.dto';

@Controller('api/v1/emails-tempalate')
export class EmailsTempalateController {
  constructor(
    private readonly emailsTempalateService: EmailsTempalateService,
    private readonly messageService: MessageService,
    private readonly responseService: ResponseService,
  ) {}

  @Post()
  async create(@Body() data: EmailTemplateDTO) {
    const createNew = await this.emailsTempalateService.createTemplate(data);

    return createNew;
  }

  @Put(':/id')
  async update(@Body() data: EmailTemplateDTO, @Param() id: string) {
    const update = await this.emailsTempalateService.updateTemplate(id, data);

    return update;
  }

  @Delete('/:id')
  async delete(@Param() id: string) {
    const deleted = await this.emailsTempalateService.deleteTemplate(id);

    return deleted;
  }

  @Get()
  async findAll(@Query() data: TemplatesFilter) {
    const getAll = await this.emailsTempalateService.getAll(data);

    return getAll;
  }

  @Get('/:id_temp')
  async getTempById(@Param() id: string) {
    const getAll = await this.emailsTempalateService.getById(id);

    return getAll;
  }

  @Get('/:apps_id')
  async getTempByAppsId(@Param() id: string) {
    const getAll = await this.emailsTempalateService.getByAppsId(id);

    return getAll;
  }
}
