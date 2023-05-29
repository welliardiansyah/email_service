import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EmailChannelsService } from './email-channels.service';
import { ChannelsDto, ChannelsFilter } from './validation/channel.dto';

@Controller('email-channels')
export class EmailChannelsController {
  constructor(private readonly emailChannelsService: EmailChannelsService) {}

  @Post()
  create(@Body() data: ChannelsDto) {
    return this.emailChannelsService.create(data);
  }

  @Get()
  findAll(@Query() data: ChannelsFilter) {
    return this.emailChannelsService.findAll(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emailChannelsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: ChannelsDto) {
    return this.emailChannelsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emailChannelsService.remove(id);
  }
}
