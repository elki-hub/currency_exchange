const { Cache } = require("../src/cache2");
const { Api } = require("./exchangeRateAxios");

class Exchange {
  constructor() {
    this.api = new Api();
  }

  async getExchangeWithCache(baseCurrency, quoteCurrency) {
    const key = Exchange.getExchangeKey(baseCurrency, quoteCurrency);
    let exchangeResult = Cache.get(key);
    if (!exchangeResult) {
      exchangeResult = await this.api.getExchangeRate(
        baseCurrency,
        quoteCurrency
      );
      Cache.set(key, exchangeResult);
    }
    return exchangeResult;
  }

  static getExchangeKey(baseCurrency, quoteCurrency) {
    return `${baseCurrency}/${quoteCurrency}`;
  }
}

exports.Exchange = new Exchange();
