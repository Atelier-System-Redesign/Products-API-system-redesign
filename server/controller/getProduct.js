const { getProduct, cacheFirstQuery } = require('../model');

module.exports = (req, res) => {
  const productId = req.params.product_id;
  cacheFirstQuery('getProduct', getProduct, productId)
    .then((results) => res.send(results[0]));
};
