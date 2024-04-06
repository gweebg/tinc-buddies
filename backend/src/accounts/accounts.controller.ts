import { Controller, Get } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { User } from './accounts.entity';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  getUser(): Promise<User> {
    return this.accountsService.findOne(1);
  }
}
