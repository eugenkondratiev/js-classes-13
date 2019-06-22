const constants = require('../libs/constants');
const base = require('./products-base');

let lastProductId = 0;

const products = [];
// const products = [
// 	{
//     id: ++lastProductId,
//     name: 'banana',
//     unit: "kg",
//     quantity: 30,
//     price: 32
// },
// {
//     id: ++lastProductId,
//     name: "apple",
//     unit: "kg",
//     quantity: 10,
//     price: 22

// },
// {
//     id: ++lastProductId,
//     name: "peach",
//     unit: "kg",
//     quantity: 15,
//     price: 60

// }
// ];

class Model {
	constructor() {
        base.readProductsBase()
            .then( data => {
                JSON.parse(data).forEach(element => {
                    ++lastProductId;
                    products.push(element);
                });;

                console.log("products first read: \n", products);
            })
            .catch(err => {
                console.log("read file err = " , err);
            });
            
    }

	getProducts() {return products;}
    
    getProduct(id) {
        const product = products.find(el => el.id === +id);
        if (!product) throw new Error(constants.ERR_NO_PRODUCT);

        return product// логика извлечения продукта, например через find
    }
//=========================================
	addProduct(newProduct) {

        const {name, units, quantity, price} = newProduct;
        const product = {
            id: ++lastProductId,
            name: name,
            units: units,
            quantity : quantity,
            price: price
        }
        products.push(product);
        
        try {
            base.updateProductsBase(products);        
        } catch (error) {
            console.log(error.message);
        } finally {
            return product;
        }
    }
//=========================================
    updateProduct(_id, newProduct) {
        const product = products.find(el => el.id === +_id);
        if (!product) throw new Error(constants.ERR_NO_PRODUCT);
    
        const {id, name, units, quantity, price} = newProduct;

        product.name = name;
        product.units = units;
        product.quantity = quantity;
        product.price = price;

        try {
            base.updateProductsBase(products);        
        } catch (error) {
            console.log(error.message);
        } finally {
            return product;
        }
    }
//=========================================
    deleteProduct(id) { 
        const product = products.find(el => el.id === +id);

        if (!product) throw new Error(constants.ERR_NO_PRODUCT);

        const index = products.indexOf(product);
        products.splice(index, 1);
        try {
            base.updateProductsBase(products);        
        } catch (error) {
            console.log(error.message);
        } finally {
            return true;
        }
    }

}

module.exports = Model;

