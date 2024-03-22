const Product = require('../database/db');

module.exports = (page, count) => Product.find({ id: 1 }, { _id: 0, __v: 0 })
  .sort({ id: 'asc' })
  .skip((page - 1) * count)
  .limit(count);
