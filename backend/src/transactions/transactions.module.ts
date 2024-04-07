import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsController } from './transactions.controller';
import { Transaction } from './transactions.entity';
import { ConfigsService } from 'src/configs/configs.service';
import { Config } from 'src/configs/configs.entity';
import { User } from 'src/accounts/accounts.entity';
import { AccountsService } from 'src/accounts/accounts.service';
import { ConfigsModule } from 'src/configs/configs.module';
import { AccountsModule } from 'src/accounts/accounts.module';
import { TransactionsService } from './transactions.service';


@Module({
    imports: [ TypeOrmModule.forFeature([Transaction]),
        forwardRef(() => ConfigsModule), forwardRef(() => AccountsModule)],
    providers: [TransactionsService],
    controllers: [TransactionsController],
    exports: [TransactionsService],
})
export class TransactionsModule {}
