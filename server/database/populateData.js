const populateTestDataDogs = require('./testDataDogs');
const Product = require('./db');

function insertProducts(products) {
  Product.insertMany(products)
    .then((result) => {
      console.log(`insertProducts result: ${result.length}`);
      return result;
    });
}

// TESTING FUNCTIONS!!! DELETE!!!

// POPULATE TEST DATA

// populateTestDataDogs(10, insertProducts);

// VIEW DATABASE

// Product.find({})
//   .then((results) => results.forEach((result) => console.log(JSON.stringify(result))));

// DELETE FROM DATABASE

Product.deleteMany({ id: { $gte: 0, $lte: 1000000000 } })
  .then((results) => console.log(JSON.stringify(results)));
