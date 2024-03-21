require('dotenv').config();
const mongoose = require('mongoose');

const skusDataSchema = new mongoose.Schema({
  id: Number,
  style_id: Number,
  size: String,
  quantity: Number,
}, { collection: 'skusData' });

const dbName = 'products';

const uri = `mongodb://localhost:27017/${dbName}`;

mongoose.connect(uri);

const SkusData = mongoose.model('SkusData', skusDataSchema);

module.exports = SkusData;
