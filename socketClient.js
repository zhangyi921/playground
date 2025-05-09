import net from 'node:net';
import * as readline from 'node:readline';

// Create connection to the server
const client = net.createConnection({ port: 8080 }, () => {
  console.log('Connected to server');
});

// Setup readline to capture user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

rl.prompt();

// On each line typed by the user, send it to the server
rl.on('line', (line) => {
    if (line === 'exit') {
      client.end(); // Close the connection
      return;
    }
  client.write(line + '\n'); // newline can be used as delimiter
  rl.prompt();
});

// Display server messages
client.on('data', (data) => {
  console.log(`\nServer: ${data.toString().trim()}`);
  rl.prompt();
});

// On server disconnect
client.on('end', () => {
  console.log('Disconnected from server');
  rl.close();
});