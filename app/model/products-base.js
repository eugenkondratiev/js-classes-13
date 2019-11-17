const fs = require('fs');
const mailer = require('../libs/mail-options');

const BASE_FILE_NAME = "model/products-base.json";

function updateProductsBase(products) {
    const jsonProducts = JSON.stringify(products, null, ' ');
   // console.log(jsonProducts);
    
    fs.writeFile(BASE_FILE_NAME, jsonProducts, "utf-8", (err) => { 
       if (err) console.log(err);
    });

}

function readProductsBase() {
    return new Promise((resolve, reject) => {
        fs.readFile(BASE_FILE_NAME, 'utf8', (err, data) => {
            if (err) reject(err.message);
            resolve(data);
        })
    });
}

module.exports = {
    updateProductsBase :updateProductsBase,
    readProductsBase : readProductsBase
}
