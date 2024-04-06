import { Controller, Get } from '@nestjs/common';
import { WrapperService } from './wrapper.service';
import { GlobalService } from 'src/utils/global.service';

@Controller('wrapper')
export class WrapperController {
  constructor(private readonly appService: WrapperService) {}

  @Get()
  async getBTCPrice() {
    return GlobalService.getBTCPrice();
  }
}
