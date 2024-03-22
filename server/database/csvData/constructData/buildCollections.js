const createCollection = require('./createCollection');

function buildCollections() {
  createCollection('features');
  createCollection('photos');
  createCollection('products');
  createCollection('related');
  createCollection('skus');
  createCollection('styles');
}

buildCollections();
