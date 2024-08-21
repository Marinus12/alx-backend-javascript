const express = require('express');
const fs = require('fs').promises;
const app = express();
const PORT = 1245;

// Function to read and parse CSV data
const parseCSV = async (path) => {
  try {
    const data = await fs.readFile(path, 'utf8');
    const lines = data.trim().split('\n');
    const students = {};

    // Skip the header
    lines.slice(1).forEach((line) => {
      if (line) {
        const [firstname, , , field] = line.split(',');
        if (!students[field]) {
          students[field] = [];
        }
        students[field].push(firstname);
      }
    });

    return students;
  } catch (err) {
    throw new Error('Cannot load the database');
  }
};

// Handle GET requests to the root path
app.get('/', (req, res) => {
  res.send('Hello Holberton School!\n');
});

// Handle GET requests to /students path
app.get('/students', async (req, res) => {
  try {
    const students = await parseCSV(process.argv[2]);
    let response = 'This is the list of our students\n';

    let totalStudents = 0;
    for (const [field, names] of Object.entries(students)) {
      response += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
      totalStudents += names.length;
    }

    response = `Number of students: ${totalStudents}\n${response}`;
    res.send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

module.exports = app;
