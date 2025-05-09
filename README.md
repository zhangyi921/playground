# playground
I'll put code that I think it's fun.
# E2E Encryption code
The code allows you create a certificate, and then you can let your message sender take your public key to send encrypted messages to you. The messages are encrypted using symetic encryption, and the password that encrypts messages are encrypted by asymmetric encryption(public and private key)
# Reverse TCP socket proxy
Put a reverse proxy in between a server and client so that we can observe the data transmited in the sokcet. One perfect example is put the proxy in between browser and web server, and we can observe data like
```
Proxy server listening on port 9000
Client connected to proxy
Connected to backend
>>> From client: GET / HTTP/1.1
Host: localhost:9000
Sec-Fetch-Dest: document
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.4 Safari/605.1.15
Upgrade-Insecure-Requests: 1
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Sec-Fetch-Site: none
Sec-Fetch-Mode: navigate
Accept-Language: en-CA,en-US;q=0.9,en;q=0.8
Priority: u=0, i
Accept-Encoding: gzip, deflate
Cookie: WebSSH2=s%3A9eoxLLx9GVtw4ED5-VFGl_w_Z3gZa_Ib.4pqUondgOUKdMob0EZIdVs53wkgJotUAb2Gg9fZ3%2FGA
Connection: keep-alive


<<< From backend: HTTP/1.1 200 OK
Date: Fri, 09 May 2025 05:16:39 GMT
Content-Type: text/html
Content-Length: 612
Connection: keep-alive
Last-Modified: Tue, 04 Dec 2018 14:44:49 GMT
ETag: "5c0692e1-264"
Accept-Ranges: bytes

<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```
It's best to use it with text based protocol. 
# Chat app with TCP socket
files: `socketClient.js`, `socketServer.js`

Run both files, client will connect to server and you can use terminal to type messages and send to server.