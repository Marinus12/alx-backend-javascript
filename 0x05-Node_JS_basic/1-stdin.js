const readline = require('readline');

// Function to handle user input and display messages
function handleUserInput() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    console.log('Welcome to Holberton School, what is your name?');

    rl.on('line', (input) => {
      console.log(`Your name is: ${input}`);
      rl.close();
      resolve(); // Resolve the promise once the input is processed
    });

    rl.on('close', () => {
      console.log('This important software is now closing');
    });
  });
}

// Execute the function if the file is run directly
if (require.main === module) {
  handleUserInput();
}

// Export the function for testing
module.exports = handleUserInput;
