const Model = require('./productsDataModel');

const getCount = async (callback) => {
  const count = await Model.countDocuments();
  callback(count);
};

getCount((count) => console.log(count));
