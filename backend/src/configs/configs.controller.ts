import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ConfigsService } from './configs.service';
import { Config } from './configs.entity';

@Controller('configs')
export class ConfigsController {
  constructor(private readonly configsService: ConfigsService) {}

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Config> {
    return this.configsService.findOne(+id);
  }

  @Post()
  create(@Body() configData: Config): Promise<Config> {
    return this.configsService.create(configData);
  }
}
