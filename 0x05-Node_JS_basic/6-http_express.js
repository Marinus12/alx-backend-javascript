const express = require('express');

// Create an instance of an Express application
const app = express();

// Set up the route for the root path
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Set up a default handler for unknown routes
app.use((req, res) => {
  res.status(404).send(`<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>Error</title>\n</head>\n<body>\n<pre>Cannot GET ${req.originalUrl}</pre>\n</body>\n</html>`);
});

// Make the server listen on port 1245
app.listen(1245, () => {
  console.log('Server is listening on port 1245');
});

// Export the app instance
module.exports = app;
