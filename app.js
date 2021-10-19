const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
//const fetch = require("node-fetch");
const axios = require('axios');
//import fetch from 'node-fetch';
//const fetch = require('fetch');



const rateURL = 'https://api.exchangerate-api.com/v4/latest/'

// axios.get(rateURL)
//     .then(function (response){
//     console.log(response.data);
// })

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//app.set("view engine", "ejs");
//app.use(express.static(__dirname + '/public'));
//app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) =>{


    res.render('index', {
        data: ''
    })
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

    console.log(typeof exchange)
    console.log(exchange)


    let json = JSON.stringify(exchange);
    console.log(typeof json)


    res.render('index', {
        data:{
            baseCurrency: baseCurrency,
            quoteCurrency: quoteCurrency,
            baseAmount: baseAmount
        },
        //exchange: exchange
    })

})

app.post('/', (req, res) =>{
    res.send('Got a POST request');
})

app.listen(port, ()=>{
    console.log('Listening at http://localhost:' + port);
})


