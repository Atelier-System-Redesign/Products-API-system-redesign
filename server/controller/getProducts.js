const { getProducts, cacheFirstQuery } = require('../model');

module.exports = (req, res) => {
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  cacheFirstQuery('getProducts', getProducts, page, count)
    .then((results) => res.send(results));
};
