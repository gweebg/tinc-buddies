import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ConfigsService } from './configs.service';
import { Config } from './configs.entity';

@Controller('configs')
export class ConfigsController {
  constructor(private readonly configsService: ConfigsService) {}

  @Post()
  create(@Body() configData: Config): Promise<Config> {
    return this.configsService.create(configData);
  }

  @Get()
  findAll(): Promise<Config[]> {
    return this.configsService.findAllActivated();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Config> {
    return this.configsService.findOne(+id);
  }

  @Get('user/:userId')
  getConfigsByUserId(@Param('userId') userId: string): Promise<Config[]> {
    return this.configsService.getConfigsByUserId(+userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() configData: Config): Promise<Config> {
    return this.configsService.update(+id, configData);
  }

  @Put('activate/:id')
  activate(@Param('id') id: string): Promise<Config> {
    return this.configsService.activate(+id);
  }

  @Put('deactivate/:id')
  deactivate(@Param('id') id: string): Promise<Config> {
    return this.configsService.deactivate(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.configsService.remove(+id);
  }
}
