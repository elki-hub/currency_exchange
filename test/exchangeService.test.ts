import { ExchangeService } from "../src/exchangeService";
import { ExchangeRateClient } from "../src/exchangeRateClient";
import { LruCache } from "../src/LruCache";
import assert from "assert";
import sinon from "sinon";

// interface Data {
//   data: { [key: string]: { [key: string]: number } };
// }

// let data: Data = {
//   data: {
//     USD: { USD: 1, EUR: 0.92, GBP: 0.761, ILS: 3.29 },
//     EUR: { USD: 1.09, EUR: 1, GBP: 0.828, ILS: 3.58 },
//     GBP: { USD: 1.31, EUR: 1.21, GBP: 1, ILS: 4.33 },
//     ILS: { USD: 0.304, EUR: 0.279, GBP: 0.231, ILS: 1 },
//   },
// };

describe("Test exchangeService", () => {
  const lruCache = new LruCache(3);
  const exchangeRateClient = new ExchangeRateClient();

  let getRateStub = sinon.stub(exchangeRateClient, "getRate");
  sinon.stub(lruCache, "get").returns(undefined);
  sinon.stub(lruCache, "set");

  const service = new ExchangeService(exchangeRateClient, lruCache);

  it("can get exchangeRate from ExchangeClient", async () => {
    getRateStub.withArgs("USD", "EUR").returns(Promise.resolve(0.92));
    getRateStub.withArgs("GBP", "USD").returns(Promise.resolve(1.31));
    getRateStub.withArgs("EUR", "ILS").returns(Promise.resolve(3.58));
    getRateStub.withArgs("ILS", "GBP").returns(Promise.resolve(0.231));

    assert.strictEqual(await service.getExchangeWithCache("USD", "EUR"), 0.92);
    assert.strictEqual(await service.getExchangeWithCache("GBP", "USD"), 1.31);
    assert.strictEqual(await service.getExchangeWithCache("EUR", "ILS"), 3.58);
    assert.strictEqual(await service.getExchangeWithCache("ILS", "GBP"), 0.231);
  });
});
