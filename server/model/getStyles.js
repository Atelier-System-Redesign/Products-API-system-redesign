const Product = require('../database/db');

module.exports = (productId) => Product.find({ id: productId }, 'results -_id');
