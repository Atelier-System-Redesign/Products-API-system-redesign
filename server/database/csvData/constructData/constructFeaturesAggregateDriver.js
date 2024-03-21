const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'products';

async function run() {
  try {
    await client.connect();
    console.log('Connected successfully to server');
    const database = client.db(dbName);
    const products = database.collection('products');
    const featuresData = database.collection('featuresData');

    // Ensure index on product_id
    await featuresData.createIndex({ product_id: 1 });
    console.log('Index on product_id created successfully.');

    // Aggregate features by product_id
    const pipeline = [
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
    ];
    const aggregatedFeatures = await featuresData.aggregate(pipeline).toArray();

    // Define batch size
    const batchSize = 1000; // Adjust this based on your preference and system capabilities

    for (let i = 0; i < aggregatedFeatures.length; i += batchSize) {
      const batch = aggregatedFeatures.slice(i, i + batchSize);
      const bulkOps = batch.map((featureGroup) => ({
        updateOne: {
          filter: { id: featureGroup._id },
          update: {
            $push: {
              features: { $each: featureGroup.features },
            },
          },
        },
      }));

      // Execute the bulk operation
      await products.bulkWrite(bulkOps);
      console.log(`Processed batch ${i / batchSize + 1}/${Math.ceil(aggregatedFeatures.length / batchSize)}`);
    }

    console.log('All features have been added to products.');
  } catch (err) {
    console.error('An error occurred:', err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
