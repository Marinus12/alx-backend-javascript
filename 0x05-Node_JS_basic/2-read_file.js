const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf-8').trim(); // Read and trim the file content

    if (!data) {
      throw new Error('Cannot load the database');
    }

    const lines = data.split('\n');
    const header = lines[0].split(','); // Split header to get the fields

    const studentCount = lines.slice(1).filter(line => line).length;
    console.log(`Number of students: ${studentCount}`);

    const fields = {};
    lines.slice(1).forEach(line => {
      if (line) { // Skip empty lines
        const values = line.split(',');
        const field = values[3]; // Assuming the 4th column is the field
        const firstName = values[0]; // Assuming the 1st column is the first name

        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstName);
      }
    });

    for (const [field, students] of Object.entries(fields)) {
      console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
