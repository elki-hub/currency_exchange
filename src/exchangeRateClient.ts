const axios = require("axios");
require("dotenv").config();
//sinon js

export class ExchangeRateClient {
  constructor(
    private readonly rateURL: string = process.env.EXCHANGE_API_URL
  ) {}

  async getRate(baseCurrency: string, quoteCurrency: string) {
    const data = await axios.get(this.rateURL + baseCurrency);
    console.log("-0.01");
    return data.data.rates[quoteCurrency];
  }
}
