import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  async getAlive() {
    return 'App is alive!';
  }
}
