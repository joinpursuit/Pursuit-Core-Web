# Express 1: Intro to Servers

# Topics
- What does a Server need to be able to do?
- Ports, Servers, Req/Res
- Response structure
- Introducing Express
- nodemon 

# Lesson

## What does a Server need to be able to do?

![Server](https://mdn.mozillademos.org/files/8659/web-server.svg)


A basic server must be able to do the following things:

1. Always be running on a certain IP Address
2. Recognize Requests through the URL
3. Handle some sort of logic and computation based on the URL
4. Send back a Response to the client

### Spinning up a server using built in HTTP module

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

```js
const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
  // Returning a response

  // 1. Response - Status Code
  res.statusCode = 200;
  // 2. Response - Header: Content Type
  res.setHeader('Content-Type', 'text/plain');
  // 3. Response - Content with completion
  res.end('Hello World\n');
});

server.listen(port, () => {
  console.log(`Server running at on http://localhost:${port}`);
});
```

This is something you will be coding over and over. The `http.createServer()` function basically takes in a callback function. Within the callback you are given two very important variables: `req` and `res`. 

- `req` object basically passes in all the information from the client and what kind of request.
- `res` object is handled by you and it's upto you to provide back some sort of response.

In this case for any kind of request we recieve there server will send back the following response:

```
Hello World
```

But that's not all that is happening. Essentially, every time a Browser or client sends a request. It is expecting back a response with certain bits of data.

1. **Status Code:** HTTP response status codes indicate whether a specific HTTP request has been successfully completed. Responses are grouped in five classes: informational responses, successful responses, redirects, client errors, and servers errors.
2. **Header Content Type:** In responses, a Content-Type header tells the client what the content type of the returned content actually is. It can be plain-text, JSON, HTML, media. Depending on this the browser or client will portray it's own logic.
3. **Response Body/Content:** This is the actual data you want to send back to the client. Can be entire web pages, images, json data. You name it.

### Problems with `http` modules

The `http` module is a very basic foundation of being able to create a web server. If you wanted to create a robust web server handling many different types of requests, it will take a lot of effort to build. That is why we use `Server-Side Web Frameworks` such as `Express`.

## Introducing Express

### Server-Side Web Frameworks

Express is a server-side web framework for nodeJS.

Server-side web frameworks are software that make it easier to write, maintain and scale web applications. They provide tools and libraries that simplify common web development tasks, including:

- Routing URLs to appropriate handlers (e.g. showing you cats when you're on mysite.com/cats and dogs when you're on mysite.com/dogs).
- Interacting with databases to save and sort data on the server side. 
- Supporting sessions and user authorization  (e.g. logging you in, keeping you logged in, and keeping your password and identity safe).
- Formatting output (e.g. HTML, JSON, XML).
- Improving security against web attacks.

### Getting Started with Express

### Adding dependencies

We will use npm to install and set up our express app.

1. We create a directory for our new application and navigate into it:

```bash
mkdir myapp
cd myapp
```

2. We use the npm "`init`" command to create a **package.json** file for our application. This command prompts us for a number of things, including the name and version of the application and the name of the initial entry point file (by default this is **index.js**). For now, we will just accept the defaults:

```bash
npm init
```

When we open the **package.json** file, we will see the defaults that we accepted, ending with the license.

```json
{
  "name": "myapp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

3. Now we  install the _Express_ library in the **myapp** directory. The package will automatically be saved to the dependencies list in our **package.json** file.

```bash
npm install --save express
```

The dependencies section of our **package.json** will now appear at the end of the **package.json** file and will include _Express_.

```json
{
  "name": "myapp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.16.2"
  }
}
```

4. We create a file named **index.js** in the root of the *myapp* application directory. In this file we import `express` and start a minimal web server:

```js
const express = require('express') // import express
const app = express() // create an express server
const port = 8000; // we will use this later

app.get('/', (req, res) => {
  res.send('Hello World!')
}) // routes the '/' URL path to produce a response of 'Hello World!'

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) // asks our server to listen for requests on port 8000, logging to the console to confirm that things are working
```

The code above a minimal "HelloWorld" Express web application. This imports the "express" module and uses it to create a server (`app`) that listens for HTTP requests on port 8000 and prints a message to the console explaining what browser URL you can use to test the server. The `app.get()` function only responds to HTTP `GET` requests with the specified URL path ('/'), in this case by calling a function to send our _Hello World!_ message.

5. You can start the server by calling node with the script in your command prompt:

```bash
node index.js
Example app listening on port 8000
```

6. We can now navigate to the URL [http://localhost:8000/](http://localhost:8000). If everything is working, the browser should display the string `"Hello World!"`.

### Nodemon - Automatic Server Restarts

We will use [nodemon](https://nodemon.io/) while we develop our node/express apps. Nodemon will monitor the files in our app directory and automatically restart the server on any file change. If we didn't do this, we'd have to manually close the server process (`<ctrl> + c`) and restart the server every time we wanted our changes to be reflected in the browser.

To install nodemon:

```bash
npm install -g nodemon
```

We use `-g` because we want to save nodemon *globally*. So that in the future we can use it for any other project if necessary.

Now, if we navigate to the root folder of the app, we can start the server with the following command:

```js
nodemon
```

