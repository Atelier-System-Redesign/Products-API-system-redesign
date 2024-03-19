const Product = require('../database/db');

module.exports = (productId) => Product.find({ id: productId }, 'relatedItems -_id');
