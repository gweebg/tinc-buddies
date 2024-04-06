import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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
    console.log(userData)
    return this.accountsService.create(userData);
  }
}
