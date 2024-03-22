/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
const StylesData = require('../../dataModels/stylesDataModel');
const SkusData = require('../../dataModels/skusDataModel');
const constructRelated = require('./constructRelated');

module.exports = function constructSkus() {
  async function aggregateSkus() {
    return SkusData.aggregate([
      {
        $group: {
          _id: '$styleId',
          skus: {
            $push: {
              id: '$id',
              size: '$size',
              quantity: '$quantity',
            },
          },
        },
      },
    ]).exec();
  }

  async function updateStyles(aggregatedSkus) {
    const batchSize = 1000;
    let batchOperations = [];

    for (let i = 0; i < aggregatedSkus.length; i += 1) {
      const skuGroup = aggregatedSkus[i];

      const skusTransformed = skuGroup.skus.reduce((acc, sku) => {
        acc[sku.id] = {
          size: sku.size,
          quantity: sku.quantity,
        };
        return acc;
      }, {});

      batchOperations.push({
        updateOne: {
          filter: { id: skuGroup._id },
          update: {
            $set: { skus: skusTransformed },
          },
        },
      });

      if (batchOperations.length === batchSize || i === aggregatedSkus.length - 1) {
        try {
          await StylesData.bulkWrite(batchOperations);
          console.log(`Adding SKUs to Styles. Documents processed: ${i + 1} / ${aggregatedSkus.length}, approximately ${Math.floor(((i + 1) / aggregatedSkus.length) * 100)}% complete.`);
        } catch (error) {
          console.error(`Error processing batch up to index ${i}:`, error);
        }

        batchOperations = [];
      }
    }
  }

  async function addSkusToStyles() {
    try {
      const aggregatedSkus = await aggregateSkus();
      await updateStyles(aggregatedSkus);
      console.log('All skus have been added to styles.');
      console.log('Next running "node server/database/csvData/constructData/constructRelated.js"');
      constructRelated();
    } catch (error) {
      console.error('Error adding skus to styles:', error);
    }
  }

  addSkusToStyles();
};
