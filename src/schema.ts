import Joi from "joi";
import { validCurrencies } from "./config";

const currencySchema = Joi.string()
  .uppercase()
  .valid(...validCurrencies);

export const objectSchema = Joi.object({
  baseCurrency: currencySchema.required(),
  quoteCurrency: currencySchema.required(),
  baseAmount: Joi.number().integer().positive().required(),
});
