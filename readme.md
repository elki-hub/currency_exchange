a) postman\
b) application\
c) exchangerate-api.com\

1) Postman GET request to application\
    baseCurrency = EUR\
    quoteCurrency = GBP\
    baseAmount = 10
2) Get <strong>baseCurrency</strong>(EUR) exchange rates from exchangerate-api.com
3) find <strong> exchangeRate </strong> of quoteCurrency(GBP)
4) count <strong>quoteAmount</strong> (exchangeRate * baseAmount)
5) Send response to postman of:\
    exchangeRate = 0.845\
    quoteAmount = 8.4
