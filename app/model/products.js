const constants = require('../libs/constants');

let lastProductId = 0;

const products = [
	{
    id: ++lastProductId,
    name: 'banana',
    unit: "kg",
    quantity: 30,
    price: 32
},
{
    id: ++lastProductId,
    name: "apple",
    unit: "kg",
    quantity: 10,
    price: 22

},
{
    id: ++lastProductId,
    name: "peach",
    unit: "kg",
    quantity: 15,
    price: 60

}
];

class Model {
	constructor() {
        // console.log("Model created", this);
        // console.log("this.getProducts() ", this.getProducts);

    }

	getProducts() {return products;}
    
    getProduct(id) {
        const product = products.find(el => el.id === +id);
        //console.log(product);
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

        return product;
    }
//=========================================
    updateProduct(_id, newProduct) {
        const product = products.find(el => el.id === +_id);
        console.log(_id, product);
        if (!product) throw new Error(constants.ERR_NO_PRODUCT);
    
        const {id, name, units, quantity, price} = newProduct;

        product.name = name;
        product.units = units;
        product.quantity = quantity;
        product.price = price;

        return product;
    }
//=========================================
    deleteProduct(id) { 
        const product = products.find(el => el.id === +id);
        //console.log(id, product);
        if (!product) throw new Error(constants.ERR_NO_PRODUCT);

        const index = products.indexOf(product);
        products.splice(index, 1);
        return true;
    }

}

module.exports = Model;

