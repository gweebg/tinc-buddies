import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transactions.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Transaction])],
    providers: [TransactionsService],
    controllers: [TransactionsController],
})
export class TransactionsModule {}
