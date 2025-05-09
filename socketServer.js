import * as net from 'node:net';

let clientId = 0;
const clients = new Map();

const server = net.createServer(socket => {
  const id = clientId++;
  clients.set(id, socket);

  console.log(`Client ${id} connected`);
  socket.write(`Welcome, Client ${id}!\n`);

  socket.on('data', data => {
    console.log(`Received data from Client ${id}:`, data);
    const message = data.toString().trim();
    console.log(`Client ${id} says: ${message}`);
    
    // Broadcast to all other clients
    for (const [otherId, otherSocket] of clients.entries()) {
      if (otherId !== id) {
        otherSocket.write(`Client ${id} says: ${message}\n`);
      }
    }
  });

  socket.on('end', () => {
    console.log(`Client ${id} disconnected`);
    clients.delete(id);
  });

  socket.on('error', err => {
    console.error(`Error from Client ${id}:`, err.message);
  });
});

server.listen(8080, () => {
  console.log('Server listening on port 8080');
});