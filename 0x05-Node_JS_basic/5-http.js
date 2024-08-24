const http = require('http');
const fs = require('fs');
const countStudents = require('./3-read_file_async'); // Import the function from 3-read_file_async.js

// Retrieve the database file path from command-line arguments
const databasePath = process.argv[2];

// Create an HTTP server
const app = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      // Handle root path
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello Holberton School!\n');
    } else if (req.url === '/students') {
      // Handle /students path
      res.writeHead(200, { 'Content-Type': 'text/plain' });

      // Check if the database file is provided and exists
      if (databasePath && fs.existsSync(databasePath)) {
        countStudents(databasePath)
          .then(() => {
            // Output the student data
            res.end();
          })
          .catch(() => {
            // Error handling
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Cannot load the database\n');
          });
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Cannot load the database\n');
      }
    } else {
      // Handle unknown paths
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found\n');
    }
  } else {
    // Handle non-GET methods
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed\n');
  }
});

// Make the server listen on port 1245
app.listen(1245, () => {
  console.log('Server is listening on port 1245');
});

// Export the server instance
module.exports = app;
