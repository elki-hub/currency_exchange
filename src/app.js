const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const { objectSchema } = require("./schema");
const { Cache } = require("./cache");
const { ExchangeRateClient } = require("./exchangeRateClient");
const { ExchangeService } = require("./exchangeService");
app.use(bodyParser.json());

const cache = new Cache();
const exchangeRateClient = new ExchangeRateClient();
const exchangeService = new ExchangeService(exchangeRateClient, cache);

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
    const exchangeRate = await exchangeService.getExchangeWithCache(
      baseCurrency,
      quoteCurrency
    );

    const quoteAmount = await Number((baseAmount * exchangeRate).toFixed(3));
    //console.log(quoteAmount);
    console.log(cache);

    const exchange = {
      exchangeRate: exchangeRate,
      quoteAmount: quoteAmount,
    };

    res.json(exchange);
  } catch (err) {
    //console.log(err.response.data);
    console.log(err);
    return res.status(500).json({ error: "System error!" });
  }
});

app.listen(port, () => {
  console.log("Listening at http://localhost:" + port);
});
