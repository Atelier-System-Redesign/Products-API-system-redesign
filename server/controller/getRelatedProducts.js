const { getRelatedProducts, cacheFirstQuery } = require('../model');

module.exports = (req, res) => {
  const productId = req.params.product_id;
  cacheFirstQuery('getRelatedProducts', getRelatedProducts, productId)
    .then((results) => {
      const result = results[0].relatedItems;
      res.send(result);
    });
};
