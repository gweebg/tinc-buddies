import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigsService } from 'src/configs/configs.service';
import { Repository } from 'typeorm';
import { Transaction } from './transactions.entity';
import { TransactionType } from 'src/transactions/transactions.enum';
import { GlobalService } from 'src/utils/global.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    private configService: ConfigsService,
  ) {}

  findAll(): Promise<Transaction[]> {
    return this.transactionsRepository.find();
  }

  findOne(id: number): Promise<Transaction | null> {
    return this.transactionsRepository.findOneBy({ id });
  }

  async create(transaction: Transaction): Promise<Transaction> {
    transaction.outputAmount = Number(
      (
        transaction.inputAmount / Number(GlobalService.getBTCPrice().bid)
      ).toFixed(8),
    );
    transaction.date = new Date();

    this.configService.findOne(transaction.config.id).then((config) => {
      transaction.type === TransactionType.BUY
        ? this.configService.spentBudget(
            config.id,
            transaction.inputAmount,
            transaction.outputAmount,
          )
        : this.configService.releaseBudget(
            config.id,
            transaction.inputAmount,
            transaction.outputAmount,
          );
    });
    return this.transactionsRepository.save(transaction);
  }

  async getTransactionsByUserId(userId: number): Promise<Transaction[]> {
    return this.transactionsRepository.find({
      where: { user: { id: userId } },
    });
  }

  async getTransactionsByConfigId(configId: number): Promise<Transaction[]> {
    return this.transactionsRepository.find({
      where: { config: { id: configId } },
    });
  }
}
