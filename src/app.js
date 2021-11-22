const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const { Api } = require("./exchangeRateAxios");
const { objectSchema } = require("./schema");
const { Cache2 } = require("../src/cache2");

app.use(bodyParser.json());
let cache = new Cache2();
// class C {
//   constructor(baseCurrency, quoteCurrency, exchangeRate) {
//     this.baseCurrency = baseCurrency;
//     this.quoteCurrency = quoteCurrency;
//     this.exchangeRate = exchangeRate;
//   }
// }

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
    // //1. Padaryti class kuri moka gauti api
    // const api = new Api(baseCurrency, quoteCurrency);
    // console.log("exchange rate:" + (await api.getExchangeRate()));
    // //2. Padaryti class kuri moka cacheuoti bet ka
    // //3. Padaryt class, kuri apjungia dvi klases

    //const cachedExchangeRate = cache[baseCurrency + "/" + quoteCurrency];

    const cachedExchangeRate = await cache.get(
      baseCurrency + "/" + quoteCurrency
    );

    async function addCache(baseCurrency, quoteCurrency) {
      const exchangeRate = await new Api(
        baseCurrency,
        quoteCurrency
      ).getExchangeRate();
      cache.set(baseCurrency + "/" + quoteCurrency, exchangeRate);
      return exchangeRate;
    }

    //ternary operator
    const exchangeRate = cachedExchangeRate
      ? cachedExchangeRate
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
    //console.log(err.response.data);
    console.log(err);
    return res.status(500).json({ error: "System error!" });
  }
});

app.listen(port, () => {
  console.log("Listening at http://localhost:" + port);
});
