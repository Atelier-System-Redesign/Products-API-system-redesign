const Product = require('../database/db');

module.exports = (productId) => Product.find({ id: productId }, {
  _id: 0,
  __v: 0,
  // id: 0,
  // name: 0,
  // slogan: 0,
  // description: 0,
  // category: 0,
  // default_price: 0,
  relatedItems: 0,
  // features: 0,
  results: 0,
});
