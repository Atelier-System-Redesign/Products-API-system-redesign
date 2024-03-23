const { slow } = require('../model');

module.exports = (req, res) => {
  slow()
    .then((results) => res.send(results));
};
