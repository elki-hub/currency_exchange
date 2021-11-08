const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const { getExchangeRate } = require("../src/exchangeRateAxios");

app.use(bodyParser.json());

//app.get("/", (req, res) => {});

app.post("/quote", async (req, res) => {
  const { baseCurrency, quoteCurrency, baseAmount } = req.body;

  const exchangeRate = await getExchangeRate(baseCurrency, quoteCurrency);
  if (!exchangeRate) {
    res.status(404).json({
      error: `Quote currency with code ${quoteCurrency} was not found.`,
    });
  }
  console.log(exchangeRate);

  const quoteAmount = await Number((baseAmount * exchangeRate).toFixed(3));
  console.log(quoteAmount);

  const exchange = {
    exchangeRate: exchangeRate,
    quoteAmount: quoteAmount,
  };
  res.json(exchange);
});

app.listen(port, () => {
  console.log("Listening at http://localhost:" + port);
});
