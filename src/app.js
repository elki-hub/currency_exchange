const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const { getExchangeRate } = require("./exchangeRateAxios");
const { objectSchema } = require("./schema");

app.use(bodyParser.json());

app.post("/quote", async (req, res) => {
  try {
    const { baseCurrency, quoteCurrency, baseAmount } =
      await objectSchema.validateAsync(req.body);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
    });

    return;
  }

  res.status(200).json({
    error: `All good`,
  });

  // try {
  //   //to middleware
  //   const exchangeRate = await getExchangeRate(baseCurrency, quoteCurrency);
  //   console.log(exchangeRate);
  //
  //   const quoteAmount = await Number((baseAmount * exchangeRate).toFixed(3));
  //   console.log(quoteAmount);
  //
  //   const exchange = {
  //     exchangeRate: exchangeRate,
  //     quoteAmount: quoteAmount,
  //   };
  //   res.json(exchange);
  // } catch (err) {
  //   console.log(err.response.data);
  //   res.status(500).json({ error: "System error!" });
  // }
});

app.listen(port, () => {
  console.log("Listening at http://localhost:" + port);
});
