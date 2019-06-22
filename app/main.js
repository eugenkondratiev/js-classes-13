const express = require('express');
const app = express();
const Router = require('./controller/router');
const ProductsController = require('./controller/products-controller');
const Model = require('./model/products');

const host = '127.0.0.1';
// const getPort = require('./gen-port');
// const port = getPort.getFreePort();
const port = 30000;


app.use(express.json());


const productsController = new ProductsController(new Model());

const router = new Router(app, productsController);

app.listen(port, host, () => {
    console.log(`Start listening on http://${host}:${port}`);
});

// router.app.listen(port, host, () => {
//     console.log(`Start listening on http://${host}:${port}`);
// });

