const express = require('express')
const app = express();

const host = '127.0.0.1';
const getPort = require('./gen-port');
const port = getPort.getFreePort();

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

// GET
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

// POST
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
// app.put();

// app.delete();
app.listen(port, host, () => {
    console.log(`Start listening on http://${host}:${port}`);
})