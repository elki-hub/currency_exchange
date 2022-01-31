export class ExchangeService {
  constructor(private api: any, private cache: any) {}

  async getExchangeWithCache(baseCurrency, quoteCurrency) {
    const key = ExchangeService.getExchangeKey(baseCurrency, quoteCurrency);
    let exchangeResult = this.cache.get(key);
    if (!exchangeResult) {
      exchangeResult = await this.api.getRate(baseCurrency, quoteCurrency);
      this.cache.set(key, exchangeResult);
    }
    console.log(this.cache);
    return exchangeResult;
  }

  static getExchangeKey(baseCurrency, quoteCurrency) {
    return `${baseCurrency}/${quoteCurrency}`;
  }
}
