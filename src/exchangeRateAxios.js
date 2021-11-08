const axios = require('axios');
const rateURL = 'https://api.exchangerate-api.com/v4/latest/'

async function getExchangeRate (baseCurrency, quoteCurrency){
    try{
        const data = await axios.get(rateURL + baseCurrency);
        return data.data.rates[quoteCurrency];
    }
    catch (err){
        console.log(err.response.data);
    }
}

module.exports = {
    getExchangeRate,
};