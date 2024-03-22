/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
const Product = require('../../db');
const FeaturesData = require('../../dataModels/featuresDataModel');
const constructPhotos = require('./constructPhotos');

module.exports = function constructFeatures() {
  async function aggregateFeatures() {
    return FeaturesData.aggregate([
      {
        $group: {
          _id: '$product_id',
          features: {
            $push: {
              feature: '$feature',
              value: '$value',
            },
          },
        },
      },
    ]).exec();
  }

  async function updateProducts(aggregatedFeatures) {
    let batchOperations = [];
    const batchSize = 1000;

    for (let i = 0; i < aggregatedFeatures.length; i += 1) {
      const featureGroup = aggregatedFeatures[i];
      const updateOperation = {
        updateOne: {
          filter: { id: featureGroup._id },
          update: {
            $push: {
              features: { $each: featureGroup.features },
            },
          },
        },
      };

      batchOperations.push(updateOperation);

      if (batchOperations.length >= batchSize || i === aggregatedFeatures.length - 1) {
        await Product.bulkWrite(batchOperations).catch((error) => {
          console.error('Error processing batch:', error);
        });
        console.log(`Adding Features to Products. Documents processed: ${i + 1} / ${aggregatedFeatures.length}, approximately ${Math.floor(((i + 1) / aggregatedFeatures.length) * 100)}% complete`);
        batchOperations = [];
      }
    }
  }

  async function addFeaturesToProducts() {
    try {
      await FeaturesData.createIndexes({ product_id: 1 });
      const aggregatedFeatures = await aggregateFeatures();
      await updateProducts(aggregatedFeatures);
      console.log('All features have been added to products.');
      console.log('Next running "node server/database/csvData/constructData/constructPhotos.js"');
      constructPhotos();
    } catch (error) {
      console.error('Error adding features to products:', error);
    }
  }

  addFeaturesToProducts();
};
