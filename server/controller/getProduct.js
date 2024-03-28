const { getProduct, cacheFirstQuery } = require('../model');

module.exports = (req, res) => {
  const productId = req.params.product_id;
  cacheFirstQuery('getProduct', getProduct, productId)
    .then((results) => res.send(results[0]));
};

// const { getProduct } = require('../model');

// module.exports = (req, res) => {
//   const productId = req.params.product_id;
//   getProduct(productId)
//     .then((results) => res.send(results[0]));
// };
