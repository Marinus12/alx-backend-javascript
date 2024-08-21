#!/usr/bin/node

// Display the initial message
console.log('Welcome to Holberton School, what is your name?');

// Capture the user input
process.stdin.on('data', (data) => {
  const name = data.toString().trim(); // Remove any trailing newlines or spaces
  console.log(`Your name is: ${name}`);
  
  // Exit the process after the input is handled
  process.exit();
});

// Handle the process exit
process.on('exit', () => {
  console.log('This important software is now closing');
});
