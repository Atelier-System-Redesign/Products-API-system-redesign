/* eslint-disable no-param-reassign */
const NodeCache = require('node-cache');

const myCache = new NodeCache();

module.exports = async function getProduct(keyName, queryCallback, ...params) {
  const cacheKey = `${keyName}${JSON.stringify(params)}`;
  let result = myCache.get(cacheKey);

  if (result) {
    return result;
  }
  try {
    result = await queryCallback(...params);
    myCache.set(cacheKey, result);
    console.log('results cached');
    return result;
  } catch (error) {
    console.log(`Error getting product from database: ${error}`);
    throw error;
  }
};
