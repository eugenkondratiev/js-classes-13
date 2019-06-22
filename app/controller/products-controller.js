const constants = require('../libs/constants');

class ProductsController {
	constructor(model) {
		this.model = model;
		// console.log(this.model);
		// console.log("getProducts", this.model.getProducts);

}

commonGet(req, res) {
	//console.log("ProductsController this", this);
	res.send('WELCOME TO OUR SHOP');
}

productsGet(req, res) {
	//console.log(this);
	const products = this.model.getProducts();
	res.send(products);
}

productGet(req, res) {
	// здесь и далее id мы должны передавать внутрь методов модели
	// модель будет возвращать продукт и мы его уже показываем
	const id = +req.params.id;
	try {
		const product = this.model.getProduct(id);
		res.send(product);		
	} catch (error) {
		if (error.message == constants.ERR_NO_PRODUCT) {
			res.send(constants.getNoProductMsg(id));
		}
	}
}

productPost(req, res) {
	this.model.addProduct(req.body);

    res.status(200).send(constants.msgProductAdded);

}

// put
productPut(req, res) {
	const id = +req.params.id;
	try {
		this.model.updateProduct(id, req.body);
		res.status(200).send(constants.msgProductUpdated);
	} catch (error) {
		if (error.message == constants.ERR_NO_PRODUCT) {
			res.send(constants.getNoProductMsg(id));
		}
	}
}
// delete
productDelete(req, res) {
	const id = +req.params.id;
	try {
		this.model.deleteProduct(id);
		res.status(200).send(constants.msgProductDeleted);
	} catch (error) {
		if (error.message == constants.ERR_NO_PRODUCT) {
			res.send(constants.getNoProductMsg(id));
		}
	}
}

}



module.exports = ProductsController;

