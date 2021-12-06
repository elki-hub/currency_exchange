const assert = require("assert");
const { Cache2 } = require("../src/cache");

describe("Cache2", () => {
  it("can be instantiated", () => {
    const cache = new Cache2();

    assert.strictEqual(typeof cache, "object");
  });

  it("returns `undefined` if empty", () => {
    const cache = new Cache2();

    assert.strictEqual(cache.get(""), undefined);
    assert.strictEqual(cache.get("eur/usd"), undefined);
    assert.strictEqual(cache.get("2sadsdgsg3sdg4124"), undefined);
  });

  it("can set and get a key-value", () => {
    const cache = new Cache2();

    cache.set("eur/usd", 123);
    assert.strictEqual(cache.get("eur/usd"), 123);
    assert.strictEqual(cache.get("eur/gbp"), undefined);
  });

  it("can set a key and get it multiple times", () => {
    const cache = new Cache2();

    cache.set("usd/rub", 23.4);
    assert.strictEqual(cache.get("usd/rub"), 23.4);
    assert.strictEqual(cache.get("usd/rub"), 23.4);
    assert.strictEqual(cache.get("usd/rub"), 23.4);
  });

  it("can set and get multiple keys", () => {
    const cache = new Cache2();

    cache.set("eur/gbp", 1.23);
    assert.strictEqual(cache.get("eur/gbp"), 1.23);

    cache.set("gbp/eur", 3.21);
    assert.strictEqual(cache.get("gbp/eur"), 3.21);
  });
});
