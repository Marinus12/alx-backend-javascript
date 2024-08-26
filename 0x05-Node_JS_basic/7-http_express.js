const express = require('express');
const fs = require('fs');
const app = express();
const port = 1245;

app.get('/', (req, res) => {
    res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
    const database = process.argv[2];  // Get the database file from command line argument
    if (!database) {
        res.send('This is the list of our students\n');
        return;
    }

    fs.readFile(database, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Cannot load the database');
            return;
        }

        const lines = data.trim().split('\n');
        const students = {};
        let totalStudents = 0;

        lines.forEach((line) => {
            const [firstname, field] = line.split(',');
            if (firstname && field && field !== 'field') {
                if (!students[field]) students[field] = [];
                students[field].push(firstname);
                totalStudents++;
            }
        });

        let responseText = `This is the list of our students\nNumber of students: ${totalStudents}\n`;
        for (const [field, names] of Object.entries(students)) {
            responseText += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
        }

        res.send(responseText.trim());
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
