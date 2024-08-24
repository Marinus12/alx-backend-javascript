const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf-8').trim(); // Read and trim the file content

    if (!data) {
      throw new Error('Cannot load the database');
    }

    const lines = data.split('\n').filter((line) => line.trim() !== ''); // Remove empty lines
    if (lines.length === 0) {
      console.log('Number of students: 0');
      return;
    }

    const students = lines.slice(1); // Skip the header row

    const fields = {};
    students.forEach((line) => {
      const values = line.split(',');
      const firstName = values[0];
      const field = values[3]; // Assuming the 4th column is the field

      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstName);
    });

    const numberOfStudents = students.length;
    console.log(`Number of students: ${numberOfStudents}`);

    for (const [field, names] of Object.entries(fields)) {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    }
  } catch (error) {
    console.error('Cannot load the database');
  }
}

module.exports = countStudents;
