import { BTCPrice } from 'src/wrapper/interfaces/btcPrice.interface';

export class GlobalService {
  static btcPrice: BTCPrice = {
    ask: '62503.73204375175805870286',
    bid: '62427.94402163106393184279',
    currency: 'EUR',
  };

  static setBTCPrice = (btcPrice: BTCPrice) => {
    GlobalService.btcPrice = btcPrice;
  };
  static getBTCPrice = () => {
    return GlobalService.btcPrice;
  };
}
