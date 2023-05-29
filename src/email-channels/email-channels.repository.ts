import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelEmailEntities } from 'src/database/entities/channels-email.entity';
import { IListResponse } from 'src/database/interfaces/list-response.interface';
import { MessageService } from 'src/message/message.service';
import { RMessage } from 'src/response/response.interface';
import { ResponseService } from 'src/response/response.service';
import { Repository } from 'typeorm';
import { ChannelsDto, ChannelsFilter } from './validation/channel.dto';

@Injectable()
export class EmailChannelRepository {
  private LOG_CONTEXT = 'EmailChannelRepository';

  constructor(
    @InjectRepository(ChannelEmailEntities)
    private readonly emailChannelRepository: Repository<ChannelEmailEntities>,
    private readonly responseService: ResponseService,
    private readonly messageService: MessageService,
  ) {}

  logger = new Logger();

  async createNewChannel(data: ChannelsDto): Promise<any> {
    try {
      const saveChannel = await this.emailChannelRepository.save(data);

      return saveChannel;
    } catch (e) {
      Logger.error(e.message, this.LOG_CONTEXT);
      throw e;
    }
  }

  async updateChannel(id: string, data: ChannelsDto): Promise<any> {
    try {
      const updateChannel = await this.emailChannelRepository.update(id, data);

      return updateChannel;
    } catch (e) {
      Logger.error(e.message, this.LOG_CONTEXT);
      throw e;
    }
  }

  async deleteChannel(id: string) {
    try {
      const deleteChannel = await this.emailChannelRepository.softDelete(id);

      return deleteChannel;
    } catch (e) {
      Logger.error(e.message, this.LOG_CONTEXT);
      throw e;
    }
  }

  async getAllChannel(data: ChannelsFilter): Promise<IListResponse> {
    const currentPage = data.page || 1;
    const perPage = data.limit || 10;
    const search = data.search || null;
    try {
      const query = await this.emailChannelRepository.createQueryBuilder();

      if (search) {
        query.where('name LIKE :name', { name: search });
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
      const getByNames = await this.emailChannelRepository
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
      const getByNames = await this.emailChannelRepository
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
