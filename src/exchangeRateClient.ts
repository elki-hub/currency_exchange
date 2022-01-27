const axios = require("axios");
//sinon js

export class ExchangeRateClient {
  private readonly rateURL: string;

  constructor() {
    this.rateURL = "https://api.exchangerate-api.com/v4/latest/";
  }

  async getRate(baseCurrency, quoteCurrency) {
    const data = await axios.get(this.rateURL + baseCurrency);
    console.log("-0.01");
    return data.data.rates[quoteCurrency];
  }
}
