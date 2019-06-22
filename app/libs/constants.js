function getNoProductMsg(id) {
    return `There is no product with id=${id} in the list`;
};

function getUsdPriceMsg(productName = 1 , productPrice = 33 , usdUah = 26.9 ) {
    return `Price for product "${productName}" in USD is $${(productPrice / usdUah).toFixed(2)}`;
};


module.exports = {
    ERR_NO_PRODUCT : "NO SUCH PRODUCT",
    getNoProductMsg : getNoProductMsg,
    getUsdPriceMsg: getUsdPriceMsg,
    msgProductAdded : 'Product was succesfully added',
    msgProductDeleted : 'Product was succesfully deleted',
    msgProductUpdated : 'Product was succesfully updated',
    currencyApiURL : 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'

}

