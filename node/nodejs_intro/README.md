# Node.js Intro + The Event Loop

# Topics
- What is Node.js?
- Diving deeper into Programming Languages
- Google's Javascript Engine: V8
- Know and understand the event loop.
- Know the different phases of the event loop.


# 1. What is Node.js?

### Why not just call it Javascript for Server?

If we go to the Node.js (Node, for short) [website](https://node.js.org/en/) we get the following definition:

```
Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
```

At first glance that is a very confusing and technical description of what Node.js really is. This lesson we will go through these technical concepts and finally run our first Node.js code!

We will also understand why it's different from browser based Javascript we've been working with so far.

# 2. Diving deeper into Programming Languages

### How does a computer program work?

![Chip](assets/microprocessor.jpg)

In all our computers, whether they be desktop computers, laptops, or mobile phones, are these very smartly designed microprocessor chips. These are the brains behind your computer and they are the ones that do all the calculations, interpretations and logic for your computer.

Essentially, your machine only understands 1s and 0s. You may ask then how do we code in Javascript and have the computer understand? That's a very good question!

### Higher Level Programming Languages

Your computer only understands Binary code. This means only 1s and 0s are processed by our processors. But we obviously can't code or read binary code easily, so that's why in the 1950s we developed 'Higher Level Programming Languages'.

These languages are C, Fortran, PASCAL and C++ to name a few. These languages are directly "compiled" into the Binary machine code our computers understand.

Your operating system is basically a computer program that is written in one of these languages.

![Machine Code](assets/machinecode.png)

### Interpreted Languages

Now, where does Javascript fit into all this? Does our Javascript code compile to binary? Unfortunately, it does not.

Javascript was developed in the 1990s to add interactions to websites. Your Web browser is just a computer program. It had to be written by someone using a High Level Programming Language.

It's a special type of program that does the following:

1. Make network requests to the Internet and retrieve data.
2. Interpret and display the data it recieves.

**Javascript, HTML and CSS are all *interpreted* by your web browser on the fly.**

Javascript ONLY works if a computer program such as a Web browser interprets it.

# 3. Google's Javascript Engine: V8

### Chrome's Javascript Interpreter

Let's take a look at the official Chrome V8 website: [https://developers.google.com/v8/](https://developers.google.com/v8/)


> V8 is Google’s open source high-performance JavaScript engine, written in C++ and used in Google Chrome, the open source 
> browser from Google, and in Node.js, among others. It implements ECMAScript as specified in ECMA-262, and runs on Windows 
> 7 or later, macOS 10.5+, and Linux systems that use IA-32, ARM, or MIPS processors. V8 can run standalone, or can be 
> embedded into any C++ application. More information can be found on V8's public wiki.

This is basically Google's open source engine that runs and interprets Javascript on all our Google Chrome web browsers.

The very smart people at Google then thought: What if we just run this standalone without a browser on a computer? That's how Node.js was born.

### Node.js Environment

A web server is just a computer serving data on the internet.

Google decided, with it's V8 Javascript Engine, it's possible to serve webpages, connect to databases, manage files all on the server side.

### Node.js: Addons to Javascript

Stand alone Javascript on the browser does not have a lot of the capabilities we need to handle Server Side programming.

Node.js includes many new libraries and tools to allow us to do the following:

1. Input/Output Buffers: Handle binary data
2. File System: Manage file system on your machine
3. HTTP Networking: Allows you to handle requests and responses
4. Streams and Pipes: Allows you to handle data in chunks as it comes in. (Example: Video streaming)
5. Access to the Operating System

These are some of many new things you can do with Javascript in the Node.js environment. Essentially, now Javascript can directly interface with your machine thanks to the V8 Engine.


# 4. The Event Loop

You've probably heard that JavaScript is single-threaded, but you've also heard that it's asynchronous. This is probably when you start to say, "that doesn't make sense, how could it be both?". Good question! Answer: JS is single-threaded, the asynchronous behavior is not part of the JS language itself, but is actually built on top of the core JS language in the browser (or other programming environment) and is accessed through the browser APIs.
Take a look at the following picture:

![eventLoopImage](https://i.imgur.com/rnQEY7o.png)

I know it looks pretty weird, but let's break down the different parts of the picture and see if we can get it to make more sense. For now, disregard the heap part.

The outer box is the Google Chrome that we know and love. For this example that is our programming environment.

The next box we see is the JS box. This is where our code runs. The call stack is where we are in the code. We can only push and pop things onto our stack. This represents the single thread provided.  

Our WebAPIs, is where the _magic_ happens. This is where our DOM lives, and our asynchronous calls such as SetTimeout, SetInterval, AJAX calls, and our event listeners. The WebAPIs are effectively threads in our JS.  

When we hit an asynchronous call in our stack, the call get's moved over to the WebAPI's area until it resolves.

This means that if our code has a setTimeout with a time of 5 seconds. That call will move over to the WebAPI and wait for 5 seconds.

Once a WebAPI has resolved, it then moves into the callback queue. A queue means first in, first out. Think about it like waiting in line. It's like only being able to use `shift` and `push` with an array.

The items in the queue get resolved only once the call stack is clear. Once the stack is clear it will take the first item from the queue and put it into the stack. Once the stack is clear again, the process will be repeated.

This circular motion of stack, to WebAPI, to Callback queue, to stack is the _Event Loop_.

Using this information let's see if we can predict the order that things will occur:

```js
console.log("Hello,");
setTimeout(() => console.log("I am"), 1000);
console.log("Yoda");

```

What is expected output?

<details>
  <summary>
    Solution
  </summary>


    Hello,
    Yoda
    I am
</details>

Let's take a look at why? The first thing that will be moved onto our stack is `console.log("Hello,");`. This immediately resolve and be popped off our stack.

Next thing pushed onto the stack is the setTimeout. Because this is an asynchronous call it will get moved over from our stack to the WebAPI and begin to count down for 1 second.

Our code continues to run and pushes the final console log onto our empty stack. It immediately resolves and is then popped off.

The current state of our loop is: Empty Stack, SetTimeout in WebAPI, and empty callback queue.

After 1 second, our setTimeout resolves and moves the callback (our final console log) to the callback queue.

Because our call stack is empty, the first item of our callback queue is moved onto the stack. The console log is
immediately resolved and popped off the stack.

Our code finishes running.

Let's try another example:

```js
console.log("Hello,");
setTimeout(() => console.log("I am"), 0);
console.log("Yoda");
```

What do we think the output to screen will be now?
<details>
  <summary>
    Solution
  </summary>
   The output will be identical to the previous example. The reason: Our setTimeout is moved into the WebAPI regardless of
  how quickly it is set to resolve.
</details>
