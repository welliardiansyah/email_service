import {
  ConflictException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { MessageService } from 'src/message/message.service';
import { ResponseService } from 'src/response/response.service';
import { EmailChannelRepository } from './email-channels.repository';
import { ChannelsDto, ChannelsFilter } from './validation/channel.dto';

@Injectable()
export class EmailChannelsService {
  private LOG_CONTEXT = 'EmailChannelsService';

  constructor(
    private readonly messgaeService: MessageService,
    private readonly responseService: ResponseService,
    private readonly channelEmailRepository: EmailChannelRepository,
  ) {}

  logger = new Logger();

  async create(data: ChannelsDto): Promise<any> {
    const isExists = await this.channelEmailRepository.getByName(data.subject);

    if (isExists) {
      throw new ConflictException(
        this.responseService.error(
          HttpStatus.CONFLICT,
          {
            value: data.subject,
            property: data.subject,
            constraint: [
              `Nama subject ${data.subject} yang anda pakai sudah terdaftar!`,
            ],
          },
          'Subject Name Already Exists',
        ),
      );
    }

    try {
      const createNew = this.channelEmailRepository.createNewChannel(data);

      return this.responseService.success(
        true,
        `Create new channel subject ${data.subject} successfully!.`,
        createNew,
      );
    } catch (e) {
      Logger.error(e.message, this.LOG_CONTEXT);
      throw e;
    }
  }

  async findAll(data: ChannelsFilter): Promise<any> {
    try {
      const searchAll = this.channelEmailRepository.getAllChannel(data);

      return this.responseService.success(
        true,
        `Getting all data successfully!.`,
        searchAll,
      );
    } catch (e) {
      Logger.error(e.message, this.LOG_CONTEXT);
      throw e;
    }
  }

  async findOne(id: string) {
    try {
      const findOne = this.channelEmailRepository.getById(id);

      return this.responseService.success(
        true,
        `Getting channel data id ${id} successfully!.`,
        findOne,
      );
    } catch (e) {
      Logger.error(e.message, this.LOG_CONTEXT);
      throw e;
    }
  }

  async update(id: string, data: ChannelsDto): Promise<any> {
    try {
      const updateChannel = this.channelEmailRepository.updateChannel(id, data);

      return this.responseService.success(
        true,
        `Updated channel data ${data.subject} successfully!.`,
        updateChannel,
      );
    } catch (e) {
      Logger.error(e.message, this.LOG_CONTEXT);
      throw e;
    }
  }

  async remove(id: string) {
    try {
      const removeChannel = this.channelEmailRepository.deleteChannel(id);

      return this.responseService.success(
        true,
        `Deleted channel data ${id} successfully!.`,
        removeChannel,
      );
    } catch (e) {
      Logger.error(e.message, this.LOG_CONTEXT);
      throw e;
    }
  }
}
