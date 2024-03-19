const model = require('./index');

model.getProducts()
  .then((results) => {
    console.log('TESTING getProducts():');
    results.forEach((result) => console.log(JSON.stringify(result)));
    return model.getProduct(0);
  })
  .then((result) => {
    console.log('TESTING getProduct(0)');
    Object.keys(result).forEach((key) => console.log(`${key}: ${result[key]}`));
    console.log('RAW DATA');
    console.log(JSON.stringify(result));
    return model.getStyles(0);
  })
  .then((results) => {
    console.log('TESTING getStyles(0)');
    console.log(JSON.stringify(results));
    return model.getRelatedProducts(0);
  })
  .then((result) => {
    console.log('TESTING getRelatedProducts(0)');
    console.log(JSON.stringify(result));
  });
