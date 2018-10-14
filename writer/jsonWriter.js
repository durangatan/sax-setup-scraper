import fs from 'fs';

// Writer
// A basic promisified write-to-json implementation
export default function writeToJson(data, filePath = './setups.json') {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8', error => {
      if (error) reject(error);
      resolve();
    });
  });
}
