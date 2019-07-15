# APIs

## Goals

- Understand what an API is and how we interact with them
- Retrieve data from an API
- Read data in JSON format

## Keywords

- Application Programming Interface (API)
- JavaScript Object Notation (JSON)

## Lesson

## APIs

You may have heard the acronym _API_ in your time at Pursuit, but what exactly does it mean? **Application Programming Interface** doesn't really explain much. API is actually much broader than you might expect and can mean a number of different things. For our purposes and your future career, you can think of APIs as being able to do one of the following:

- **Manipulating documents in the browser**: The DOM API (that's an API!!? 🤯), as you know, allows you to manipulate HTML and CSS, thus changing the page.
- **Drawing and manipulating graphics**: Allows you to programmatically update the pixel data contained in an HTML `<canvas>` element to create 2D and 3D scenes. Canvas and WebGL are two common tools you may use. Such APIs are often combined with APIs for creating animation loops (such as `window.requestAnimationFrame()`) and others to make constantly updating scenes like cartoons and games.
- **Fetch data from a server**: This is the **MOST COMMON** use you will find for APIs and is typically what people mean when they say _API_. These APIs can also be used to update small sections of a webpage on their own. This seemingly small detail has had a huge impact on the performance and behavior of sites — if you just need to update a stock listing or list of available new stories, doing it instantly without having to reload the whole entire page from the server can make the site or app feel much more responsive and "snappy". APIs that make this possible include XMLHttpRequest and the Fetch API. You will learn the term Ajax in coming lessons, which describes this technique.

### How do APIs work?

Let's think about APIs that fetch data from servers, since these are the APIs you will be working with most often and ultimately creating yourself :sunglasses:. To understand how APIs work, let's use [this helpful analogy](https://www.upwork.com/hiring/development/intro-to-apis-what-is-an-api/): think of a web application like an ATM. When you walk up to an ATM, you expect it will allow you to access your account and complete a transaction like withdrawing cash. Like an ATM, an app provides a function, but it’s not doing this all by itself—it needs to communicate both with the user, and with the “bank” it’s accessing.

APIs allow the ATM to communicate with your bank. The programming is the engineering part of the app’s software that translates input into output. In other words, it translates your request for cash to the bank’s database, verifies there’s enough cash in your account to withdraw the requested amount, the bank grants permission, then the ATM communicates back to the bank how much you withdrew so that the bank can update your balance.

In a nutshell, that’s an API: _an interface that software uses to access whatever currency it needs_: data, server software, or other applications. In the case of the ATM, **the machine is the end user of an API**, not the customer pressing the buttons. It’s the same in the digital world.

![atm-analogy](https://content-static.upwork.com/blog/uploads/sites/3/2016/09/26071617/Screen-Shot-2016-09-26-at-10.15.24-AM.png)

### Using an API

In our example, the ATM makes a connection with the bank **through** the bank API. The API is the gatekeeper between the ATM (the user) and the bank vault. As developers, we use and create APIs all the time. When you are creating an API, you are _defining how you will allow developers to access your information_, typically the information you are storing in your database. These are called **endpoints**. In the case of the bank API, you are allowed to only do a few things from the ATM: check your balance, deposit money, withdraw money. You can't take out a loan, set up a 401(k), or print last year's tax return because the bank set up their API to **only allow** users to access certain information from the ATM.

The same is true of most databases. Think about social media apps, like Twitter. As a user, you can interact with Twitter's database in specific ways: you can post tweets, delete tweets, add/remove photos, etc. You _cannot_ remove other people's tweets (unfortunately!) because Twitter's API makes sure that user's can only modify **their own** property. Imagine if you were able to delete other people's tweets and accounts? That would lead to _chaos_!

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

## Resources

- [Web APIs - MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction)
- [AJAX - W3Schools](https://www.w3schools.com/xml/ajax_intro.asp)
