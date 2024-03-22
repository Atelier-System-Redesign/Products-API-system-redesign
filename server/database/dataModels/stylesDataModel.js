require('dotenv').config();
const mongoose = require('mongoose');

const photosSchema = new mongoose.Schema({
  thumbnail_url: String,
  url: String,
}, { _id: false });

const skusSchema = new mongoose.Schema({
  quantity: Number,
  size: String,
}, { _id: false });

const stylesDataSchema = new mongoose.Schema({
  id: { type: Number, index: true },
  product_id: { type: Number, index: true },
  name: String,
  sale_price: String,
  original_price: Number,
  default_style: Number,
  photos: [photosSchema],
  skus: {
    type: Map,
    of: skusSchema,
  },
}, { collection: 'stylesData' });

const dbName = 'products';

const uri = `mongodb://localhost:27017/${dbName}`;

mongoose.connect(uri);

const StylesData = mongoose.model('StylesData', stylesDataSchema);

module.exports = StylesData;
