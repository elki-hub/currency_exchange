import express, { Express } from "express";
import bodyParser from "body-parser";
import { objectSchema } from "./schema";
import { ExchangeService } from "./exchangeService";
import { ExchangeRateClient } from "./exchangeRateClient";
import { LruCache } from "./LruCache";
interface Logger {
  log(level: string, message: unknown): void;
}

const exchangeService = new ExchangeService(
  new ExchangeRateClient(),
  new LruCache(3)
);

export function buildApplication(logger: Logger): Express {
  const app = express();
  app.use(bodyParser.json());
  app.get("/", async (req, res) => {
    logger.log("info", "Hello");
    res.json({ message: "Hello" });
  });
  app.post("/quote", async (req, res) => {
    try {
      req.body = await objectSchema.validateAsync(req.body);
    } catch (err) {
      logger.log("error", err.message);

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
      //logger.log(err.response.data);
      logger.log("error", err);

      return res.status(500).json({ error: "System error!" });
    }
  });
  return app;
}
