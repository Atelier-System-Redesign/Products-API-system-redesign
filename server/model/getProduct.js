require('dotenv').config();
const Memcached = require('memcached');
const Product = require('../database/db');

const memcached = new Memcached(process.env.MEMCACHED_CLUSTER);

// module.exports.getProduct = (productId) => Product.find({ id: productId }, {
//   _id: 0,
//   __v: 0,
//   // id: 0,
//   // name: 0,
//   // slogan: 0,
//   // description: 0,
//   // category: 0,
//   // default_price: 0,
//   relatedItems: 0,
//   // features: 0,
//   results: 0,
// });

module.exports.getProduct = (productId) => new Promise((resolve, reject) => {
  // Create a unique cache key for the product based on its productId
  const cacheKey = `product_${productId}`;

  // First, attempt to retrieve the product data from Memcached
  memcached.get(cacheKey, async (err, data) => {
    if (err) {
      // Handle any error that occurred during the fetch from Memcached
      console.error('Memcached get error:', err);
      reject(err);
    }

    if (data) {
      // Cache hit; return the cached data
      resolve(data);
    } else {
      // Cache miss; fetch the data from the database
      try {
        const productData = await Product.find({ id: productId }, {
          _id: 0,
          __v: 0,
          relatedItems: 0,
          results: 0,
        });

        if (productData) {
          // Store the fetched data in Memcached before returning it,
          // with an expiration time (e.g., 300 seconds = 5 minutes)
          memcached.set(cacheKey, productData, 300, (error) => {
            if (error) console.error('Memcached set error:', error);
            // Even if there's an error setting the cache, return the fetched data
          });
        }

        resolve(productData);
      } catch (dbError) {
        // Handle database query errors
        console.error('Database query error:', dbError);
        reject(dbError);
      }
    }
  });
});
