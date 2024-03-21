const Product = require('../database/db');

module.exports = (productId) => Product.find({ id: productId }, { _id: 0, __v: 0 });
