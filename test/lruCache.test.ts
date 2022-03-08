import "mocha";
import assert from "assert";
import { LruCache } from "../src/LruCache";

describe("Testing LruCache", () => {
  it("can hold 2 last values in cache", () => {
    const lruCache = new LruCache(2);
    lruCache.set("A", 13);
    lruCache.set("B", 5);
    lruCache.set("C", 0.1);

    assert.strictEqual(lruCache.get("B"), 5);
    assert.strictEqual(lruCache.get("C"), 0.1);
    assert.strictEqual(lruCache.get("A"), undefined);
  });

  it("can hold 3 last values in cache", () => {
    const lruCache = new LruCache(3);
    lruCache.set("A", 16);
    lruCache.set("B", 9);
    lruCache.set("C", -2);
    lruCache.set("D", 0.2);

    assert.strictEqual(lruCache.get("A"), undefined);
    assert.strictEqual(lruCache.get("B"), 9);
    assert.strictEqual(lruCache.get("C"), -2);
    assert.strictEqual(lruCache.get("D"), 0.2);
  });

  it("refreshing cache with get function", () => {
    const lruCache = new LruCache(2);
    lruCache.set("A", 13);
    lruCache.set("B", 5);
    lruCache.get("A");
    lruCache.set("C", 0.1);

    assert.strictEqual(lruCache.get("A"), 13);
    assert.strictEqual(lruCache.get("C"), 0.1);
    assert.strictEqual(lruCache.get("B"), undefined);
  });
});
