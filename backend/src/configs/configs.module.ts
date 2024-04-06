import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigsController } from './configs.controller';
import { ConfigsService } from './configs.service';
import { Config } from './configs.entity';
import { AccountsService } from 'src/accounts/accounts.service';

@Module({
    imports: [TypeOrmModule.forFeature([Config])],
    providers: [ConfigsService, AccountsService],
    controllers: [ConfigsController],
})
export class ConfigsModule {}
