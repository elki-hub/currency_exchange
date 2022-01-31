import express from "express";
import bodyParser from "body-parser";
import { objectSchema } from "./schema";
import { LruCache } from "./LruCache";
import { ExchangeRateClient } from "./exchangeRateClient";
import { ExchangeService } from "./exchangeService";

const app = express();
const port = 3000;
const exchangeService = new ExchangeService(
  new ExchangeRateClient(),
  new LruCache(3)
);

app.use(bodyParser.json());

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
