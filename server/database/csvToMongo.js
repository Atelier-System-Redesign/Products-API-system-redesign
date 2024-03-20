const fs = require('fs');
const csv = require('csv-parser');

const results = [];

fs.createReadStream('./server/database/csvData/stylesTest.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    // Now 'results' contains the parsed CSV data as an array of objects

    // Convert the array of objects to JSON format
    const jsonData = JSON.stringify(results, null, 2); // Prettify the JSON output

    // Replace 'output.json' with your desired JSON file name
    fs.writeFile('./server/database/jsonData/stylesTest.json', jsonData, (err) => {
      if (err) {
        console.error('There was an error writing the JSON data to a file:', err);
      } else {
        console.log('Data successfully saved to output.json');
      }
    });
  });
