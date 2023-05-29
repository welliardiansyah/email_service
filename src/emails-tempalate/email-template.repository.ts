import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TemplateEmailEntities } from 'src/database/entities/template-email.entity';
import { MessageService } from 'src/message/message.service';
import { IListResponse, RMessage } from 'src/response/response.interface';
import { ResponseService } from 'src/response/response.service';
import { Repository } from 'typeorm';
import {
  EmailTemplateDTO,
  TemplatesFilter,
} from './validation/email-template.dto';

@Injectable()
export class TempalteEmailsRepositroy {
  private LOG_CONTEXT = 'TempalteEmailRepositroy';

  constructor(
    @InjectRepository(TemplateEmailEntities)
    private readonly tempalteEmailRepository: Repository<TemplateEmailEntities>,
    private readonly responseService: ResponseService,
  ) {}

  logger = new Logger();

  async createTemplate(data: EmailTemplateDTO): Promise<any> {
    try {
      const createTemplate = await this.tempalteEmailRepository.save(data);

      return this.responseService.success(
        true,
        `Created new Template email successfully!.`,
        createTemplate,
      );
    } catch (e) {
      Logger.error(e.message, this.LOG_CONTEXT);
      throw e;
    }
  }

  async updateTemplate(id: string, data: EmailTemplateDTO): Promise<any> {
    try {
      const updateTemplate = await this.tempalteEmailRepository.update(
        id,
        data,
      );

      return updateTemplate;
    } catch (e) {
      Logger.error(e.message, this.LOG_CONTEXT);
      throw e;
    }
  }

  async deleteTemplate(id: string) {
    try {
      const deletedTemplate = await this.tempalteEmailRepository.softDelete(id);

      return deletedTemplate;
    } catch (e) {
      Logger.error(e.message, this.LOG_CONTEXT);
      throw e;
    }
  }

  async getAllTemplate(data: TemplatesFilter): Promise<IListResponse> {
    const currentPage = data.page || 1;
    const perPage = data.limit || 10;
    const search = data.search || null;
    const status = data.status || null;

    try {
      const query = await this.tempalteEmailRepository.createQueryBuilder();

      if (search) {
        query.where('name LIKE :name', { name: search });
      }

      if (status) {
        query.andWhere('status =:status', { status: status });
      }

      const queryCount = query;
      const count = await queryCount.getCount();
      const queryItems = query;

      queryItems.skip((currentPage - 1) * perPage).take(perPage);

      const items = await queryItems.getMany();

      if (!items) {
        const errors: RMessage = {
          value: '',
          property: '',
          constraint: ['Channel name tidak di temikan!.'],
        };
        throw new BadRequestException(
          this.responseService.error(
            HttpStatus.BAD_REQUEST,
            errors,
            'Bad Request',
          ),
        );
      }

      return {
        total_item: count,
        limit: perPage,
        current_page: currentPage,
        items: items,
      };
    } catch (e) {
      Logger.error(e.message, this.LOG_CONTEXT);
      throw e;
    }
  }

  async getByName(data: string) {
    try {
      const getByNames = await this.tempalteEmailRepository
        .createQueryBuilder()
        .where('name LIKE :name', { name: data })
        .getOne();

      return getByNames;
    } catch (e) {
      Logger.error(e.message, this.LOG_CONTEXT);
      throw e;
    }
  }

  async getById(id: string) {
    try {
      const ids = Object.values(id).shift();
      const getByNames = await this.tempalteEmailRepository
        .createQueryBuilder()
        .where('id =:id', { id: ids })
        .getOne();

      return getByNames;
    } catch (e) {
      Logger.error(e.message, this.LOG_CONTEXT);
      throw e;
    }
  }

  async getChannelsById(id: string) {
    try {
      const ids = Object.values(id).shift();
      const getChannelsById = await this.tempalteEmailRepository
        .createQueryBuilder('tmp')
        .leftJoinAndSelect('tmp.channels', 'channels')
        .where('tmp.id =:id', { id: ids })
        .getOne();

      return getChannelsById;
    } catch (e) {
      Logger.error(e.message, this.LOG_CONTEXT);
      throw e;
    }
  }

  async getIdByAppId(apps_id: string) {
    try {
      const ids = Object.values(apps_id).shift();
      const getByNames = await this.tempalteEmailRepository
        .createQueryBuilder()
        .where('id =:id', { id: ids })
        .getOne();

      return getByNames;
    } catch (e) {
      Logger.error(e.message, this.LOG_CONTEXT);
      throw e;
    }
  }
}
