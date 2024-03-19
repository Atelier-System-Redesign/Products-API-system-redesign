const mongoose = require('mongoose');

const featuresSchema = new mongoose.Schema([{
  feature: String,
  value: String,
}]);

const photosSchema = new mongoose.Schema([{
  thumbnail_url: String,
  url: String,
}]);

const resultsSchema = new mongoose.Schema([{
  style_id: Number,
  name: String,
  original_price: String,
  sale_price: { type: String, default: null },
  isDefault: Boolean,
  photos: [photosSchema],
  skus: {
    type: Map,
    of: new mongoose.Schema({
      quantity: Number,
      size: String,
    }),
  },
}]);

const productSchema = new mongoose.Schema({
  id: Number,
  node_id: String,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: [featuresSchema],
  results: [resultsSchema],
});

module.exports = productSchema;
