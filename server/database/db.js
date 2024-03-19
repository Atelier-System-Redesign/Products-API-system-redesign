require('dotenv').config();
const mongoose = require('mongoose');
const productSchema = require('./productSchema');

const dbName = 'products';

const uri = `mongodb://localhost:27017/${dbName}`;

mongoose.connect(uri);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
