import axios from "axios";
import "dotenv/config";

interface ApiData {
  data: {
    rates: { [key: string]: number };
  };
}
//sinon js

export class ExchangeRateClient {
  constructor(
    private readonly rateURL: string = process.env.EXCHANGE_API_URL
  ) {}

  async getRate(baseCurrency: string, quoteCurrency: string) {
    const data: ApiData = await axios.get(this.rateURL + baseCurrency);
    console.log("-0.01");
    return data.data.rates[quoteCurrency];
  }
}
