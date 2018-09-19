# Express 3: Passing Data

# Topics
- Why do we want to pass data?
- Different ways of passing data to the Server
- URL Parameters
- URL Query Strings
- POST Request Body

# Lesson

## Why do we want to pass data?

There are many reasons to want to pass data to a Server. Here are a few but not limited to examples:

- You want to request information about a particular User
- You want to indicate what page of a book you're reading
- You want to login with an username and password
- You want the server to know it's really you and that you should be authenticated

## Different ways of passing data to the Server

There are several ways you can pass data to a server. Some ways are best suited for particular cases than others. For example, some ways are more secure. Other ways you want to give the client some control over your server side logic.

1. `URL Paramaters`: Websites use this all the time, to show user specific
2. `URL Query Strings`: Shopping websites may use this to indicate what page you're on
3. `Request Body`: These are considered safer and are used for more sensitive and larger amounts of data.

## URL Parameters

This is one of the most useful ways of passing data. It allows your endpoints to be more dynamic.

URL Parameters are defined like the following:
```javascript
app.get('/:parameter_name')
```
Basically, anywhere in the URL you want to add a parameter you start defining it with a `:` colon and then indicate the name of the parameter so you can reference it in your backend code.

Let's test out the following example:

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/dog/:type', (req, res) => {
  // We are accessing the request object's parameter object
  const typeOfDog = req.params.type;
  
  res.send(`Hello I'm a ${typeOfDog} doggo!`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
});
```

So now if we were to go on our Browser or Postman and enter: `http://localhost:3000/dog/corgi`

We'd get the following response:

```
Hello I'm a corgi doggo!
```

Interestingly, if we `console.log(req.params);` right before the response, we get the following result in our console:

```
Listening on port 3000!
{ type: 'corgi' }
```

URL Parameters allows us to customize our Routes a bit and add in custom functionality depending on the type of parameter is passed.

## URL Query Strings

Query Strings allows the client to pass various amounts of data without strictly specifying them on the server. 

```
http://localhost:3000/?foo=bar
```

Query strings always start at the *end* of an endpoint. Then begin with the `?` character followed by the name of the query variable and value after the assignment operator.

Let's test a few query strings using the following code:

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {

  // We are accessing the request object's query object
  const query = req.query;
  
  // Let's respond back with the entire query object
  res.send(query);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
});
```

Let's enter the following into Postman, `http://localhost:3000/`, we get the following result:

```
{}
```

An empty query object. So why don't we define a query? `http://localhost:3000/?name=Rex`

```
{
    "name": "Rex"
}
```

Pretty cool, now let's *chain* more queries together.

`http://localhost:3000/?name=Rex&age=2&type=Husky` and run it:

```
{
    "name": "Rex",
    "age": "2",
    "type": "Husky"
}
```

We can do a lot of cool and powerful things with query parameters. It is solely upto the server to accept whatever values it wants.

## POST Request Body

POST is used to send data to a server to create/update a resource.

1. POST requests are never cached
2. POST requests do not remain in the browser history
3. POST requests cannot be bookmarked
4. POST requests have no restrictions on data length

The data sent to the server with POST is stored in the request body of the HTTP request:

```
POST / HTTP/1.1
Host: localhost
name1=value1&name2=value2
```

You can use Postman to create your Post requests, which we will be doing for this lesson.

We will also be using a new NodeJS module called `body-parser` which will give out `req` object the ability to access body values.

```bash
npm install body-parser --save
```

Then consider the following code:

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


app.post('/', (req, res) => {
  // Same thing as we've done before
  const body = req.body;
  res.send(body);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
});
```

Now in Postman we can submit POST requests and see the values.