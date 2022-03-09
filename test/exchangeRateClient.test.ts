import assert from "assert";
import sinon from "sinon";
import axios from "axios";
import { ExchangeRateClient } from "../src/exchangeRateClient";

const data = {
  data: {
    rates: { USD: 1, EUR: 0.92, GBP: 0.761, ILS: 3.29 },
  },
};

describe("Test ExchangeRateClient class", () => {
  sinon.stub(axios, "get").returns(Promise.resolve(data));
  const exchangeRateClient = new ExchangeRateClient("https://api/USD");

  it("can operate get quote currency rate", async () => {
    assert.equal(await exchangeRateClient.getRate("USD", "USD"), 1);
    assert.equal(await exchangeRateClient.getRate("USD", "EUR"), 0.92);
    assert.equal(await exchangeRateClient.getRate("USD", "GBP"), 0.761);
    assert.equal(await exchangeRateClient.getRate("USD", "ILS"), 3.29);
  });
});
