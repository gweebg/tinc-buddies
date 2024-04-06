import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigsController } from './configs.controller';
import { ConfigsService } from './configs.service';
import { Config } from './configs.entity';
import { AccountsService } from 'src/accounts/accounts.service';
import { User } from 'src/accounts/accounts.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Config]),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AccountsService, ConfigsService],
  controllers: [ConfigsController],
})
export class ConfigsModule {}
