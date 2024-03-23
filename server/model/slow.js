const Product = require('../database/db');

module.exports = () => Product.findOne({ 'results.0.style_id': 977992 });
