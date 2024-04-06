import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountsService {
  getUser(): { name: string } {
    return { name: 'John Doe'};
  }
}