# Introduction to Servers

# Topics
- What is the Internet?
- What is a Server?
- What is a Client?
- IP Addresses and DNS
- What does a Server need to be able to do?
- Ports, Servers, Req/Res
- Response structure

# 1. What is the Internet?

The Internet is the backbone of the Web, the infrastructure that makes the Web possible. In essence, the Internet is a large network of computers which all communicate together.

What started in the 1960s as a US military research project, soon evolved into a public infrastructure. The various technologies that support the Internet have evolved over time, but the way it works hasn't changed that much: Internet is a way to connect computers all together.

![Internet](assets/internet.jpg)

# 2. Clients and Servers

Computers connected to the web are called **clients** and **servers**. A simplified diagram of how they interact might look like this:

![](https://mdn.mozillademos.org/files/8973/Client-server.jpg)

- Clients are the web user's internet-connected devices (phone, computer, etc.) and the web-accessing software available on those devices (chrome, firefox, etc.).
- Servers are computers that store webpages, sites, or apps. When a client device wants to access a webpage, a copy of the webpage is downloaded from the server onto the client machine to be displayed in the user's web browser.

### So what happens, exactly?

When you type a web address into your browser:

1. The browser goes to the DNS server, and finds the real address of the server that the website lives on.
2. The browser sends an HTTP request message to the server, asking it to send a copy of the website to the client.
3. Provided the server approves the client's request, the server sends the client a "200 OK" message, and then starts sending the website's files to the browser as a series of small chunks called data packets.
4. The browser assembles the small chunks into a complete website and displays it.

## What's a Server?

A server is basically just a computer designed to take requests and send back responses. The word "server" is understood by most to mean a web server where webpages can be accessed over the internet through a client like a web browser.

### Types of Servers
1. **Web server**: Web servers show pages and run apps through web browsers. The server your browser is connected to right now is a web server that's delivering this page and any images you see on it.
2. **Email server**: Email servers facilitate the sending and receiving of email messages.
3. **FTP server**: FTP servers support the moving of files through File Transfer Protocol tools

## What's a Client?

A client is any computer program or machine that makes a request to a server.

### Types of Clients

1. **Web Browser:** Your Web browser is a special program that is built to send requests to the internet and retrieve responses. The browser then portrays the data to you.
2. **Mobile App:** Any app that is connecting to the internet to retrieve data is a client.

# 3. IP Addresses & DNS

### Finding computers

* Source: [*How does the Internet work?* by mozilla contributors](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work)

If you want to send a message to a computer, you have to specify which one. Thus any computer linked to a network has a unique address to identify it, called an **IP address**. It's an address made of a series of four numbers separated by dots, for example: `192.168.2.10`.

To make things easier for humans, IP addresses usually have a human readable alias called a **domain name**. For example, `google.com` is the domain name used on top of the IP address `173.194.121.32`. Using the domain name is the easiest way for us to reach a computer over the Internet.

![Show how a domain name can alias an IP address](https://mdn.mozillademos.org/files/8405/dns-ip.png)

The client and server we've described above don't tell the whole story. There are many other parts involved, and we'll describe some of them below.

* **DNS**: Domain Name Servers are like an address book for websites. When you type a web address in your browser, the DNS needs to be reached first to translate the address to an ip address.
* **HTTP** (Hypertext Transfer Protocol): a protocol that defines  how clients and servers speak to each other.
* **Component files**: A website is made up of many different files, which are like the different parts of the goods you buy from the shop. These files come in two main types:
  * **Code files**: Websites are built primarily built from HTML, CSS, and JavaScript.
  * **Assets**: All the other stuff that makes up a website, such as images, music, video, Word documents, and PDFs.

# 4. What does a Server need to be able to do?

![Server](https://mdn.mozillademos.org/files/8659/web-server.svg)


A basic server must be able to do the following things:

1. Always be running on a certain IP Address
2. Recognize Requests through the URL
3. Handle some sort of logic and computation based on the URL
4. Send back a Response to the client

# 5. Spinning up a server using built in HTTP module

The node `http` module allow you to interact with the web. Using the `http` module, you do things like:

- make requests to websites and get code and/or data in return.
- create a simple web server to host your own web apps.

Here is an example of a simple server built using the `http` module:

```js
const http = require('http');

// 1 - Declaring a port
const port = 3000;

// 2 - Declaring a server
const server = http.createServer();

// 3 - Running your declared server and attaching it to the port
server.listen(port, () => {
  console.log(`Server running at on http://localhost:${port}`);
});
```

The built in `http` module is doing the following 3 things:

1. **Declaring a port:** A server is just a computer program running on a computer. The entire computer has an IP Address, where other computers can access through. What makes the port so special is that you're indicating that this specific computer program and it's functionalities can be accessed through this specific port: `http://localhost:3000`
2. **Declaring a server:** This basically is a built in basic server NodeJS provides by default. With this we can take requests and send back responses.
3. **Running your server:** By attaching our `server instance` to the `port` we basically now have a live server running at all times. Waiting to handle requests/responses.


### Request & Responses

A server has to have the ability to take **Requests** and return back **Responses**. So far, we've declared a server and attached it to a port. But we aren't really doing anything else. We need to be able to handle requests and send back a response. So let's do that:

Create a new file `myFirstServer.js` and add the following to it:

```js
const http = require('http');

const port = 3000

const server = http.createServer((req, res) => {
    // 1. Response - Status Code

    res.statusCode = 200

    // 2. Response - Headers

    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*');

    // 3. Response - Content with completion

    const json = {
                    'message': 'hello world!'
                 }                    

    res.end(JSON.stringify(json))    
})

server.listen(port, () => {
    console.log("I am listening on port 3000")
})
```

This is something you will be coding over and over. The `http.createServer()` function basically takes in a callback function. Within the callback you are given two very important variables: `req` and `res`.

- `req` object basically passes in all the information from the client and what kind of request.
- `res` object is handled by you and it's up to you to provide back some sort of response.

In this case for any kind of request we receive there server will send back the following response:

```
{
  'message': 'hello world!'
}
```

But that's not all that is happening. Essentially, every time a Browser or client sends a request. It is expecting back a response with certain bits of data.

1. **Status Code:** HTTP response status codes indicate whether a specific HTTP request has been successfully completed. Responses are grouped in five classes: informational responses, successful responses, redirects, client errors, and servers errors.
2. **Header Content Type:** In responses, a Content-Type header tells the client what the content type of the returned content actually is. It can be plain-text, JSON, HTML, media. Depending on this the browser or client will portray its own logic.
3. **Response Body/Content:** This is the actual data you want to send back to the client. Can be entire web pages, images, json data. You name it.

# 6. Seeing our server in action

Now go ahead and run your server with `node myFirstServer.js`

Our server is now running!  Let's put together a quick front end to see what happens:

index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="index.js"></script>
    <title>Hitting my First Server</title>
</head>
<body>
    <h1>Hitting my First Server</h1>
    <button id="serverButton">Hit the server</button>    
</body>
</html>
```

index.js
```js
document.addEventListener('DOMContentLoaded', () =>{
    getServerButton().addEventListener('click', loadDataFromServer)
})

function getServerButton() {
    return document.querySelector("#serverButton")
}

async function loadDataFromServer() {
    const myURL = "http://localhost:3000/"
    const resp = await axios.get(myURL)    
    displayResponseFromServer(resp.data)
}

function displayResponseFromServer(resp) {
    console.log(resp)
    let message = resp.message
    addMessageToUI(message)
}

function addMessageToUI(message) {
    let newElement = document.createElement('p')
    newElement.innerText = "Server Says: " + message
    document.body.appendChild(newElement)
}
```

No open your `index.html`, click on the button, and you'll see the response from the server!
