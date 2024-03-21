const Product = require('../database/db');

module.exports = (productId) => Product.find({ id: productId }, 'id results -_id');
