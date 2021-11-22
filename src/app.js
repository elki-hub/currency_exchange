const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const { getExchangeRate } = require("./exchangeRateAxios");
const { objectSchema } = require("./schema");

app.use(bodyParser.json());

class Cache {
  constructor(baseCurrency, quoteCurrency, exchangeRate) {
    this.baseCurrency = baseCurrency;
    this.quoteCurrency = quoteCurrency;
    this.exchangeRate = exchangeRate;
  }
}
let cache = [];

app.post("/quote", async (req, res) => {
  try {
    req.body = await objectSchema.validateAsync(req.body);
  } catch (err) {
    console.log(err.message);

    return res.status(404).json({
      error: err.message,
    });
  }

  const { baseAmount, baseCurrency, quoteCurrency } = req.body;

  try {
    const cachedExchangeRate = cache.find(
      ({ baseCurrency, quoteCurrency }) =>
        baseCurrency === this.baseCurrency &&
        quoteCurrency === this.quoteCurrency
    );

    async function addCache(baseCurrency, quoteCurrency) {
      const exchangeRate = await getExchangeRate(baseCurrency, quoteCurrency);
      cache.push(new Cache(baseCurrency, quoteCurrency, exchangeRate));
      return exchangeRate;
    }

    const exchangeRate = cachedExchangeRate
      ? cachedExchangeRate.exchangeRate
      : await addCache(baseCurrency, quoteCurrency);

    const quoteAmount = await Number((baseAmount * exchangeRate).toFixed(3));
    //console.log(quoteAmount);
    console.log(cache);

    const exchange = {
      exchangeRate: exchangeRate,
      quoteAmount: quoteAmount,
    };

    res.json(exchange);
  } catch (err) {
    console.log(err.response.data);
    return res.status(500).json({ error: "System error!" });
  }
});

app.listen(port, () => {
  console.log("Listening at http://localhost:" + port);
});
