const axios = require("axios");
const rateURL = "https://api.exchangerate-api.com/v4/latest/";

async function getExchangeRate(baseCurrency, quoteCurrency) {
  const data = await axios.get(rateURL + baseCurrency);
  console.log("-0.01");
  return data.data.rates[quoteCurrency];
}

module.exports = {
  getExchangeRate,
};
