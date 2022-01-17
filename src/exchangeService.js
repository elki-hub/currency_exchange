class ExchangeService {
  constructor(api, cache) {
    this.api = api;
    this.cache = cache;
  }

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

exports.ExchangeService = ExchangeService;
