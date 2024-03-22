/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
const Product = require('../../db');
const RelatedData = require('../../dataModels/relatedDataModel');
const constructStyles = require('./constructStyles');

module.exports = function constructRelated() {
  async function aggregateRelated() {
    return RelatedData.aggregate([
      {
        $group: {
          _id: '$current_product_id',
          relatedItems: {
            $push: '$related_product_id',
          },
        },
      },
    ]).exec();
  }

  async function updateProducts(aggregatedRelated) {
    let batchOperations = [];
    const batchSize = 1000;

    for (let i = 0; i < aggregatedRelated.length; i += 1) {
      const featureGroup = aggregatedRelated[i];
      const updateOperation = {
        updateOne: {
          filter: { id: featureGroup._id },
          update: {
            $push: {
              relatedItems: { $each: featureGroup.relatedItems },
            },
          },
        },
      };

      batchOperations.push(updateOperation);

      if (batchOperations.length >= batchSize || i === aggregatedRelated.length - 1) {
        await Product.bulkWrite(batchOperations).catch((error) => {
          console.error('Error processing batch:', error);
        });
        console.log(`Adding Related Products to Products. Documents processed: ${i + 1} / ${aggregatedRelated.length}, approximately ${Math.floor(((i + 1) / aggregatedRelated.length) * 100)}% complete`);
        batchOperations = [];
      }
    }
  }

  async function addFeaturesToProducts() {
    try {
      await RelatedData.createIndexes({ product_id: 1 });
      const aggregatedRelated = await aggregateRelated();
      await updateProducts(aggregatedRelated);
      console.log('All related items have been added to products.');
      console.log('Next running "node server/database/csvData/constructData/constructStyles.js"');
      constructStyles();
    } catch (error) {
      console.error('Error adding related items to products:', error);
    }
  }

  addFeaturesToProducts();
};
