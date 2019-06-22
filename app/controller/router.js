class Router {
	constructor(app, productsController) {
		this.app = app;
		this.productsController = productsController;
		//console.log("this.app", this.app);
		//console.log("this.productsController", productsController);
		//console.log("this.productsController.productsGet", productsController.productsGet);
		
	this.commonGet(productsController.commonGet);
	this.productsGet(productsController.productsGet);
	this.productGet(productsController.productGet);
	this.usdPriceGet(productsController.usdPriceGet);

	// …
	this.productPost(productsController.productPost);
	this.productUpdate(productsController.productPut);
	this.productDelete(productsController.productDelete);
}

commonGet(callback) {
	// console.log("callback", callback);
	this.app.get('/', callback.bind(this.productsController));
}

productsGet(callback) {
	this.app.get('/api/v1/products/', callback.bind(this.productsController));
}

productGet(callback) {
	this.app.get('/api/v1/products/:id',  callback.bind(this.productsController));
}

usdPriceGet(callback) {
	this.app.get('/api/v1/products/:id/usd',  callback.bind(this.productsController));
}

//post
productPost(callback) {
	this.app.post('/api/v1/products/',  callback.bind(this.productsController));
}

// put
productUpdate(callback) {
	this.app.put('/api/v1/products/:id',  callback.bind(this.productsController));
}

// delete
productDelete(callback) {
	this.app.delete('/api/v1/products/:id',  callback.bind(this.productsController));
}

}

module.exports = Router;