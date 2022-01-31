import Joi from "joi";

const validCurrencies = ["EUR", "USD", "GBP", "ILS"];
const currencySchema = Joi.string()
  .uppercase()
  .valid(...validCurrencies);

export const objectSchema = Joi.object({
  baseCurrency: currencySchema.required(),
  quoteCurrency: currencySchema.required(),
  baseAmount: Joi.number().integer().positive().required(),
});
