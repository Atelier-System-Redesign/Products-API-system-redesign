const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'products';

async function run() {
  let counter = 0;

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

    // Update products with aggregated features
    for (const featureGroup of aggregatedFeatures) {
      const filter = { id: featureGroup._id };
      const updateDoc = {
        $push: {
          features: { $each: featureGroup.features },
        },
      };
      console.log(`Workign... ${counter}`);
      counter += 1;
      await products.updateOne(filter, updateDoc);
    }
    console.log('All features have been added to products.');
  } catch (err) {
    console.error('An error occurred:', err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
