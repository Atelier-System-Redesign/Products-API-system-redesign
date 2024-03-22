/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
const mongoose = require('mongoose');
const Product = require('../../db');
const StylesData = require('../../dataModels/stylesDataModel');

module.exports = async function constructStyles() {
  const documentCount = await StylesData.countDocuments();
  function aggregateStyles() {
    const aggregation = StylesData.aggregate([
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
    ]);

    return aggregation.cursor();
  }

  async function updateProducts(aggregatedStylesCursor) {
    let batchOperations = [];
    const batchSize = 1000;
    let documentsProcessed = 0;

    for await (const featureGroup of aggregatedStylesCursor) {
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

      if (batchOperations.length >= batchSize) {
        await Product.bulkWrite(batchOperations).catch((error) => {
          documentsProcessed += batchOperations.length;
          console.error('Error processing batch:', error);
        });
        console.log(`Adding Styles to Products. Documents processed: ${documentsProcessed} / ${documentCount}, approximately ${Math.floor((documentsProcessed / documentCount) * 100)}% complete`);
        batchOperations = [];
      }
    }

    if (batchOperations.length > 0) {
      await Product.bulkWrite(batchOperations).catch((error) => {
        documentsProcessed += batchOperations.length;
        console.error('Error processing batch:', error);
      });
      console.log(`Final batch processed. Documents processed: ${batchOperations.length}`);
    }
  }

  async function addStylesToProducts() {
    try {
      await StylesData.createIndexes({ product_id: 1 });
      const aggregatedStylesCursor = aggregateStyles();
      await updateProducts(aggregatedStylesCursor);
      console.log('All styles have been added to products.');
      console.log('ETL complete. Closing connection');
      mongoose.disconnect();
    } catch (error) {
      console.error('Error adding styles to products:', error);
    }
  }

  addStylesToProducts();
};
