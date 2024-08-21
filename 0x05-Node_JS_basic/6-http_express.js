const express = require('express');
const app = express();
const PORT = 1245;

// Handle GET requests to the root path
app.get('/', (req, res) => {
  res.send('Hello Holberton School!\n');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

module.exports = app;
