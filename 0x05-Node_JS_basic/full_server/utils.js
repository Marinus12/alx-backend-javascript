import fs from 'fs';
import path from 'path';

export function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        return reject(err);
      }

      const lines = data.trim().split('\n').filter(line => line.trim() !== '');
      const fields = {};

      lines.slice(1).forEach(line => {
        const [firstName, , , field] = line.split(',');
        if (field) {
          if (!fields[field]) {
            fields[field] = [];
          }
          fields[field].push(firstName);
        }
      });

      resolve(fields);
    });
  });
}
