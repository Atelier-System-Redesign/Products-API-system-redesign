/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
const mongoose = require('mongoose');
const Product = require('../../db');
const StylesData = require('../../dataModels/stylesDataModel');

module.exports = function constructStyles() {
  async function aggregateStyles() {
    return StylesData.aggregate([
      {
        $group: {
          _id: '$productId',
          results: {
            $push: {
              style_id: '$id',
              name: '$name',
              sale_price: '$sale_price',
              original_price: '$original_price',
              'default?': {
                $cond: { if: { $eq: ['$default_style', 1] }, then: true, else: false },
              },
              photos: '$photos',
              skus: '$skus',
            },
          },
        },
      },
    ]).exec();
  }

  async function updateProducts(aggregatedStyles) {
    let batchOperations = [];
    const batchSize = 1000;

    for (let i = 0; i < aggregatedStyles.length; i += 1) {
      const featureGroup = aggregatedStyles[i];
      const updateOperation = {
        updateOne: {
          filter: { id: featureGroup._id },
          update: {
            $push: {
              results: { $each: featureGroup.results },
            },
          },
        },
      };

      batchOperations.push(updateOperation);

      if (batchOperations.length >= batchSize || i === aggregatedStyles.length - 1) {
        await Product.bulkWrite(batchOperations).catch((error) => {
          console.error('Error processing batch:', error);
        });
        console.log(`Adding Styles to Products. Documents processed: ${i + 1} / ${aggregatedStyles.length}, approximately ${Math.floor(((i + 1) / aggregatedStyles.length) * 100)}% complete`);
        batchOperations = [];
      }
    }
  }

  async function addStylesToProducts() {
    try {
      await StylesData.createIndexes({ product_id: 1 });
      const aggregatedStyles = await aggregateStyles();
      await updateProducts(aggregatedStyles);
      console.log('All styles have been added to products.');
      console.log('ETL complete. Closing connection');
      mongoose.disconnect();
    } catch (error) {
      console.error('Error adding styles to products:', error);
    }
  }

  addStylesToProducts();
};
