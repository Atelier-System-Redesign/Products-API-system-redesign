const fs = require('fs');
const csv = require('csv-parser');
const { Transform } = require('stream');

const readStream = fs.createReadStream('./server/database/csvData/styles.csv');
const writeStream = fs.createWriteStream('./server/database/jsonData/styles.json');

// Transform stream to convert CSV lines to JSON objects
const csvToJsonTransform = new Transform({
  writableObjectMode: true,
  readableObjectMode: true,
  transform(chunk, encoding, callback) {
    this.push(`${JSON.stringify(chunk)}\n`); // Convert object to JSON string
    callback();
  },
});

// Start of JSON array
writeStream.write('[\n');

let isFirstChunk = true;
readStream
  .pipe(csv())
  .pipe(csvToJsonTransform)
  .on('data', (chunk) => {
    if (!isFirstChunk) {
      writeStream.write(',\n'); // Add comma between objects
    }
    writeStream.write(chunk);
    isFirstChunk = false;
  })
  .on('end', () => {
    // End of JSON array
    writeStream.write('\n]');
    console.log('Data successfully saved to output.json');
  })
  .on('error', (err) => {
    console.error('An error occurred:', err);
  });
