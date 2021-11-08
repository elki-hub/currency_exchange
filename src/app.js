const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const { getExchangeRate } = require("../src/exchangeRateAxios");

app.use(bodyParser.json());

//app.get("/", (req, res) => {});
const validCurrencies = ["EUR", "USD", "GBP", "ILS"];

app.post("/quote", async (req, res) => {
  //const { baseCurrency, quoteCurrency, baseAmount } = req.body;
  if (typeof req.body.baseAmount != "number") {
    res.status(404).json({
      error: `BASE AMOUNT field has to be number higher than 0.`,
    });
    return;
  }
  if (
    req.body.baseCurrency.length !== 3 ||
    typeof req.body.baseCurrency != "string" ||
    /[^a-zA-Z]/.test(req.body.baseCurrency)
  ) {
    res.status(404).json({
      error: `Check correct BASE CURRENCY name (` + validCurrencies + `).`,
    });
    return;
  }
  if (
    req.body.quoteCurrency.length !== 3 ||
    typeof req.body.quoteCurrency != "string" ||
    /[^a-zA-Z]/.test(req.body.quoteCurrency)
  ) {
    res.status(404).json({
      error: `Check correct Quote CURRENCY name (` + validCurrencies + `).`,
    });
    return;
  }

  const baseAmount = req.body.baseAmount;
  const baseCurrency = req.body.baseCurrency.toUpperCase();
  const quoteCurrency = req.body.quoteCurrency.toUpperCase();

  console.log(baseCurrency + "  " + quoteCurrency + " " + baseAmount);
  console.log("check if valid base currency");
  if (!validCurrencies.includes(baseCurrency)) {
    console.log("base validation denied");
    res.status(404).json({
      error: `Base currency with code ${baseCurrency} was not found.`,
    });
    return;
  }
  console.log("check if valid quote currency");
  if (!validCurrencies.includes(quoteCurrency)) {
    console.log("quote validation denied");
    res.status(404).json({
      error: `Quote currency with code ${quoteCurrency} was not found.`,
    });
    return;
  }
  res.status(200).json({
    error: `All good`,
  });

  try {
    //to middleware
    const exchangeRate = await getExchangeRate(baseCurrency, quoteCurrency);
    console.log(exchangeRate);

    const quoteAmount = await Number((baseAmount * exchangeRate).toFixed(3));
    console.log(quoteAmount);

    const exchange = {
      exchangeRate: exchangeRate,
      quoteAmount: quoteAmount,
    };
    res.json(exchange);
  } catch (err) {
    console.log(err.response.data);
    res.status(500).json({ error: "System error!" });
  }
});

app.listen(port, () => {
  console.log("Listening at http://localhost:" + port);
});
