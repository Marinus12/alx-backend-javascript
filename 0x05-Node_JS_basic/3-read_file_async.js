const fs = require('fs').promises;

function countStudents(path) {
  return fs.readFile(path, 'utf-8')
    .then((data) => {
      const lines = data.trim().split('\n');
      if (lines.length === 0) throw new Error('Cannot load the database');

      console.log(`Number of students: ${lines.length - 1}`);

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
        console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
      }
    })
    .catch(() => {
      throw new Error('Cannot load the database');
    });
}

module.exports = countStudents;
