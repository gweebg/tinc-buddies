import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Config } from './configs.entity';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class ConfigsService {
  constructor(
    @InjectRepository(Config)
    private configsRepository: Repository<Config>,
    private accountsService: AccountsService,
  ) {}

  findAll(): Promise<Config[]> {
    return this.configsRepository.find();
  }

  findAllActivated(): Promise<Config[]> {
    return this.configsRepository.find({ where: { activated: true } });
  }

  findOne(id: number): Promise<Config | null> {
    return this.configsRepository.findOneBy({ id });
  }

  async getConfigsByUserId(userId: number): Promise<Config[]> {
    return this.configsRepository.find({ where: { user: { id: userId } } });
  }

  async remove(id: number): Promise<void> {
    await this.configsRepository.delete(id);
  }

  async update(id: number, config: Config): Promise<Config> {
    await this.configsRepository.update(id, config);
    return this.findOne(id);
  }

  async create(config: Config): Promise<Config> {
    return this.configsRepository.save(config);
  }

  async activate(id: number): Promise<Config> {
    const config = await this.findOne(id);
    config.activated = true;
    return this.configsRepository.save(config);
  }

  async deactivate(id: number): Promise<Config> {
    const config = await this.findOne(id);
    config.activated = false;
    return this.configsRepository.save(config);
  }

  async spentBudget(id: number, spent: number, bouth: number): Promise<Config> {
    const config = await this.findOne(id);
    config.budget -= spent
    config.aquired += bouth
    return this.configsRepository.save(config);
  }

  async releaseBudget(id: number, sold : number, earned: number): Promise<Config> {
    const config = await this.findOne(id);
    config.budget += earned
    config.aquired -= sold
    return this.configsRepository.save(config);
  }

  async withdraw(id: number, amount: number): Promise<Config> {
    const config = await this.findOne(id);
    config.budget -= amount
    this.accountsService.deposit(config.user.id, amount)
    return this.configsRepository.save(config);
  }

  async deposit(id: number, amount: number): Promise<Config> {
    const config = await this.findOne(id);
    config.budget += amount
    this.accountsService.withdraw(config.user.id, amount)
    return this.configsRepository.save(config);
  }
}