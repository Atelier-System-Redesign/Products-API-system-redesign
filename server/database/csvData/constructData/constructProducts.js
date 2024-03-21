const Product = require('../../db');
const ProductsData = require('../../dataModels/productsDataModel');

async function copyProductsDataToProductsStream() {
  const cursor = ProductsData.find({}, '-_id').cursor();

  let batch = []; // Array to hold documents for the current batch
  const batchSize = 1000; // Adjust batch size as needed
  let counter = 0;

  cursor.on('data', (doc) => {
    cursor.pause(); // Pause the stream to control flow

    const document = {
      id: doc.id,
      name: doc.name,
      slogan: doc.slogan,
      description: doc.description,
      category: doc.category,
      default_price: doc.default_price.toString(),
    };
    batch.push(document); // Add the current document to the batch

    if (batch.length >= batchSize) {
      // If batch size is reached, insert the batch
      Product.insertMany(batch).then(() => {
        batch = []; // Reset batch
        counter += batchSize;
        console.log(`Processed ${counter} documents...`);
        cursor.resume(); // Resume stream after processing the batch
      }).catch((error) => {
        console.error('Error processing batch:', error);
        cursor.resume(); // Ensure stream resumes even if there's an error
      });
    } else {
      cursor.resume(); // Not enough documents for a batch yet, resume stream
    }
  });

  cursor.on('end', async () => {
    if (batch.length > 0) {
      // Process any remaining documents in the last batch
      try {
        await Product.insertMany(batch);
        counter += batch.length;
        console.log(`Processed the final batch of ${batch.length} documents.`);
      } catch (error) {
        console.error('Error processing final batch:', error);
      }
    }
    console.log(`All documents have been processed. Total: ${counter}`);
  });
}

copyProductsDataToProductsStream();
