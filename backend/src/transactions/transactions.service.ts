import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transactions.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  findAll(): Promise<Transaction[]> {
    return this.transactionsRepository.find();
  }

  findOne(id: number): Promise<Transaction | null> {
    return this.transactionsRepository.findOneBy({ id });
  }

  async create(Transaction: Transaction): Promise<Transaction> {
    return this.transactionsRepository.save(Transaction);
  }

  async getTransactionsByUserId(userId: number): Promise<Transaction[]> {
    return this.transactionsRepository.find({ where: { user: { id: userId } } });
  }
}