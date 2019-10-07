# Intro to Express.js and Routing

# Topics
- Express.js
- nodemon
- What is Routing?
- What are HTTP Request Methods?
- Postman
- Components of Routing with Express.js
- Basic Routing

# 1. Express.js

### Server-Side Web Frameworks

Express.js is a server-side web framework for Node.js.

Server-side web frameworks are software that make it easier to write, maintain and scale web applications. They provide tools and libraries that simplify common web development tasks, including:

- Routing URLs to appropriate handlers (e.g. showing you cats when you're on mysite.com/cats and dogs when you're on mysite.com/dogs).
- Interacting with databases to save and sort data on the server side.
- Supporting sessions and user authorization  (e.g. logging you in, keeping you logged in, and keeping your password and identity safe).
- Formatting output (e.g. HTML, JSON, XML).
- Improving security against web attacks.

# 2. Getting Started with Express.js

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

3. Now we  install the _Express.js_ library in the **myapp** directory. The package will automatically be saved to the dependencies list in our **package.json** file.

```bash
npm install express
```

The dependencies section of our **package.json** will now appear at the end of the **package.json** file and will include _Express.js_.

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

The code above a minimal "HelloWorld" Express.js web application. This imports the "express" module and uses it to create a server (`app`) that listens for HTTP requests on port 8000 and prints a message to the console explaining what browser URL you can use to test the server. The `app.get()` function only responds to HTTP `GET` requests with the specified URL path ('/'), in this case by calling a function to send our _Hello World!_ message.

5. You can start the server by calling node with the script in your command prompt:

```bash
node index.js
Example app listening on port 8000
```

6. We can now navigate to the URL [http://localhost:8000/](http://localhost:8000). If everything is working, the browser should display the string `"Hello World!"`.

# 3. Nodemon - Automatic Server Restarts

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

# 4. Routing

### Endpoints

Routing is one of the most fundamental concepts in server side development. A server can have a wide variety of functionality, but how does the server know which one to run? That's through `endpoints`.

`Endpoints` tell the  server which part of the server or website we are attempting to request.

```bash
https://example.com/this-is-an-endpoint
https://example.com/another/endpoint
https://example.com/some/other/endpoint
https://example.com/login
https://example.com/user
https://example.com/cart/items
```

Endpoints come in all shapes and sizes. They are made to be HUMAN READABLE and intuitive.

For example let's say we want to access a certain Instagram user:

```
https://www.instagram.com/:username
```

We would pass in the username:

```
https://www.instagram.com/nba // Returns NBA Instagram profile
```

# 5. HTTP Request Methods Review

HTTP defines a set of request methods to indicate the desired action to be performed for a given resource. Although they can also be nouns, these request methods are sometimes referred as HTTP verbs. Each of them implements a different semantic.

### Types of Request Methods:

1. `GET`: The GET method requests a representation of the specified resource. Requests using GET should only retrieve data.
2. `POST`: The POST method is used to submit an entity to the specified resource, often causing a change in state or side effects on the server.
3. `PUT`: The PUT method replaces all current representations of the target resource with the request payload.
4. `DELETE`: The DELETE method deletes the specified resource.

Whenever we submit a URL into our browser that is a `GET` request.

### Testing Requests using Postman

There is a very important tool we use as server side developers. It is known as [Postman](https://www.getpostman.com/). Please download it and install it on your systems.


# 6. Routing with Express.js

One of Express.js's strengths is the ability to seamlessly create routes as you need it.

Route definition takes the following structure:

```app.METHOD(PATH, HANDLER)```

1. `app` is an instance of express.
2. `METHOD` is an HTTP request method, in lowercase.
3. `PATH` is a path on the server.
4. `HANDLER` is the function executed when the route is matched.

The following examples illustrate defining simple routes:

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/', (req, res) => {
  res.send('Got a POST request')
});

app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user')
});

app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user')
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
});
```

Test these out using [Postman](https://www.getpostman.com/)!

### JSON

Express.js can also return json:


```javascript
const express = require('express');
const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/users', (req, res) => {
  res.json({"users": ["Amy", "Bob", "Cat"]});
})


app.get('/smallPrimes', (req, res) => {
  res.json({"smallPrimes": [2, 3, 5, 7]});
})

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
});
```

# 7. Reading parameters

When defining an endpoint, you can also specify what parameters you are expecting:

```js
const express = require('express')
const app = express()
app.get("/users/:userID", (req, res) => {
  console.log(req.params)  
  // Fetch a real user using the userID
  let user = {name: 'Sample User', id: req.params.userID}
  res.json({'user': user))
})

const portNum = 8000

app.listen(portNum, function(){
    console.log(`Server starting on port ${portNum}`);
});

```

# 8. CORS

If you want to be making asyncronous requests to your server, you need to make sure that Cross Origin Resource Sharing is enabled.  To do so, you can use the `cors` npm package.

```bash
npm install --save cors
```

Then in your server:

```js
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
```
