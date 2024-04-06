import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Config } from './configs.entity';

@Injectable()
export class ConfigsService {
  constructor(
    @InjectRepository(Config)
    private configsRepository: Repository<Config>,
  ) {}

  findAll(): Promise<Config[]> {
    return this.configsRepository.find();
  }

  findOne(id: number): Promise<Config | null> {
    return this.configsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.configsRepository.delete(id);
  }

  async create(config: Config): Promise<Config> {
    return this.configsRepository.save(config);
  }
}