import fs from 'fs/promises';

export const readDatabase = async (path) => {
  try {
    const data = await fs.readFile(path, 'utf8');
    const lines = data.trim().split('\n');
    const students = {};

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
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};
