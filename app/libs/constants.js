function getNoProductMsg(id) {
    return `There is no product with id=${id} in the list`;
};

function getUsdPriceMsg(productPrice, usdUah) {
    return `Price for this in USD = ${(productPrice / usdUah).toFixed(2)}`;
};


module.exports = {
    ERR_NO_PRODUCT : "NO SUCH PRODUCT",
    getNoProductMsg : getNoProductMsg,
    getUsdPriceMsg: getUsdPriceMsg,
    msgProductAdded : 'Product was succesfully added',
    msgProductDeleted : 'Product was succesfully deleted',
    msgProductUpdated : 'Product was succesfully updated',
}

