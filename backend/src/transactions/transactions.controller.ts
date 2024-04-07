import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transactions.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Transaction> {
    return this.transactionsService.findOne(+id);
  }

  @Post()
  create(@Body() transactionData: Transaction): Promise<Transaction> {
    return this.transactionsService.create(transactionData, transactionData.config);
  }

  @Get('user/:userId')
  getTransactionsByUserId(
    @Param('userId') userId: string,
  ): Promise<Transaction[]> {
    return this.transactionsService.getTransactionsByUserId(+userId);
  }

  @Get('config/:configId')
  getTransactionsByConfigId(
    @Param('configId') configId: string,
  ): Promise<Transaction[]> {
    return this.transactionsService.getTransactionsByConfigId(+configId);
  }
}
