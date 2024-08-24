const http = require('http');

// Create an HTTP server
const app = http.createServer((req, res) => {
  // Set the content type to plain text
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  // Send the response
  res.end('Hello Holberton School!\n');
});

// Make the server listen on port 1245
app.listen(1245, () => {
  console.log('Server is listening on port 1245');
});

// Export the server instance
module.exports = app;
