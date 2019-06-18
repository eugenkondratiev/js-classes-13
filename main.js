const express = require('express')
const app = express();
const request = require('request');

const host = '127.0.0.1';
const getPort = require('./gen-port');
const port = getPort.getFreePort();
const URL = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

request(URL, (res, rew, body) => {
    console.log(body);
    const uah_usd = JSON.parse(body).find( el => el.ccy === "USD" && el.base_ccy === "UAH"); 
    console.log(uah_usd.sale);
    
});

//middleware
app.use(express.json());

let lastProductId = 0;

const products = [
    {
        "id": ++lastProductId,
        "name": "apple",
        "unit": "kg",
        "quatity": 10,
        "price": 22

    },
    {
        "id": ++lastProductId,
        "name": "peach",
        "unit": "kg",
        "quatity": 15,
        "price": 60

    }
];

// GET READ
app.get('/', (req, res) => {
    res.send('wellcommen!!');
});

app.get('/api/v1/products/', (req, res) => {
    res.send(products);
});

app.get('/api/v1/products/:id', (req, res) => {
    
    const product = products.find(el => el.id === +req.params.id);
    if (!product) return res.status(404).send(`There is no product with id=${req.params.id} in the list`);
    res.send (product);
    
});

app.get('/api/v1/products/:id/usd', (req, res) => {
    
    const product = products.find(el => el.id === +req.params.id);
    if (!product) return res.status(404).send(`There is no product with id=${req.params.id} in the list`);
    
    request(URL, (_res, _req, body) => {
        //console.log(body);
        const uah_usd = JSON.parse(body).find( el => el.ccy === "USD" && el.base_ccy === "UAH"); 
        console.log('USD', product.price / uah_usd.sale);
       
        //const price = toFixed(uah_usd.sale, 2);
        const price = uah_usd.sale;
        res.send (`Price for this in USD = ${(product.price / price).toFixed(2)}`);
            
    });
     
});

// POST CREATE
app.post('/api/v1/products/', (req, res) => {
    console.log(req.body);

    const {name, units, quantity, price} = req.body;

    const product = {
        id: ++lastProductId,
        name: name,
        units: units,
        quantity : quantity,
        price: price
    }
    products.push(product);

    res.status(200).send('Product was succesfully added');
});

// PUT  UPDATE
app.put('/api/v1/products/:id', (req, res) => {
    const product = products.find(el => el.id === +req.params.id);
    if (!product) return res.status(404).send(`There is no product with id=${req.params.id} in the list`);
    
    const {id, name, units, quantity, price} = req.body;

        product.name = name;
        product.units = units;
        product.quantity = quantity;
        product.price = price;

        res.status(200).send('Product was succesfully updated');
    
});

//DELETE 
app.delete('/api/v1/products/:id', (req, res) => {
    const product = products.find(el => el.id === +req.params.id);
    if (!product) return res.status(404).send(`There is no product with id=${req.params.id} in the list`);
    
    const index = products.indexOf(product);
    products.splice(index, 1)

    res.status(200).send('Product was succesfully deleted');

});

app.listen(port, host, () => {
    console.log(`Start listening on http://${host}:${port}`);
})