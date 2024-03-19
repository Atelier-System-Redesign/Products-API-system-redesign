const Product = require('../database/db');

module.exports = (page = 1, count = 5) => Product.find({}, 'id name slogan description category default_price -_id')
  .sort({ id: 'asc' })
  .skip((page - 1) * count)
  .limit(count);
