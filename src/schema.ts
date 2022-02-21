import Joi from "joi";
import "dotenv/config";

const validCurrencies = process.env.VALID_CURRENCIES.split(", ");
const currencySchema = Joi.string()
  .uppercase()
  .valid(...validCurrencies);

export const objectSchema = Joi.object({
  baseCurrency: currencySchema.required(),
  quoteCurrency: currencySchema.required(),
  baseAmount: Joi.number().integer().positive().required(),
});
