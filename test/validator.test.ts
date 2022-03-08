import { objectSchema } from "../src/schema";
import assert from "assert";

describe("Testing Validator schema", () => {
  const errorMessages = {
    invalidBaseCurrency: {
      notValid: '"baseCurrency" must be one of [EUR, USD, GBP, ILS]',
      isRequired: '"baseCurrency" is required',
    },
    invalidQuoteCurrency: {
      notValid: '"quoteCurrency" must be one of [EUR, USD, GBP, ILS]',
      isRequired: '"quoteCurrency" is required',
    },
    invalidAmount: {
      notNumber: '"baseAmount" must be a number',
      notPositive: '"baseAmount" must be a positive number',
      isRequired: '"baseAmount" is required',
    },
  };

  it("It can validate Base Currency", async () => {
    const req = { baseCurrency: "US", quoteCurrency: "USD", baseAmount: 1 };
    const result = objectSchema.validate(req);

    assert.equal(
      result.error.message,
      errorMessages.invalidBaseCurrency.notValid
    );
  });

  it("It requires Base Currency", async () => {
    const req = { quoteCurrency: "USD", baseAmount: 1 };
    const result = objectSchema.validate(req);

    assert.equal(
      result.error.message,
      errorMessages.invalidBaseCurrency.isRequired
    );
  });

  it("It can validate Quote Currency", async () => {
    const req = { baseCurrency: "USD", quoteCurrency: "US", baseAmount: 1 };
    const result = objectSchema.validate(req);

    assert.equal(
      result.error.message,
      errorMessages.invalidQuoteCurrency.notValid
    );
  });

  it("It requires Quote Currency", async () => {
    const req = { baseCurrency: "USD", baseAmount: 1 };
    const result = objectSchema.validate(req);

    assert.equal(
      result.error.message,
      errorMessages.invalidQuoteCurrency.isRequired
    );
  });

  it("It can validate Base Amount is not a number", async () => {
    const req = {
      baseCurrency: "USD",
      quoteCurrency: "USD",
      baseAmount: "USD",
    };
    const result = objectSchema.validate(req);

    assert.equal(result.error.message, errorMessages.invalidAmount.notNumber);
  });

  it("It can validate Base Amount is not a positive", async () => {
    const req = { baseCurrency: "USD", quoteCurrency: "USD", baseAmount: -3 };
    const result = objectSchema.validate(req);

    assert.equal(result.error.message, errorMessages.invalidAmount.notPositive);
  });

  it("It requires Base Amount", async () => {
    const req = { baseCurrency: "USD", quoteCurrency: "USD" };
    const result = objectSchema.validate(req);

    assert.equal(result.error.message, errorMessages.invalidAmount.isRequired);
  });
});
