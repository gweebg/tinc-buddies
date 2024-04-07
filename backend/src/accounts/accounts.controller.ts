import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { User } from './accounts.entity';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.accountsService.findOne(+id);
  }

  @Post()
  create(@Body() userData: User): Promise<User> {
    return this.accountsService.create(userData);
  }

  @Get('stats/:id')
  getStats(@Param('id') id: string): Promise<any> {
    return this.accountsService.getStats(+id);
  }

  @Put('deposit/:id/:amount')
  deposit(@Param('id') id: string, @Param('amount') amount: string): Promise<User> {
    return this.accountsService.deposit(+id, +amount);
  }

  @Put('withdraw/:id/:amount')
  withdraw(@Param('id') id: string, @Param('amount') amount: string): Promise<User> {
    return this.accountsService.withdraw(+id, +amount);
  }
}
