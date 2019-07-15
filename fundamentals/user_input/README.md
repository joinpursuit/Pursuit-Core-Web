# User Input in NodeJS

## Goals
* Understand what user input means in a command line interface (CLI) application
* How to implement `require` and use modules
* Use `readline` module to get user input + utilize that input
* Create a CLI application

## Keywords
* Modules
* Require
* Threads

## Resources

* [What is a Thread](https://stackoverflow.com/questions/5201852/what-is-a-thread-really)
* [Philip Roberts - JS Event Loop](https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html)
* [Asynchronous vs Synchronous](https://stackoverflow.com/questions/748175/asynchronous-vs-synchronous-execution-what-does-it-really-mean)
* [What does it mean that Javascript is Asynchronous](https://www.quora.com/What-does-it-mean-that-Javascript-is-asynchronous)

## Lesson

## The Readline Module

NodeJS handles most user input in an asynchronous manner. To illustrate, let's examine the `on` function that is part of the **readline module**. A _module_ is reusable code that exists in another file. In order to access a specific module (file), we use the `require` keyword:

```js
const readline = require('readline')
```

The **readline module** is built into node - if you can run node you are able to access readline. The variable to the left of `require` can have any name, However, The string to the right of `require` (`'readline'`) must remain exactly the same. This string would be used to find a file whose name is `readline`. There is one more step to be made to set up a readline interface - this will be given to you as a boilerplate, and it's not something you need to be concerned with at the moment.

```js
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
```

Now we can use the variable `rl` to handle the user's input. The readline interface asynchronously listens to an input stream coming from the user via keyboard input. It does so on a separate thread, so the execution of JS code does not get interrupted. Readline can respond to certain events - such as a user pressing the `enter` key. We can provide a callback to readline, and when the user presses `enter`, readline will put that callback function in the JS task queue, with the user's input as an argument to that function.

To respond to a line of input from the user, we use the readline's `on` method: we provided a string with the desired event - in this case `'line'` and a callback that expects the user's input as arguments.

```js
rl.on('line', function(input) {
  console.log('your input was: ' + input)
})
```

This isn't terribly useful. With command line applications, you generally give the user options to choose from and then execute a command based on what they type. Think about using git in the terminal--typing `git help` pulls up a huge menu of options. From there you can type in different commands following `git` and different commands will be executed.

To do this ourselves, we will implement switch statements, which are good for when you want to do a _bunch_ of `else if` statements. Let's see:



### Boilerplate

These are all the excerpts of code we have used in this lesson to create a node app with readline. Use them as a boilerplate when writing your own node app.

```js
//  importing the readline module
var readline = require('readline')

// We will be able to use `rl`
// Only After creating the readline interface
// creating input, output and prompt methods on the readline interface
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Enter a command. Type 'menu' to see commands."
})

// invoke the prompt
rl.prompt()

// Listening to end of line event
// Checks input (here called line) against case statements
rl.on('line', function(line) {
  switch (line.trim()) {
      case 'menu':
        console.log(<GIVE USER MENU CHOICES>);
        break;
      default:
        console.log(`Say what? I might have heard '${line.trim()}'`);
        break;
    }
    rl.prompt();
}).on('close', () => {
  // this is the function that exits the application and closes readline
  console.log('>>Have a great day!');
  process.exit(0);
})
```
