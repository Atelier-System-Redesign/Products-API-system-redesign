const getProduct = require('./getProduct');
const getProducts = require('./getProducts');
const getStyles = require('./getStyles');
const getRelatedProducts = require('./getRelatedProducts');
const slow = require('./slow');
const cacheFirstQuery = require('./cacheFirstQuery');

module.exports = {
  getProduct, getProducts, getStyles, getRelatedProducts, slow, cacheFirstQuery,
};
