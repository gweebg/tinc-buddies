import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Config } from './configs.entity';
import { AccountsService } from 'src/accounts/accounts.service';
import { TransactionsService } from 'src/transactions/transactions.service';
import { TransactionType } from 'src/transactions/transactions.enum';

@Injectable()
export class ConfigsService {
  constructor(
    @InjectRepository(Config)
    private configsRepository: Repository<Config>,
    @Inject(forwardRef(() => AccountsService))
    private accountsService: AccountsService,
    @Inject(forwardRef(() => TransactionsService))
    private transactionsService: TransactionsService,
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
    if (config.budget < spent) {
      throw new Error('Not enough budget');
    }
    config.budget -= spent;
    config.acquired += bouth;
    return this.configsRepository.save(config);
  }

  async releaseBudget(
    id: number,
    sold: number,
    earned: number,
  ): Promise<Config> {
    const config = await this.findOne(id);
    if (config.acquired < sold) {
      throw new Error('Not enough acquired');
    }
    config.budget += earned;
    config.acquired -= sold;
    return this.configsRepository.save(config);
  }

  async withdraw(id: number, amount: number): Promise<Config> {
    const config = await this.findOne(id);
    config.budget -= amount;
    this.accountsService.deposit(config.user.id, amount);
    return this.configsRepository.save(config);
  }

  async deposit(id: number, amount: number): Promise<Config> {
    const config = await this.findOne(id);
    config.budget += amount;
    this.accountsService.withdraw(config.user.id, amount);
    return this.configsRepository.save(config);
  }

  async getStats(id: number): Promise<any> {
    const transactions = await this.transactionsService.getTransactionsByConfigId(id);
    const stats = {
      profit: 0,
      numberTransactions: transactions.length,
      totalBought: 0,
      totalSold: 0,
    };

    transactions.forEach((transaction) => {
      if (transaction.type === TransactionType.BUY) {
        stats.totalBought += transaction.inputAmount;
        stats.profit -= transaction.inputAmount;
      } else {
        stats.totalSold += transaction.outputAmount;
        stats.profit += transaction.inputAmount;
      }
    });
    return stats;
  }
}
