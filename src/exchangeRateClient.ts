import axios from "axios";
import { exchangeApiUrl } from "./config";

interface ApiData {
  data: {
    rates: { [key: string]: number };
  };
}
//sinon js

export class ExchangeRateClient {
  constructor(private readonly rateURL: string = exchangeApiUrl) {}

  async getRate(baseCurrency: string, quoteCurrency: string) {
    const data: ApiData = await axios.get(this.rateURL + baseCurrency);
    // logger.log("info", "-0.01$ was charged");
    return data.data.rates[quoteCurrency];
  }
}
