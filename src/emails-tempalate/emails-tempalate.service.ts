import {
  ConflictException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { MessageService } from 'src/message/message.service';
import { ResponseService } from 'src/response/response.service';
import { TempalteEmailsRepositroy } from './email-template.repository';
import {
  EmailTemplateDTO,
  TemplatesFilter,
} from './validation/email-template.dto';

@Injectable()
export class EmailsTempalateService {
  private LOG_CONTEXT = 'EmailChannelsService';

  constructor(
    private readonly templateRepository: TempalteEmailsRepositroy,
    private readonly responseService: ResponseService,
    private readonly messageService: MessageService,
  ) {}

  loger = new Logger();

  async createTemplate(data: EmailTemplateDTO): Promise<any> {
    const isExists = await this.templateRepository.getByName(data.name);

    if (isExists) {
      throw new ConflictException(
        this.responseService.error(
          HttpStatus.CONFLICT,
          {
            value: data.name,
            property: data.name,
            constraint: [
              `Nama template email ${data.name} yang anda pakai sudah terdaftar!`,
            ],
          },
          'Templates Name Already Exists',
        ),
      );
    }

    try {
      const createNew = await this.templateRepository.createTemplate(data);

      return this.responseService.success(
        true,
        `Created new data tempalte name ${data.name} successfully!.`,
        createNew,
      );
    } catch (e) {
      Logger.error(e.message, this.LOG_CONTEXT);
      throw e;
    }
  }

  async updateTemplate(id: string, data: EmailTemplateDTO): Promise<any> {
    const checkId = await this.templateRepository.getById(id);

    if (!checkId) {
      throw new ConflictException(
        this.responseService.error(
          HttpStatus.CONFLICT,
          {
            value: id,
            property: id,
            constraint: [`Data id ${id} tidak dapat di temukan!.`],
          },
          'Subject Name Already Exists',
        ),
      );
    }

    try {
      const updatedTemplate = await this.templateRepository.updateTemplate(
        id,
        data,
      );

      return this.responseService.success(
        true,
        `Updated data template name ${data.name} successfully!.`,
        updatedTemplate,
      );
    } catch (e) {
      Logger.error(e.message, this.LOG_CONTEXT);
      throw e;
    }
  }

  async deleteTemplate(id: string) {
    try {
      const deleteTemplate = await this.templateRepository.deleteTemplate(id);

      return this.responseService.success(
        true,
        `Deleted template data successfully!.`,
        deleteTemplate,
      );
    } catch (e) {
      Logger.error(e.message, this.LOG_CONTEXT);
      throw e;
    }
  }

  async getAll(data: TemplatesFilter): Promise<any> {
    try {
      const listTemplate = await this.templateRepository.getAllTemplate(data);

      return this.responseService.success(
        true,
        `Get all data template successfully!.`,
        listTemplate,
      );
    } catch (e) {
      Logger.error(e.message, this.LOG_CONTEXT);
      throw e;
    }
  }

  async getById(id: string) {
    try {
      const getIds = await this.templateRepository.getById(id);

      return this.responseService.success(
        true,
        `Getting tempalte ${id} successfully!.`,
        getIds,
      );
    } catch (e) {
      Logger.error(e.message, this.LOG_CONTEXT);
      throw e;
    }
  }

  async getByAppsId(id: string) {
    try {
      const getIds = await this.templateRepository.getIdByAppId(id);

      return this.responseService.success(
        true,
        `Getting tempalte ${id} successfully!.`,
        getIds,
      );
    } catch (e) {
      Logger.error(e.message, this.LOG_CONTEXT);
      throw e;
    }
  }
}
