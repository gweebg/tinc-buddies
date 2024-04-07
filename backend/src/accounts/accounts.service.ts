import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './accounts.entity';
import { TransactionsService } from 'src/transactions/transactions.service';
import { TransactionType } from 'src/transactions/transactions.enum';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private transactionsService: TransactionsService,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async deposit(userId: number, ammount: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    user.balance += ammount;
    return this.usersRepository.save(user);
  }

  async withdraw(userId: number, ammount: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    user.balance -= ammount;
    return this.usersRepository.save(user);
  }

  async getStats(userId: number): Promise<any> {
    const transactions = await this.transactionsService.getTransactionsByUserId(userId);
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
