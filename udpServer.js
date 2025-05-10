import dgram from 'node:dgram';

const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  // Reply back to the sender
  const reply = Buffer.from('Hello back!');
  server.send(reply, rinfo.port, rinfo.address, (err) => {
    if (err) {
      console.error('Error sending reply:', err);
    } else {
      console.log(`Sent reply to ${rinfo.address}:${rinfo.port}`);
    }
  });
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41234);