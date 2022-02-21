import { LruCache } from "./LruCache";
import { ExchangeRateClient } from "./exchangeRateClient";

export class ExchangeService {
  constructor(private api: ExchangeRateClient, private cache: LruCache) {}

  async getExchangeWithCache(baseCurrency: string, quoteCurrency: string) {
    const key = ExchangeService.getExchangeKey(baseCurrency, quoteCurrency);
    let exchangeResult: number = this.cache.get(key);
    if (!exchangeResult) {
      exchangeResult = await this.api.getRate(baseCurrency, quoteCurrency);
      this.cache.set(key, exchangeResult);
    }
    console.log(this.cache);
    return exchangeResult;
  }

  static getExchangeKey(baseCurrency: string, quoteCurrency: string) {
    return `${baseCurrency}/${quoteCurrency}`;
  }
}
