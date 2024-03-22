require('dotenv').config();
const mongoose = require('mongoose');

const relatedDataSchema = new mongoose.Schema({
  id: Number,
  current_product_id: { type: Number, index: true },
  related_product_id: Number,
}, { collection: 'relatedData' });

const dbName = 'products';

const uri = `mongodb://localhost:27017/${dbName}`;

mongoose.connect(uri);

const relatedData = mongoose.model('relatedData', relatedDataSchema);

module.exports = relatedData;
