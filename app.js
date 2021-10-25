const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const axios = require('axios');

const rateURL = 'https://api.exchangerate-api.com/v4/latest/'

app.use(bodyParser.json())


app.get('/', (req, res) =>{
})

app.post('/quote', async (req, res) =>{
    let {baseCurrency, quoteCurrency, baseAmount} = req.body;

    let data = (await axios.get(rateURL + baseCurrency)).data;

    let exchangeRate = data.rates[quoteCurrency];
    let quoteAmount = Number((baseAmount * exchangeRate).toFixed(3));

    let exchange = {
        exchangeRate: exchangeRate,
        quoteAmount: quoteAmount
    }

    //console.log(typeof exchange)
    //console.log(exchange)

    res.json(exchange)

})

app.listen(port, ()=>{
    console.log('Listening at http://localhost:' + port);
})


