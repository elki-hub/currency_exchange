const Joi = require("joi");

//const validCurrencies = ["EUR", "USD", "GBP", "ILS"];

const objectSchema = Joi.object({
  baseCurrency: Joi.string()
    .length(3)
    .uppercase()
    .regex(/^[A-Z]+$/, { name: "alpha" })
    .valid("EUR", "USD", "GBP", "ILS"),
  quoteCurrency: Joi.string()
    .length(3)
    .uppercase()
    .regex(/^[A-Z]+$/, { name: "alpha" })
    .valid("EUR", "USD", "GBP", "ILS"),
  baseAmount: Joi.number().integer().positive().required(),
});

module.exports = {
  objectSchema,
};
