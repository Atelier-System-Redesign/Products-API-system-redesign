const { spawn } = require('child_process');
const mongoose = require('mongoose');

module.exports = async function createCollection(fileName) {
  return new Promise((resolve, reject) => {
    const command = 'mongoimport';
    const args = [
      '--type=csv',
      '-d', 'products',
      '-c', `${fileName}Data`,
      '--headerline',
      `--file=server/database/csvData/${fileName}.csv`,
    ];

    const mongoImportProcess = spawn(command, args);

    mongoImportProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    mongoImportProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    mongoImportProcess.on('close', (code) => {
      mongoose.disconnect();
      console.log(`child process exited with code ${code}`);
      if (code === 0) {
        resolve(); // Resolve the promise when the process exits successfully
      } else {
        reject(new Error(`child process exited with code ${code}`)); // Reject the promise if there's an error
      }
    });
  });
};
