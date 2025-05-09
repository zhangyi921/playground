// const fs = require('fs');
import fs from 'fs';  // Uncomment if using ES modules
// const crypto = require('crypto');
import crypto from 'crypto';  // Uncomment if using ES modules

// const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
//     modulusLength: 2048, // the length of your key in bits
//     publicKeyEncoding: {
//         type: 'spki', // recommended to be 'spki' by the Node.js docs
//         format: 'pem',
//     },
//     privateKeyEncoding: {
//         type: 'pkcs8', // recommended to be 'pkcs8' by the Node.js docs
//         format: 'pem',
//     },
// });

const publicKey = fs.readFileSync('mykey.pub', 'utf8');
const privateKey = fs.readFileSync('mykey', 'utf8');

const publicKey2 = fs.readFileSync('mykey2.pub', 'utf8');
const privateKey2 = fs.readFileSync('mykey2', 'utf8');

// console.log(publicKey);
// console.log(privateKey);

const secretMessage = `秘密的测试！::！😅
Test format
---
|*|
---
RSA encryption is a widely-used public-key cryptography method in secure data transmission. In Node.js, you can perform RSA encryption using the built-in crypto module. RSA allows you to encrypt data using a public key and decrypt it with a corresponding private key. This method is particularly useful for securing data transmission over insecure networks, like the internet.
`;
const encrypt = (message, publicKey) => {

    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const encryptedMessage = cipher.update(message, 'utf8', 'hex') + cipher.final('hex');
    const authTag = cipher.getAuthTag();
    
    const encryptedKeyAndIv = crypto.publicEncrypt(
        publicKey,
        Buffer.from(`${key.toString('hex')}:${iv.toString('hex')}:${authTag.toString('hex')}`)
    );

    const encryptedKeyAndIvHex = encryptedKeyAndIv.toString('hex');
    const payload = `${encryptedMessage}:${encryptedKeyAndIvHex}`;

    return payload
}

const decrypt = (payload, privateKey) => {
    const [encryptedMessage, encryptedKeyAndIvHex] = payload.split(':');
    const encryptedKeyAndIv = Buffer.from(encryptedKeyAndIvHex, 'hex');

    // Decrypt the AES key, IV, and auth tag using RSA
    const decryptedKeyAndIv = crypto.privateDecrypt(
        privateKey,
        encryptedKeyAndIv
    );

    const [keyHex, ivHex, authTagHex] = decryptedKeyAndIv.toString('utf-8').split(':');
    const key = Buffer.from(keyHex, 'hex');
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');

    // Decrypt the message using AES-GCM
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag); // Set the authentication tag
    const decryptedMessage = decipher.update(encryptedMessage, 'hex', 'utf8') + decipher.final('utf8');

    return decryptedMessage;
};

const encryptNSign = (message, publicKey, senderPrivateKey) => {

    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const encryptedMessage = cipher.update(message, 'utf8', 'hex') + cipher.final('hex');
    const authTag = cipher.getAuthTag();
    console.log(`Encrypted message: ${encryptedMessage}`);
    const signer = crypto.createSign('rsa-sha256');
    signer.update(message);

    const siguature = signer.sign(senderPrivateKey, 'hex');

    
    
    
    
    const encryptedKeyAndIv = crypto.publicEncrypt(
        publicKey,
        Buffer.from(`${key.toString('hex')}:${iv.toString('hex')}:${authTag.toString('hex')}`)
    );

    const encryptedKeyAndIvHex = encryptedKeyAndIv.toString('hex');
    const payload = `${encryptedMessage}:${encryptedKeyAndIvHex}:${siguature}`;

    return payload
}

const decryptNVerify = (payload, privateKey, senderPublicKey) => {
    const [encryptedMessage, encryptedKeyAndIvHex, siguatureHex] = payload.split(':');
    const encryptedKeyAndIv = Buffer.from(encryptedKeyAndIvHex, 'hex');

    // Decrypt the AES key, IV, and auth tag using RSA
    const decryptedKeyAndIv = crypto.privateDecrypt(
        privateKey,
        encryptedKeyAndIv
    );

    const [keyHex, ivHex, authTagHex] = decryptedKeyAndIv.toString('utf-8').split(':');
    const key = Buffer.from(keyHex, 'hex');
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');

    // Decrypt the message using AES-GCM
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag); // Set the authentication tag
    const decryptedMessage = decipher.update(encryptedMessage, 'hex', 'utf8') + decipher.final('utf8');
    const verifier = crypto.createVerify('rsa-sha256');
    verifier.update(decryptedMessage);
    const isVerified = verifier.verify(senderPublicKey, siguatureHex, 'hex');
    if (!isVerified) {
        throw new Error('Signature verification failed');
    }
    console.log('Signature verified:', isVerified);

    return decryptedMessage;
};





const payload = encrypt(secretMessage, publicKey);
console.log()
console.log(payload)

console.log('decrypting...');
const decryptedMessage = decrypt(payload, privateKey);
console.log('Decrypted message:', decryptedMessage);


// const payload = encryptNSign("hello", publicKey, privateKey2);
// console.log()
// console.log(payload)

// console.log('decrypting...');
// const decryptedMessage = decryptNVerify(payload, privateKey, publicKey2);
// console.log('Decrypted message:', decryptedMessage);