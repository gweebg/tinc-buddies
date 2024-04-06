import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { User } from './accounts.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [AccountsService],
    controllers: [AccountsController],
})
export class AccountsModule {}
