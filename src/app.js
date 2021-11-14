const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const { checkInput, checkExchangeRate } = require("./middleware");

app.use(bodyParser.json());

app.post("/quote", checkInput, checkExchangeRate, async (req, res) => {
  const { baseAmount, exchangeRate } = req.body;
  console.log(req.body);

  const quoteAmount = await Number((baseAmount * exchangeRate).toFixed(3));
  //console.log(quoteAmount);

  const exchange = {
    exchangeRate: exchangeRate,
    quoteAmount: quoteAmount,
  };

  res.json(exchange);
});

app.listen(port, () => {
  console.log("Listening at http://localhost:" + port);
});
