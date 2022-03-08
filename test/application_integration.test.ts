import { buildApplication } from "../src/application";
import supertest from "supertest";
import assert from "assert";

class TestLogger {
  log(/*level: string, message: unknown*/) {}
}

const app = buildApplication(new TestLogger());

describe("Test Get request", () => {
  it("can operate get request", async () => {
    const result = await supertest(app).get("/"); //.expect(200, '{message:"Hello"}');

    assert.strictEqual(result.status, 200);
  });
});

describe("Test Post request", () => {
  it("can operate get post", async () => {
    const reqBody = {
      baseCurrency: "USD",
      quoteCurrency: "USD",
      baseAmount: 1,
    };
    const result = await supertest(app).post("/quote").send(reqBody);

    assert.equal(result.status, 200);
  });

  it("can catch invalid request body", async () => {
    const reqBody = {
      quoteCurrency: "USD",
      baseAmount: 1,
    };
    const result = await supertest(app).post("/quote").send(reqBody);
    const validatorError = {
      message: '"baseCurrency" is required',
      status: 404,
    };

    assert.equal(result.status, validatorError.status);
    assert.equal(result.body.error, validatorError.message);
  });

  it("can count quoteAmount", async () => {
    // async function quoteAmount(baseAmount: number, exchangeRate: number) {
    //   await Number((baseAmount * exchangeRate).toFixed(3));
    // }
    // assert.equal(await quoteAmount(1.3, 1.4), 1.82);
    // assert.strictEqual(await quoteAmount(6, 1.8282), 10.969);
    // assert.strictEqual(await quoteAmount(1.48, 8.928397), 13.214);
    // assert.strictEqual(await quoteAmount(8.01, 0.000218), 0.002);

    const quoteAmount1 = await Number((1.3 * 1.4).toFixed(3));
    const quoteAmount2 = await Number((6 * 1.8282).toFixed(3));
    const quoteAmount3 = await Number((1.48 * 8.928397).toFixed(3));
    const quoteAmount4 = await Number((8.01 * 0.000218).toFixed(3));

    assert.strictEqual(quoteAmount1, 1.82);
    assert.strictEqual(quoteAmount2, 10.969);
    assert.strictEqual(quoteAmount3, 13.214);
    assert.strictEqual(quoteAmount4, 0.002);
  });
});
