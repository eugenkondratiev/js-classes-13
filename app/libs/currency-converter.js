const request = require('request');
//const rp = require('request-promise');
//const rp = require('request-promise-native');

function getUsdUah(currencyApiURL) {
 //===================================================
    // return rp(currencyApiURL).then(body => {
    //     console.log(body);
    //     const uah_usd = JSON.parse(body).find( el => el.ccy === "USD" && el.base_ccy === "UAH"); 
    //     console.log('getUsdUah ', uah_usd.sale);
       
    //     //const price = toFixed(uah_usd.sale, 2);
    //     //const price = uah_usd.sale;
    //     //res.send (`Price for this in USD = ${(product.price / price).toFixed(2)}`);
    //     usdUah = parseFloat(uah_usd.sale);
    //     return usduah;
    // });
 //===================================================
return new Promise((resolve, reject) => {
    request(currencyApiURL, (_res, _req, body) => {
        const uah_usd = JSON.parse(body).find( el => el.ccy === "USD" && el.base_ccy === "UAH"); 
        resolve(+uah_usd.sale);
            
    });
});


    //return usdUah;
};

module.exports = getUsdUah;
