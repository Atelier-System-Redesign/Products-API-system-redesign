require('dotenv').config();
const mongoose = require('mongoose');

const stylesDataSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  name: String,
  sale_price: String,
  original_price: Number,
  default_style: Number,
}, { collection: 'stylesData' });

const dbName = 'products';

const uri = `mongodb://localhost:27017/${dbName}`;

mongoose.connect(uri);

const StylesData = mongoose.model('StylesData', stylesDataSchema);

module.exports = StylesData;
