import * as net from 'node:net';

// Reverse proxy listens on port 9000
const proxy = net.createServer(clientSocket => {
    console.log('Client connected to proxy');

    // Connect to the real server (backend)
    const backendSocket = net.connect({ host: 'localhost', port: 80 }, () => {
        console.log('Connected to backend');
    });

    // Pipe data between client <-> backend
    //   clientSocket.pipe(backendSocket);
    //   backendSocket.pipe(clientSocket);
    clientSocket.on('data', chunk => {
        console.log('>>> From client:', chunk.toString());
        backendSocket.write(chunk);
    });

    // From backend → client
    backendSocket.on('data', chunk => {
        console.log('<<< From backend:', chunk.toString());
        // Here you can modify the response from the backend before sending it to the client
        // const message = chunk.toString();
        // const newMessage = message.replaceAll("Welcome to nginx!", "Content was replaced!");
        // console.log("relace message:", newMessage);
        // clientSocket.write(newMessage);
        clientSocket.write(chunk);
    });

    // Handle disconnects
    clientSocket.on('end', () => {
        console.log('Client disconnected');
        backendSocket.end();
    });

    backendSocket.on('end', () => {
        console.log('Backend disconnected');
        clientSocket.end();
    });

    clientSocket.on('error', err => {
        console.error('Client error:', err.message);
        backendSocket.destroy();
    });

    backendSocket.on('error', err => {
        console.error('Backend error:', err.message);
        clientSocket.destroy();
    });
});

proxy.listen(9000, () => {
    console.log('Proxy server listening on port 9000');
});