const { getStyles } = require('../model');

module.exports = (req, res) => {
  const productId = req.params.product_id;
  getStyles(productId)
    .then((results) => {
      if (results.length) {
        const result = { ...results[0] }._doc;
        result.product_id = result.id.toString();
        delete result.id;
        res.send(result);
      } else {
        res.send([]);
      }
    });
};
