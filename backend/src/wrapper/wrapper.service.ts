import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BTCPrice } from './interfaces/btcPrice.interface';
import { GlobalService } from 'src/utils/global.service';

@Injectable()
export class WrapperService {
  updateBTCPrice = async () => {
    const response = await fetch('https://api.uphold.com/v0/ticker/BTCEUR');
    const json: BTCPrice = await response.json();
    GlobalService.setBTCPrice(json);
  };

  createTxn = async (txnParams) => {
    Logger.log('Creating transaction...' + txnParams);
  };

  //TODO: change time later
  @Cron(CronExpression.EVERY_10_MINUTES)
  handlecron() {
    Logger.log('Fetching bitcoin price...');
    this.updateBTCPrice();
  }
}
