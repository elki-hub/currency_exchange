const { objectSchema } = require("./schema");
const { getExchangeRate } = require("./exchangeRateAxios");

async function checkInput(req, res, next) {
  try {
    req.body = await objectSchema.validateAsync(req.body);
    return next();
  } catch (err) {
    console.log(err.message);

    return res.status(404).json({
      error: err.message,
    });
  }
}

async function checkExchangeRate(req, res, next) {
  try {
    req.body.exchangeRate = await getExchangeRate(
      req.body.baseCurrency,
      req.body.quoteCurrency
    );

    return next();
  } catch (err) {
    console.log(err.response.data);
    return res.status(500).json({ error: "System error!" });
  }
}

module.exports = {
  checkInput,
  checkExchangeRate,
};
