const fs = require('fs');
const readline = require('readline');
const fastcsv = require('fast-csv');

let counter = 0;

const stream = fs.createWriteStream('server/database/csvData/cleanData/cleanedPhotosData.csv');
const csvStream = fastcsv.format({ headers: true });
csvStream.pipe(stream);

const rl = readline.createInterface({
  input: fs.createReadStream('server/database/csvData/photos.csv'),
  output: process.stdout,
  terminal: false,
});

rl.on('line', (line) => {
  let quoteCount = 0;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      quoteCount += 1;
    }
  }
  // If the count of quotes is odd, append one to close the last open quote
  if (quoteCount % 2 !== 0) {
    line += '"';
  }
  // Now parse the corrected line as CSV and write it to the output
  fastcsv
    .parseString(line, { headers: false })
    .on('data', (data) => csvStream.write(data))
    .on('end', () => {});
  console.log(`Working... ${counter}`);
  counter += 1;
});

rl.on('close', () => {
  // Close the CSV stream
  csvStream.end();
  console.log('Write to cleanedStylesData.csv completed.');
});
