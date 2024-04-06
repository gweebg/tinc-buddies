import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transactions.entity';
import { AccountsService } from 'src/accounts/accounts.service';

@Module({
    imports: [TypeOrmModule.forFeature([Transaction]), AccountsService],
    providers: [TransactionsService],
    controllers: [TransactionsController],
})
export class TransactionsModule {}
