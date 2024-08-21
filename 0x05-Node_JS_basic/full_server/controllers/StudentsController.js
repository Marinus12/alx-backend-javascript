import { readDatabase } from '../utils.js';

export default class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const students = await readDatabase(process.argv[2]);
      let response = 'This is the list of our students\n';

      const fields = Object.keys(students).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
      let totalStudents = 0;
      
      fields.forEach((field) => {
        response += `Number of students in ${field}: ${students[field].length}. List: ${students[field].join(', ')}\n`;
        totalStudents += students[field].length;
      });

      response = `Number of students: ${totalStudents}\n${response}`;
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;

    if (!['CS', 'SWE'].includes(major)) {
      return res.status(500).send('Major parameter must be CS or SWE');
    }

    try {
      const students = await readDatabase(process.argv[2]);
      const list = students[major] ? students[major].join(', ') : '';

      res.status(200).send(`List: ${list}`);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
