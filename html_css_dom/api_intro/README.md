## Introduction to the Internet, Networking, APIs, and the Event Loop

**Objectives**
- Understand how clients and servers interact
- Understand what an API is and how we interact with them
- Retrieve data from an API
- Read data in JSON format
- Use Postman to get data
- Know and understand the event loop.
- Know the different phases of the event loop.
- Be able to accurately trace the stack and predict the behavior.
- Deepen understanding of asynchronous behavior.


**Readings**  
1. [Mozilla Developer Network - How does the internet work?](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work)
2. [Programmable Web - APIs](https://www.programmableweb.com/api-university/what-are-apis-and-how-do-they-work)
3. [HTTP status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
4. [MDN - Concurrency model and Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
5. [Hackernoon](https://hackernoon.com/understanding-js-the-event-loop-959beae3ac40)
6. [medium](https://medium.com/front-end-hacking/javascript-event-loop-explained-4cd26af121d4)



# 1. Introduction

The **internet** is the backbone of the web, the technical infrastructure that makes the web possible. At its most basic, the internet is a large network of computers which communicate all together.

**Finding computers**   
A computer connected to a network has a unique identifier known as an IP address _(internet protocol)_. An example of an IP address would be `192.168.2.10`

That IP address is perfectly fine for computers, but for human readability we use an alias called the **domain name**. For example, `apple.com` is the domain name used on top of the IP address `17.142.160.59`. Using a domain name is the easiest way for us to reach a computer on the internet. Websites can be reached directly using their IP address. You can find the IP address of a website by typing its domain into a tool like [Google](https://www.google.com/search?q=what%20is%20my%20ip)

**Clarification**  
The internet is a technical infrastructure which allows billions of computers to be connected all together. Among those computers, some computers (called Web servers) can send messages that are intelligible to web browsers. The internet is an infrastructure, whereas the _Web_ is a service built on top of the infrastructure. Some other services on top the internet are email and [Internet Relay Chat (IRC)](https://en.wikipedia.org/wiki/Internet_Relay_Chat).

# 2. Clients and servers

Computers connected to the web are called **clients** and **servers**.

![Clients and Servers](https://mdn.mozillademos.org/files/8973/Client-server.jpg)

- Clients are the typical web user's internet-connected devices (for example, your computer connected to your Wi-Fi, or your phone connected to your mobile network) and web-accessing software available on those devices (usually a web browser like Safari or Chrome).
- Servers are computers that store webpages, sites, or apps. When a client device wants to access a webpage, a copy of the webpage is downloaded from the server onto the client machine to be displayed in the user's web browser.

In addition to the client and the server, we also need to say hello to:
- **Your internet connection:** allows you to send and receive data on the web.
- **TCP/IP** transmission control protocol and internet protocol are communication protocols that define how data should travel across the web.
- **DNS** Domain Name Servers are like an address book for websites.
- **HTTP** Hypertext Transfer Protocol is an application protocol that defines a language for clients and servers to speak to each other.

**So what happens, exactly?**   
When you type a web address into your browser:

1. The browser goes to the DNS server, and finds the real address of the server that the website lives on.
2. The browser sends an HTTP request message to the server, asking it to send a copy of the the website to the client. The message, and all other data sent between the client and the server, is send across your internet connection using TCP/IP.
3. If the server approves the client's request, the server send the client a "200 Ok" message, which means "of course you can look at that website, here it is" and then starts sending the website's files to the browser as a series of small chunks called data packets.
4. The browser assembles the small chunks into a complete website and displays it to you.

# 3. Using curl to get information from online

**Let's see what a request -> response looks like using curl**   
Go to your terminal and type in the following [curl](https://en.wikipedia.org/wiki/CURL) command:

The command below makes a request to apple.com:

`curl -I https://www.apple.com`

The above curl command will give you header information of the requested website

> HTTP/2 200
server: Apache
x-frame-options: SAMEORIGIN
x-xss-protection: 1; mode=block
x-content-type-options: nosniff
content-type: text/html; charset=UTF-8
strict-transport-security: max-age=31536000; includeSubDomains
cache-control: max-age=96
expires: Tue, 20 Aug 2019 21:48:09 GMT
date: Tue, 20 Aug 2019 21:46:33 GMT
set-cookie: geo=US; path=/; domain=.apple.com
set-cookie: ccl=YQU/Mm7fZByrRPAxBHREZ21aHRLpodyGOxLTQsn1FFMVyU/BsxU84RaNAWt3j9b+CxAUOnaGK1CNqTp4c894auXI5sQwTFvBfHQLchxq9UeAvUTwFA0EVQ==; path=/; domain=.apple.com

Using curl to make a request to an [API](https://en.wikipedia.org/wiki/Web_API) (more about APIs in this unit!)   
`curl https://itunes.apple.com/search?term=swift+over+coffee&media=podcast`  

[JSON](https://json.org/) response
```json
{
	"resultCount": 1,
	"results": [{
		"wrapperType": "track",
		"kind": "podcast",
		"collectionId": 1435076502,
		"trackId": 1435076502,
		"artistName": "Paul Hudson and Sean Allen",
		"collectionName": "Swift over Coffee",
		"trackName": "Swift over Coffee",
		"collectionCensoredName": "Swift over Coffee",
		"trackCensoredName": "Swift over Coffee",
		"collectionViewUrl": "https://itunes.apple.com/us/podcast/swift-over-coffee/id1435076502?mt=2&uo=4",
		"feedUrl": "https://anchor.fm/s/572fc68/podcast/rss",
		"trackViewUrl": "https://itunes.apple.com/us/podcast/swift-over-coffee/id1435076502?mt=2&uo=4",
		"artworkUrl30": "https://is2-ssl.mzstatic.com/image/thumb/Music118/v4/73/24/2c/73242c65-1b6f-0dce-9740-fa84a92607e1/source/30x30bb.jpg",
		"artworkUrl60": "https://is2-ssl.mzstatic.com/image/thumb/Music118/v4/73/24/2c/73242c65-1b6f-0dce-9740-fa84a92607e1/source/60x60bb.jpg",
		"artworkUrl100": "https://is2-ssl.mzstatic.com/image/thumb/Music118/v4/73/24/2c/73242c65-1b6f-0dce-9740-fa84a92607e1/source/100x100bb.jpg",
		"collectionPrice": 0.00,
		"trackPrice": 0.00,
		"trackRentalPrice": 0,
		"collectionHdPrice": 0,
		"trackHdPrice": 0,
		"trackHdRentalPrice": 0,
		"releaseDate": "2018-11-26T15:47:00Z",
		"collectionExplicitness": "cleaned",
		"trackExplicitness": "cleaned",
		"trackCount": 7,
		"country": "USA",
		"currency": "USD",
		"primaryGenreName": "Technology",
		"contentAdvisoryRating": "Clean",
		"artworkUrl600": "https://is2-ssl.mzstatic.com/image/thumb/Music118/v4/73/24/2c/73242c65-1b6f-0dce-9740-fa84a92607e1/source/600x600bb.jpg",
		"genreIds": ["1318", "26"],
		"genres": ["Technology", "Podcasts"]
	}]
}
```

## HTTP Response Codes

Servers send HTTP status codes to provide quick information on the response sent by the client.

- 1xx (Informational): Request received, continuing process
- 2xx (Successful): the action was successfully received, understood, and accepted
- 3xx (Redirection): Further action needs to be taken in order to complete the request
- 4xx (Client Error): The request contains bad syntax or cannot be fulfilled
- 5xx (Server Error): The server failed to fulfill an apparently valid request


# 4. APIs

You may have heard the acronym _API_ in your time at Pursuit, but what exactly does it mean? **Application Programming Interface** doesn't really explain much.  An API is the link between your application, and data that you are interested in getting or changing.  In your TicTacToe game, you wrote an API for your `GameBrain`, which had methods like `makeMove(at:)` and `getCurrentPlayerTurn()`.  Apple provides APIs that you have used in basic classes.  For example, the `Array` API includes a `sorted(by:)` method that you can use.  

APIs can also live online.  This is typically what people mean when they say _API_. These APIs can also be used to receive, delete, and update information.

### How do APIs work?

Let's think about APIs that fetch data from servers, since these are the APIs you will be working with most often. To understand how APIs work, let's use [this helpful analogy](https://www.upwork.com/hiring/development/intro-to-apis-what-is-an-api/).  Think of a web application like an ATM. When you walk up to an ATM, you expect it will allow you to access your account and complete a transaction like withdrawing cash. Like an ATM, an app provides a function, but it’s not doing this all by itself—it needs to communicate both with the user, and with the “bank” it’s accessing.

APIs allow the ATM to communicate with your bank. The programming is the engineering part of the app’s software that translates input into output. In other words, it translates your request for cash to the bank’s database, verifies there’s enough cash in your account to withdraw the requested amount, the bank grants permission, then the ATM communicates back to the bank how much you withdrew so that the bank can update your balance.

In a nutshell, that’s an API: _an interface that software uses to access whatever currency it needs_: data, server software, or other applications. In the case of the ATM, **the machine is the end user of an API**, not the customer pressing the buttons. It’s the same in the digital world.

![atm-analogy](https://content-static.upwork.com/blog/uploads/sites/3/2016/09/26071617/Screen-Shot-2016-09-26-at-10.15.24-AM.png)

### Using an API

In our example, the ATM makes a connection with the bank **through** the bank API. The API is the gatekeeper between the ATM (the user) and the bank vault. As developers, we use and create APIs all the time. When someone creates an API, they are _defining how you will allow developers to access your information_, typically the information stored in their database. These are called **endpoints**. In the case of the bank API, you are allowed to only do a few things from the ATM: check your balance, deposit money, withdraw money. You can't take out a loan, set up a 401(k), or print last year's tax return because the bank set up their API to **only allow** users to access certain information from the ATM.

The same is true of most databases. Think about social media apps, like Twitter. As a user, you can interact with Twitter's database in specific ways: you can post tweets, delete tweets, add/remove photos, etc. You _cannot_ remove other people's tweets (unfortunately!) because Twitter's API makes sure that user's can only modify **their own** property. Imagine if you were able to delete other people's tweets and accounts? That would lead to _chaos_!

# 5. Hitting APIs in the browser

Let's look at a _simple_ API and start playing around with it. First, download this [JSON Viewer](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh?hl=en-US) Chrome extension. This will make viewing the data that you receive from APIs much more readable.

#### Dog Breeds API

The first thing every developer needs to do when working with an API is **READ THE DOCUMENTATION!** These are the instructions for how to use the API and what information is available. If you do not read the documentation, you will not know how to use the API and none of your instructors will help you until _after_ you've read the docs.

We are going to work with the Dog API because it is free and open. Some APIs cost money (like Google Maps now) and others require multiple levels of authentication (like Spotify), but the Dog API can be used by anyone! Let's go to the [documentation](https://dog.ceo/dog-api/documentation/) and read how this API works. There are only 5 endpoints for this API: list all breeds, random image, by breed, by sub-breed and breeds list (which is the same as random image with a breed list dropdown).

The List All Breeds endpoint is shown on the main documentation page and you can see it is accessed by the URL https://dog.ceo/api/breeds/list/all. This URL was defined by the software developer who designed this API by making their database store a list of all breeds at this URL. Now we as users can go to that URL and see a list of all breeds that exist in the Dog API database.

#### JSON

Below the URL is the JSON that is returned from the URL. JavaScript Object Notation (JSON) is a file format that uses human readable text to transmit data objects. We will always work with JSON data and nearly all APIs return their information in this format because it is easily read and parsed. If you look at the JSON on the page, you can easily understand what is happening.

The first line `status: success` tells the recipient (browser or application) that the request was a success. If the request was sent incorrectly or if you tried to access an endpoint you do not have access to, you have received a `failed` status.

The next line `message` includes all of the information we wanted to receive (list of breeds). You can see it's exactly what we expect it to be: a list of breeds. Each key is the name of the breed and each value is an array of sub-breeds (empty if the breed has no sub-breeds).

Let's do our own request: copy the link and paste it into your browser or click the link above. You just sent a request to the Dog API and received the results! Woo! You're interacting with the Dog API database through their API!

Now if you navigate to https://dog.ceo/api/breeds/image/random you will see that you get a result but it's just a link to an image. Hm.. not exactly ideal. This is because APIs return information as it exists in the database: it's up to _you_ to do something with the information to make it display in a way that is user-friendly. The Dog API's job is to give you the information you request and it is **your** job to do something with that information.

# 6. Hitting APIs using Postman

Looking at the responses in the browser is a good start, but we're going to want a better tool, especially when we need to start providing our own information to the endpoints.

Why would we need to give information to an endpoint?

<details>
<summary>Some solutions</summary>

- Add a new user
- Edit the profile picture of a user
- Delete information associated with a user

</details>

For now we're going to focus on getting information, but Postman will allow us to add in extra fields to accomplish the tasks above.

[Download Postman for Mac here!](https://app.getpostman.com/app/download/osx64) After downloading and installing, make sure you drag the Postman icon into your Applications folder to save it to your computer then open it up!

Let's use Postman to make a request to the Dog API. Paste the link for all breeds (https://dog.ceo/api/breeds/list/all) into Postman and press Send. What happens?

We get the _exact same thing_ as when we put the list into our browser. The GET request to the Dog API returns the same result regardless of when or how we send it--RESTful APIs!  Later, when we hit the endpoint from your website, the response will also be the same.  Make sure to use Postman to test out APIs: it gives lots of information about the response that you get back and you can save frequent requests that you might want to make.


# 7. The Event Loop

You've probably heard that JavaScript is single-threaded, but you've also heard that it's asynchronous. This is probably when you start to say, "that doesn't make sense, how could it be both?". Good question! Answer: JS is single-threaded, the asynchronous behavior is not part of the JS language itself, but is actually built on top of the core JS language in the browser (or other programming environment) and is accessed through the browser APIs.
Take a look at the following picture:

![eventLoopImage](https://github.com/joinpursuit/Pursuit-Core-Web/blob/master/html_css_dom/event_loop/assets/eventloopimg.png)

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


## Vocabulary

- **URI (Uniform Resource Identifier):** a system for identifying pieces of information on the network. [URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier)
- **HTTP Methods:** the protocol currently contains 8 methods for requesting a URI: `OPTIONS`, `GET`, `HEAD`, `POST`, `PUT`, `DELETE`, `TRACE`, `CONNECT`.
- **HTTP Headers:** headers are additional data sent by the user to give more context about the transaction going on between the client and the server. Some of them help the server reply in the most appropriate way.
