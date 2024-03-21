require('dotenv').config();
const mongoose = require('mongoose');

const photosDataSchema = new mongoose.Schema({
  id: Number,
  styleId: Number,
  url: String,
  thumbnail_url: String,
}, { collection: 'photosData' });
const dbName = 'products';

const uri = `mongodb://localhost:27017/${dbName}`;

mongoose.connect(uri);

const PhotosData = mongoose.model('PhotosData', photosDataSchema);

module.exports = PhotosData;
