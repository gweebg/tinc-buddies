import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigsController } from './configs.controller';
import { ConfigsService } from './configs.service';
import { Config } from './configs.entity';
import { AccountsModule } from 'src/accounts/accounts.module';
import { TransactionsModule } from 'src/transactions/transactions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Config]),
    forwardRef(() => AccountsModule),
    forwardRef(() => TransactionsModule),
  ],
  providers: [ConfigsService],
  controllers: [ConfigsController],
  exports: [ConfigsService],
})
export class ConfigsModule {}
