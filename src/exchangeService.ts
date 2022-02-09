export class ExchangeService {
  constructor(private api: any, private cache: any) {}

  async getExchangeWithCache(baseCurrency: string, quoteCurrency: string) {
    const key = ExchangeService.getExchangeKey(baseCurrency, quoteCurrency);
    let exchangeResult = this.cache.get(key);
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
