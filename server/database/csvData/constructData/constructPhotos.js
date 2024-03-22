/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
const StylesData = require('../../dataModels/stylesDataModel');
const PhotosData = require('../../dataModels/photosDataModel');
const constructSkus = require('./constructSkus');

module.exports = function constructPhotos() {
  async function aggregateFeatures() {
    return PhotosData.aggregate([
      {
        $group: {
          _id: '$styleId',
          photos: {
            $push: {
              url: '$url',
              thumbnail_url: '$thumbnail_url',
            },
          },
        },
      },
    ]).exec();
  }

  async function updateStyles(aggregatedPhotos) {
    let batchOperations = [];
    const batchSize = 1000;

    for (let i = 0; i < aggregatedPhotos.length; i += 1) {
      const featureGroup = aggregatedPhotos[i];
      const updateOperation = {
        updateOne: {
          filter: { id: featureGroup._id },
          update: {
            $push: {
              photos: { $each: featureGroup.photos },
            },
          },
        },
      };

      batchOperations.push(updateOperation);

      if (batchOperations.length >= batchSize || i === aggregatedPhotos.length - 1) {
        await StylesData.bulkWrite(batchOperations).catch((error) => {
          console.error('Error processing batch:', error);
        });
        console.log(`Adding Photos so Styles. Documents processed: ${i + 1} / ${aggregatedPhotos.length}, approximately ${Math.floor(((i + 1) / aggregatedPhotos.length) * 100)}% complete`);
        batchOperations = [];
      }
    }
  }

  async function addPhotosToStyles() {
    try {
      const aggregatedPhotos = await aggregateFeatures();
      await updateStyles(aggregatedPhotos);
      console.log('All photos have been added to styles.');
      console.log('Next running "node server/database/csvData/constructData/constructSkus.js"');
      constructSkus();
    } catch (error) {
      console.error('Error adding photos to styles:', error);
    }
  }

  addPhotosToStyles();
};
