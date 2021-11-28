const assert = require("assert");
const { multiply } = require("../src/multiply");

describe("multiply", function () {
  it("can multiply integers", function () {
    assert.equal(multiply(3, 3), "9");
    assert.strictEqual(multiply(2, 6), 12);
    assert.strictEqual(multiply(3, 3), 9);
    assert.strictEqual(multiply(4, 3), 12);
  });
  it("can multiply floats", function () {
    assert.strictEqual(multiply(0.2, 5), 1);
  });
  xit("can multiply negatives", function () {
    assert.strictEqual(multiply(-2, 6), -12);
    assert.strictEqual(multiply(-6, -2), 12);
  });
});
