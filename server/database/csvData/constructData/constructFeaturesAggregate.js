const mongoose = require('mongoose');
const Product = require('../../db');
const FeaturesData = require('../../dataModels/featuresDataModel');

// Function to aggregate features by product_id
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

// Function to update products with aggregated features
async function updateProducts(aggregatedFeatures) {
  let batchOperations = [];
  const batchSize = 1000; // Adjust based on performance and memory considerations

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
      // Execute batch operation
      await Product.bulkWrite(batchOperations).catch(error => {
        console.error('Error processing batch:', error);
      });
      console.log(`Processing ${i + 1} / ${aggregatedFeatures.length} ${Math.floor(((i + 1) / aggregatedFeatures.length) * 100)}% complete`);
      batchOperations = []; // Reset after each batch
    }
  }
}

// Main function to aggregate features and update products
async function addFeaturesToProducts() {
  try {
    await FeaturesData.createIndexes({ product_id: 1 });
    const aggregatedFeatures = await aggregateFeatures();
    await updateProducts(aggregatedFeatures);
    console.log('All features have been added to products.');
  } catch (error) {
    console.error('Error adding features to products:', error);
  }
}

// Run the main function
addFeaturesToProducts().then(() => {
  mongoose.disconnect();
});
