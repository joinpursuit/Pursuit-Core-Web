# npm & Express Response

# Topics

- What is node/npm
- How to create your own NPM project
- What is express
- Make requests from the browser to your server

# Lesson

## What is Node?

Node is an open source project that lets us run JavaScript in Terminal. Previous to nodeJS, JavaScript could only be run in the browser.

By creating Node, companies could hire developers who specialize in JavaScript and they would be able to build front-end Applications and back-end applications.

## What is NPM?

Coders often run into the same challenges over and over again. Rather than build out all the functionality from scratch for every single project, developers get together and build 3rd party (usually open source) code libraries and frameworks.

It's a lot like the difference between making pasta and sauce from scratch (no code libraries or frameworks). Or buying pasta from a box (using a code library - doesn't care what kind of dish you are making), or buying a frozen dinner (very opinionated about what you will be eating for dinner).

Libraries are just helper code, with little to no opinions on how you should use them. Frameworks tend to be much more opinionated on how to use them.

If you've ever worked with Bootstrap for CSS (or another CSS framework like materialize, skeleton, bulma etc.), you've used a 3rd party code framework. What these libraries tried to solve is common styling, UX/UI and responsive design issues. You don't have to ever look at the code or know how it works, you just need to read the documentation in order to learn how to use the framework or library.

Node has a large library of 3rd party code called` Node Package Manager` (`npm` all lowercase).

We'll be writing our own applications using some packages from npm.

## Making Your Own Project With Node

If you've ever downloaded some code onto your computer and to get the project started you needed to run `npm install`, you've worked with a node project!

Now let's make our own. We'll make a server with express! Express is very popular npm framework that allows developers to build complex back ends that power some [very popular web sites](https://expressjs.com/en/resources/companies-using-express.html)

## Getting Started with Express

[Here is the documentation](https://expressjs.com). If you are new to servers, this documentation may be a bit difficult to use. As you gain more knowledge and experience you will be able to utilize this documentation better.

### In Terminal

- Navigate to your Desktop or other convenient folder
- `git status` to make sure you are not already in a `git` repository
- `mkdir intro-to-express`
- `cd intro-to-express`

We use the npm `init` command to `init`ialize our project. It will create a **package.json** file for our application. This file is the meta-data about our project. Who wrote it? What kind of scripts can we run? What are the dependencies we are using?

This command prompts us for a number of things, including the name and version of the application and the name of the initial entry point file (by default this is **index.js**). For now, we will just accept the defaults:

```bash
npm init
```

When we open the **package.json** file, we will see the defaults that we accepted, ending with the license.

```json
{
  "name": "intro-to-express",
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

3. Now we install the _Express_ library in the **intro-to-express** directory. The package will automatically be saved to the dependencies list in our **package.json** file.

```bash
npm install express
```

The dependencies section of our **package.json** will now appear at the end of the **package.json** file and will include _Express_.

You can check if you've installed `express` correctly by looking at the `pacakge.json`. It should now have a `dependenies` key that includes an object with `express`

```json
{
  "name": "intro-to-express",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

A `package-lock.json` file was also created. This is an important file for managing the packages, it is automatically generated and updated. We don't have to worry about its contents or ever edit it directly.

A folder called `node_modules` was created. This is were all the code for `express` will be. If you look inside `node_modules`, you will see there are many folders and files. That's because `express` depends on many other packages in order to work. You can look at all the code in here. But to learn to use it, it is better to look at the documentation.

`node_modules` can become very large, and the `source of truth` of these dependencies lives on the `npm registry`. Therefore, there is no reason to track these files with `git`, nor upload them to `GitHub`. We can ignore these files by adding a file called exactly `.gitignore`

- `touch .gitignore`
- This is NOT a JavaScript file. Therefore we don't have to worry about semi-colons or other things we are used to for JavaScript.
- All we need to do to ignore our `node_modules` folder is to write

`node_modules` in our `.gitignore`

### Editing `package.json`

We noticed that when we installed express, it automatically updated our `package.json`

But we can also edit it manually. The only gotcha is that you must write proper [JSON](https://www.w3schools.com/whatis/whatis_json.asp) (JavaScript Object Notation). It is very similar to a JavaScript Object, but it is a bit more strict.

- you **MUST** use double quotes (never single quotes)
- you **MUST** use double quotes around object keys, numbers and booleans.
- you **MUST** create and maintain valid JS objects, arrays, and strings.
- you **MUST NOT** have any trailing commas

Let's go in there and add our name as the property of `author`

## Writing an Express Application

Let's create a file to write our code

**IMPORTANT** make sure you are in the same directory as `package.json`

- `touch app.js`

[Let's head over to the express npm package documentation](https://www.npmjs.com/package/express)

Along the top we have all the code we need to write a very simple express application.

Let's follow it!

**app.js**

Let's `require` express

Let's add a console.log too - this will be a proof of concept that we now have access to the express code in our app.

```js
const express = require("express");
console.log(express);
```

Let's run it with `node app.js`

<details><summary>Example Terminal output</summary>

![](./assets/express-code-terminal.png)

</details>
<br />

Next, we are going to 'set up' our express app, by adding another line, per the documentation. We again, can dig much deeper into what this is doing, but for now, let's just try to get our server working.

```js
const express = require("express");
const app = express();
```

Now we are going to write our first `route`. Our routes are like event listeners in the browser.

The will be set up to listen for requests to their specific URL.

Even though the documentation uses the `function` keyword, we can write this callback with an arrow function. In this case, it does not matter which we use, it is just a style preference.

We are also going to write out `response` and `request` as parameters in our callback.

Later, you'll be writing your own code and you can shorten the variables `response` to `res` and `request` to `req` - but as we are just getting familiar with everything, let's use the full names.

```js
const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.send("Hello World");
});
```

Finally, let's turn on our app so it is always listening for requests. We're going to use port 3003. We can typically use any port between 3000 and 9999, as they are not being used by other apps on your computer. When you put your app on the internet, this port will be configured for you.

```js
const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.send("Hello World");
});

app.listen(3003);
```

Let's start this app in terminal:

```bash
node app.js
```

This time, you'll notice that the terminal app now just hangs. The cursor will be in place and you won't get a new line prompt.

This means our express app is running and listening for requests on port 3003.

To cancel it, we have to press <kbd>control</kbd> <kbd>c</kbd>

**Thought Questions**

- How do we access this route?
- What is the URL?
- What kind of response will we get?

It would be nice to have a status that this app is running. Let's add a `console.log` inside a callback that will be the second argument of the function `app.listen`

```js
const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.send("Hello World");
});

app.listen(3003, () => {
  console.log("Listening for requests on port 3003");
});
```

Neato! But, how do we make a request?

![](https://images-na.ssl-images-amazon.com/images/I/A1-k171J5XL._AC_SY450_.jpg)

We need to access our local host for this server. Everyone's computer has a default IP address of `127.0.0.1` but that's a bit annoying to put in the URL. We can instead type in our browser's URL bar and go there

http://localhost:3003

**SUCCESS**: Do you see `Hello World` appear in the browser? Then you've successfully written your first express server!

### Common Errors

#### A Broken `package.json`

![](./assets/broken-package-json.png)

Fix this by going into the `package.json` and making sure all of your JSON is valid.

You can use [An online JSON Validator to check, if you get really stuck](https://jsonlint.com/?code=)

#### Express was not properly added as a dependency

![](./assets/express-not-installed.png)

Fix it by trying to run `npm install express` again - make sure you are in these same directory as `package.json`. If you don't see a `node_modules` folder, you might have forgotten to run `npm init` first. If it is still not working, since you are so early in your project, it may be best to delete the project and start again.

### Quick Summary Before Moving On

Our little app is doing a LOT!

![](./assets/request-response-code.png)

### Nodemon

Let's update our route to say `Hello, world!!!!!!!!`

```js
app.get("/", (request, response) => {
  response.send("Hello, world!!!!!!!!");
});
```

When we refresh the browser, nothing changes.

We need to go to terminal, press <kbd>control</kbd> <kbd>c</kbd>, then type `node app.js` EVERY SINLGE TIME WE MAKE A CHANGE.

This isn't a good workflow.

So we're going to install a new package called `nodemon` (short for node monitor - how you pronounce it is up for debate). Nodemon is going to monitor your app for changes to files. When it detects that you've made a change and saved it, it will automatically restart your server for you.

One more detail. Since we are going to want this for every single express app, we can install nodemon globally so we can use it without having to install it every single time.

In terminal run

- `npm install -g nodemon`

The `-g` means install this package globally.

- Your computer may deny you access to make this change. You can try again by running

- `sudo !!` This will run the last command you typed with `sudo` in front of it. `sudo` means `super user do` - and it is a very powerful command. It can override a lot of safety settings on your computer. You should only use it if you know EXACTLY what you are doing. Improper use can turn your Macbook into a brick that can only be fixed by taking it to Apple (they have the technology to recover your computer back to factory state, you may lose all your unsaved work).
- it will likely ask you for your computer log-in password. The UI is not great - as you just type and there is no feedback on how many characters you have typed. Press enter when you've entered your password. If you've gotten your password wrong, rerun the above terminal command by pressing the up arrow.

Once you are set up, you can now start your server by typing:

- `nodemon app.js`

Now you should be able to change your message in your `res.send` to ("Hello, express") and when you refresh the browser, it should change automatically, you can see `nodemon` giving you messages in terminal that it is restarting.

<details><summary>Mini BONUS with nodemon</summary>

Is typing `nodemon app.js` just too much? You can go into your `package.json` and update the property of `main` to be `app.js` instead of the default `index.js`

Now you can just type `nodemon` and start your server!

</details>

<br />

### Adding Another Route

Let's add another route

```js
const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.send("I love express!");
});

app.get("/universe", (request, response) => {
  response.send("Hello Universe!");
});

app.listen(3003, () => {
  console.log("I am listening for requests on port 3003!");
});
```

How can you make a request to your new route?

<details><summary>Answer</summary>

http://localhost:3003/universe

</details>

<br />

### grep and kill nodemon

If you don't cancel out of your server properly before putting your computer to sleep or if you try to run nodemon on the same port multiple times, you may end up having `nodemon` running amok in your background processes.

You can restart your whole computer or you can kill the process.

First, we must find the process.

To do so we'll run a command `ps` (short for process status) and the flag `-A` (all).

We will then use pipe `|` to be able to use `grep` (global regular expression print) to search for `nodemon` specifically.

First, run

- `ps -A | grep nodemon`

![](./assets/ps-grep.png)

On the left, you will see the process number, in this case it is `26625`

Now you can kill the process by typing

- `kill 26625`

Get into good habits of exiting out of programs gracefully in order to avoid having to take extra troubleshooting steps like the ones above.

### An aside about newer JS syntax

You may have seen other JavaScript applications use
`import` and `export`

`import` and `export` are newer syntaxes. In order to get them working in our app, we would have to set up a compiler like [babel](https://babeljs.io).

If that sounds complicated and you're already feeling overwhelmed with new information, it's ok! We'll just be sticking with the basics today.

</details>
<br />

## Lab Time!

[Intro to Express Lab](https://github.com/joinpursuit/intro-to-express)

If you already have had experience with express or another back-end, you may find the first few activities going by quite quickly.

You are encouraged to work on
[Express UFO](https://github.com/joinpursuit/express-ufo) this is a far more challenging activity that will help you sharpen your express and JavaScript skills.
