const { getProducts } = require('../model');

module.exports = (req, res) => {
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  getProducts(page, count)
    .then((results) => res.send(results));
};
