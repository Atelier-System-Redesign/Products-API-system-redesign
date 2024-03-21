require('dotenv').config();
const mongoose = require('mongoose');

const productsDataSchema = new mongoose.Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
}, { collection: 'productsData' });

const dbName = 'products';

const uri = `mongodb://localhost:27017/${dbName}`;

mongoose.connect(uri);

const ProductsData = mongoose.model('ProductsData', productsDataSchema);

module.exports = ProductsData;
