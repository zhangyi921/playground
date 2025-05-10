import dgram from 'node:dgram';
import { Buffer } from 'node:buffer';

const message = Buffer.from('Some bytes');
const client = dgram.createSocket('udp4');
client.send(message, 41234, 'localhost', (err) => {
//   client.close();
});
client.on('message', (msg, rinfo) => {
    console.log(`Client received: ${msg} from ${rinfo.address}:${rinfo.port}`);
});
setTimeout(() => {
    client.send("jljkljl", 41234, 'localhost', (err) => {
        client.close();
      });
}, 5000);