import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transactions.entity';
import { ConfigsService } from 'src/configs/configs.service';
import { Config } from 'src/configs/configs.entity';
import { User } from 'src/accounts/accounts.entity';
import { AccountsService } from 'src/accounts/accounts.service';


@Module({
    imports: [TypeOrmModule.forFeature([Transaction]), TypeOrmModule.forFeature([Config]), TypeOrmModule.forFeature([User])],
    providers: [ConfigsService, TransactionsService, AccountsService],
    controllers: [TransactionsController],
})
export class TransactionsModule {}
