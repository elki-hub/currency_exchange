import dotenv from "dotenv";
dotenv.config();

const port =
  process.env.NODE_ENV !== "production"
    ? process.env.LOCAL_PORT
    : process.env.PORT;
const validCurrencies = process.env.VALID_CURRENCIES.split(", ");
const exchangeApiUrl = process.env.EXCHANGE_API_URL;

export { port, validCurrencies, exchangeApiUrl };
