const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const PORT = 1245;

const app = http.createServer(async (req, res) => {
  try {
    if (req.url === '/') {
      // Handle the root path
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello Holberton School!\n');
    } else if (req.url === '/students') {
      // Handle the /students path
      const databasePath = process.argv[2];
      if (!databasePath) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Error: Database file path not provided\n');
        return;
      }

      try {
        const data = await fs.readFile(databasePath, 'utf-8');
        const lines = data.trim().split('\n');
        if (lines.length === 0) throw new Error('Cannot load the database');

        let result = 'This is the list of our students\n';
        result += `Number of students: ${lines.length - 1}\n`;

        const fields = {};
        lines.slice(1).forEach((line) => {
          if (line) {
            const values = line.split(',');
            const field = values[3];
            const firstName = values[0];

            if (!fields[field]) {
              fields[field] = [];
            }
            fields[field].push(firstName);
          }
        });

        for (const [field, students] of Object.entries(fields)) {
          result += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(result);
      } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Cannot load the database\n');
      }
    } else {
      // Handle other paths
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Not Found\n');
    }
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Internal Server Error\n');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

module.exports = app;
