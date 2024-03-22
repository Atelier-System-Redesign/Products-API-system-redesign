/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
const Product = require('../../db');
const ProductsData = require('../../dataModels/productsDataModel');
const constructFeatures = require('./constructFeatures');

module.exports = function constructProducts() {
  async function copyProductsDataToProductsStream() {
    const cursor = ProductsData.find({}, '-_id').cursor();

    let batch = [];
    const batchSize = 1000;
    let counter = 0;
    const documentCount = await ProductsData.countDocuments();

    cursor.on('data', (doc) => {
      cursor.pause();

      const document = {
        id: doc.id,
        name: doc.name,
        slogan: doc.slogan,
        description: doc.description,
        category: doc.category,
        default_price: doc.default_price.toString(),
      };
      batch.push(document);

      if (batch.length >= batchSize) {
        Product.insertMany(batch).then(() => {
          batch = [];
          counter += batchSize;
          console.log(`Transforming Products. Documents processed: ${counter} / ${documentCount}, approximately ${Math.floor((counter / documentCount) * 100)}% complete`);
          cursor.resume();
        }).catch((error) => {
          console.error('Error processing batch:', error);
          cursor.resume();
        });
      } else {
        cursor.resume();
      }
    });

    cursor.on('end', async () => {
      if (batch.length > 0) {
        try {
          await Product.insertMany(batch);
          counter += batch.length;
          console.log(`Processed the final batch of ${batch.length} documents.`);
        } catch (error) {
          console.error('Error processing final batch:', error);
        }
      }
      console.log(`All documents have been processed. Total: ${counter}`);
      console.log('Next, running "node server/database/csvData/constructData/constructFeatures.js"');
      constructFeatures();
    });
  }

  copyProductsDataToProductsStream();
};
