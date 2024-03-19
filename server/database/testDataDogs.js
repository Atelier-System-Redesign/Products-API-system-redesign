module.exports = (quantity, callback) => {
  const testArray = [];
  for (let i = 0; i < quantity; i += 1) {
    const product = {
      id: i,
      name: `dog #${i}`,
      slogan: "man's best friend",
      description: 'just the best',
      category: 'k9',
      default_price: 'priceless',
      features: [{
        feature: 'cute',
        value: 'very',
      }],
      results: [{
        style_id: quantity - i,
        name: 'fluffy',
        original_price: 'cleaning up dog hair',
        sale_price: 'hypoallergenic doodles',
        isDefault: true,
        photos: [{
          thumbnail_url: 'https://miro.medium.com/v2/resize:fit:1400/1*4qGuf0yirmuDTSs810VCWg.jpeg',
          url: 'https://miro.medium.com/v2/resize:fit:1400/1*4qGuf0yirmuDTSs810VCWg.jpeg',
        }],
        skus: {
          1: {
            quantity: 9001,
            size: 'all',
          },
        },
      }],
      relatedItems: [1, 2, 3, 4, 5],
    };
    testArray.push(product);
  }
  callback(testArray);
};
