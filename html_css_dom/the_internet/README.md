[![Pursuit Logo](https://avatars1.githubusercontent.com/u/5825944?s=200&v=4)](https://pursuit.org)

# The Internet

It's a series of tubes.

## Learning Objectives

- Talk about what the internet is
- Discuss client/server architecture
- What happens when you type in a url?
- Request/response lifecycle
- Javascript requests

## Prerequisites

- Some familiarity with javascript

---

## Framing & Background

What is the internet? What is it actually made of? How does it work? How do computers talk to each other? All of this is relevant to our jobs as programmers.

So far, all the code we have written has only existed and run on our local computers. Starting today, we're going to be learning about many things, but most importantly we'll talk about **requests** and how they work. They will be an essential part of our skillset as software engineers building web applications.

## What is the internet?

Short answer: it's a [series of tubes](https://www.youtube.com/watch?v=R8XSo0etBC4)

Long answer:

The internet is made up of many different types and layers of computers. These computers are connected by fiber optic cables that run around the world. Some even run [across the bottom of the ocean](https://en.wikipedia.org/wiki/Transatlantic_communications_cable).

There is no one place that the internet lives - it's distributed across many different cities, though in many places it's especially concentrated. For example, in Ashburn, VA there are dozens of warehouses holding rows and rows of computers. Some estimates say that 70% of all US internet traffic flows through there, but there's no way to reliably measure that.

Since the internet doesn't live only in one place, there are many challenges with routing internet traffic. There are special computers called DNS servers that just tell other computers where a website's traffic should be routed. Other computers (switches) do the actual routing - literally moving electrons from one fiber optic cable to another.

Just like the internet doesn't exist in one place, there is no single company that runs the internet. There are only a handful of companies that manage networks though, and the networks they manage are called [Tier 1 networks](https://en.wikipedia.org/wiki/Tier_1_network). Sometimes they're called `backbone` networks, and they are extremely large and critical to the continued operation of the internet. If one of these backbones went down, everything connected to it would be unable to communicate - though the rest of the networks would be able to.

![tier 1 network map](https://www.ntt.com/content/nttcom/hq/en/services/network/gin/_jcr_content/par02/tabinpage/tabInPagePar1/image.img.png/1459936652746.png)

![tier 1 network map 2](https://yudhanjaya.com/wp-content/uploads/2016/06/image03.png)

## Clients and servers

You've probably heard the words `client` and `server` before. In a general sense, both of these words just refer to computers. A computer can be either a client, or a server, or sometimes (like your laptop) both!

A `server` is a computer, listening for requests, and sending back responses. This response information can be many things, but is usually something like:

- files like photos, html, or videos
- data from a database

A `client` is a computer that asks the server for information. A client can be a laptop, a phone, a web browser, a program on your computer, a `node` script.

You can run a `node` server on your computer and make requests to it from your same computer. We will do this a lot when we get into module 4. Where the server is and where the request comes from doesn't make any difference.

## Request-Response lifecycle

When we talk about requests in this context, we're specifically talking about [HTTP Messages](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages). A message is either a request or a response.

![request response](https://vanilla-java.github.io/images/Request-Response.jpg)

- The client sends a request for data to the server.
- The server processes that request and then sends a response back.
- The client handles that response and then does something with the data, like displaying it on the screen - usually updating some HTML to make it appear.

Note that the client is always the one that initiates the request. By definition, that's what makes it a client. The server is the one that responds to that request.

**HTTP Status Codes**

HTTP messages have special `status codes` that indicate whether the response was successful or not. Response codes range from 100-500ish and are broken down into categories:

- 100 - Information
- 200 - Success
- 300 - Redirection
- 400 - Client errors
- 500 - Server errors

The most common status codes you'll see are:

- `200` which means "OK", or that the request was successful and the response was sent back without issue.
- `301` which means "this was moved elsewhere". If you type `google.com` and your browser takes you to `www.google.com` its because of a `301` response.
- `404` which means "this page was not found"
- `500` which means "the server encountered an error". Sometimes you get a nice message back about why, but often you do not.

**HTTP Request Methods**

There are multiple types of requests that clients can make. 

* GET - give me some data
* POST - here have this data
* PUT - here update this data
* DELETE - please delete this data

## Making your own requests

You may not realize that you have already been making requests!

## Summary

Do a quick review at the end of the lesson to talk about what you covered.

### Resources

- [HTTP Messages](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages)
- [HTTP Status Codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
