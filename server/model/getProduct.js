const Product = require('../database/db');

module.exports = (productId) => Product.find({ id: productId }, 'id name slogan description category default_price features -_id');
