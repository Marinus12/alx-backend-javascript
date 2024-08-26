const readline = require('readline');

// Create an interface for reading from stdin and writing to stdout
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Prompt the user with a welcome message
console.log('Welcome to Holberton School, what is your name?');

// Listen for the user's input
rl.on('line', (input) => {
  console.log(`Your name is: ${input}`);
  rl.close();
});

// Display a closing message when the readline interface is closed
rl.on('close', () => {
  console.log('This important software is now closing');
});
