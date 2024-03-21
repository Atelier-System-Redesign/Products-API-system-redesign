require('dotenv').config();
const mongoose = require('mongoose');

const featuresDataSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  feature: String,
  value: String,
}, { collection: 'featuresData' });

const dbName = 'products';

const uri = `mongodb://localhost:27017/${dbName}`;

mongoose.connect(uri);

const FeatureData = mongoose.model('FeatureData', featuresDataSchema);

module.exports = FeatureData;
