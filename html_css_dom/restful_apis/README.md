# RESTful APIs

## Goals
* Explain the purpose of a RESTful API
* Know what CRUD is

## Keywords
* API
* Representational State Transfer (REST)
* RESTful API
* HTTP Request Methods:
  * GET
  * POST
  * PUT
  * PATCH
  * DELETE
  * CRUD

## Resources

* [What is a RESTful API?](https://restfulapi.net/)
* [REST Naming Guide](https://restfulapi.net/resource-naming/)
* [RESTful API Overview](https://searchmicroservices.techtarget.com/definition/RESTful-API)
* [REST - Wikipedia](https://www.wikiwand.com/en/Representational_state_transfer)
* [HTTP Requests - W3Schools](https://www.w3schools.com/tags/ref_httpmethods.asp)

## 1. REST Introduction

A **RESTful API** is an application program interface (API) that uses HTTP requests to GET, PUT, POST, PATCH and DELETE data. When we were interacting with the Dog API, we were using _GET_ requests: we were _getting_ data from a source. But there are other methods that you can use when interacting with APIs such as updating (PUT), adding (POST), and removing (DELETE). The Dog API has been written in such a way where we, random users, cannot update, add or remove information from the database. This is a safety measure because you don't want _random users_ deleting your information!

A RESTful API -- also referred to as a RESTful web service -- is based on REpresentational State Transfer (REST) technology, an architectural style and approach to communications often used in web services development. As explained by [resfulapi.net](https://restfulapi.net/rest-architectural-constraints/), there are **six guiding principles** for a RESTful API.

## 2. API Principles

1. **Uniform interface** -  You MUST decide APIs interface for resources inside the system which are exposed to API consumers and follow religiously. This means you need to have a **clear vision** for how all of your data will be stored. It must be stored in a logical and scalable way. A resource in the system should have only _one logical_ URL and that should provide a way to fetch related or additional data. Any single resource should not be too large and contain each and everything in its representation.
    * Think about the Dog API--the way to obtain information from it made sense. If you wanted a list of dog breeds you sent a request to https://dog.ceo/api/breeds/list/all and received a list of all dog breeds. This is a logical way to organize data because it is _organized_ and is clear to the user what information will be received. The URLs are defined by **YOU** the developer, so it is important it makes sense to people who are **not you**.
    * Having a clearly organized API makes it incredibly useful to yourself and other developers so do not take this step lightly!! Map out your API before coding it: **If you fail to plan, plan to fail!**

2. **Client–server** – The client is never directly interacting with the server. By separating the user interface concerns from the data storage concerns, we improve the portability of the user interface across multiple platforms and improve scalability by simplifying the server components. This essentially means that client application and server application MUST be able to evolve **separately** without any dependency on each other.

3. **Stateless** – Session state is kept entirely on the client. Each request from client to server must contain all of the information necessary to understand the request, and cannot take advantage of any stored context on the server. The server will not store anything about latest HTTP request client made. _It will treat each and every request as **new**_. No session, no history.

4. **Cacheable** – Cache constraints require that the data within a response to a request be implicitly or explicitly labeled as cacheable or non-cacheable. If a response is cacheable, then a client cache is given the right to reuse that response data for later, equivalent requests.

5. **Layered** - REST allows you to use a layered system architecture where you deploy the APIs on server A, and store data on server B and authenticate requests in Server C, for example. A client cannot ordinarily tell whether it is connected directly to the end server, or to an intermediary along the way.

6. **Code on demand** (optional) - Most of the time you will be sending the static representations of resources in form of  JSON. But when you need to, you are free to return _executable code_ to support a part of your application e.g. clients may call your API to get a UI widget rendering code. It is permitted.

## 3. RESTful API Endpoints

In REST, primary data representation is called **Resource** or **Endpoint**.  Having a strong and consistent REST endpoint naming strategy will definitely help the usefulness and scalability of your API in the long term. An endpoint can be a singleton or a collection. For example, “breeds” is a collection resource and “breed” is a singleton resource (in the Dog API domain). We can identify “breeds” collection resource using the URI [“/breeds”](). We can identify a single “breed” resource using the URI [“/breed/{breedName}”](). Another acceptable way to structure this would be to use the URI ["/breeds/{breedName}"]() or even ["/breeds/{breedId}"]().

A resource may also contain sub-collection resources. For example, sub-collection resource “sub-breeds” of a particular “breed” can be identified using the URN [“/breeds/{breedName}/sub-breeds”]() (in the Dog API domain). Similarly, a singleton resource “subBreedName” inside the sub-collection resource “sub-breeds” can be identified as follows: [“/breeds/{breedName}/sub-breed/{subBreedName}”]().

Regardless of how you decide to structure your own API or when you're using a third-party API, the forward slash (/) indicates a hierarchical relationships. You can also use hyphens (`-`) to improve readability but **do not** use underscores (`_`) because they are not always clearly visible with certain fonts.

Here are some examples of good RESTful API endpoints that utilize appropriate naming conventions:
http://api.example.com/device-management/managed-devices => _We would expect this to display a list of managed devices_ <br>
http://api.example.com/device-management/managed-devices/{device-id} => _We would expect **one** device_<br>
http://api.example.com/user-management/users => _What would we expect here?_<br>
http://api.example.com/user-management/users/{id} => _What would we expect here?_<br>


## 4. Interacting with APIs

To fully interact with APIs, we will use Postman. Postman is a common tool developers use to test the functionality of an API: _"If I send this POST request to the API, will it work? What is the result from this GET request?"_ These are questions you will be asking yourself over and over, so it is very important that you use tools like Postman because it allows you to understand how an API works **before** you put it into your code and plan accordingly. **Remember: If you fail to plan, plan to fail!**

The Dog API from last lesson has been great, but we can only make GET requests. To see how the other methods work, we are going to use a different API that allows random users (like us!) to also send POST, PUT and DELETE requests. These requests are built into the _World Wide Web_ and are collectively called HTTP Requests.  The documentation can be found here: https://jsonplaceholder.typicode.com/.

#### GET Request

Let's start by testing a GET request to https://jsonplaceholder.typicode.com/posts in Postman. As we know, GET requests simply return information stored at a specific endpoint.

What do the results of this GET request look like? What data is stored in this API? What are the **keys**?

#### POST Request

POST Requests are different from GET requests because you are _sending new information **to** the database through the API_. Many sites use "posts" to describe their data so it can sometimes get confusing. There are posts on Twitter, Facebook, blogs, etc. In this case "posts" just means a list of fake blog posts. So POST requests !== posts. Now, when you type in a POST endpoint, the API will not return information from the database. Instead, it will expect **you** to send information which it will then use to create a new resource in the database. Looking at the examples [here](https://github.com/typicode/jsonplaceholder#how-to), you can see a lot of info:

```js
fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => console.log(json))
```

Since we are using Postman, we don't have to worry about a lot of what's happening in that POST request. Don't worry though--you **will** have to worry about that very soon! For now, we just need to focus on what's in the `body` of the POST request. This is the information you are _sending to the database_. Whoever wrote this API has defined **specific information** that can be received at this endpoint. That information is: `title`, `body` and `userId`. If you send any additional information like `date`, the API will not accept it because it has not been told to accept any `date` information. While APIs are powerful tools, they are also very dumb. Like all applications, they **only** do as they are told and can't understand anything else.

In Postman, click on GET next to the URL box and change it to POST. You can see _all_ the various requests you can make from Postman to APIs in that dropdown--most of which you will not need to ever use. We do not need to change the URL because the URL https://jsonplaceholder.typicode.com/posts accepts GET and POST requests. It is common for one endpoint to accept multiple types of requests.

Since this is a POST request, we need a body. So click on "Body", then "x-www-form-urlendocoded" and lastly click "Bulk Edit". Paste the following in the text box:

```js
title: foo
body: bar
userId: 1
```

Then click "Key-Value Edit" and you should see all your information neatly organized into key-value pairs. We **DID NOT** include quotation marks around our values because Postman (and forms in general) will automatically turn them into strings. If we included quotes, our information would be stored **WITH** quotes around them.

Now click send! What is our response? The same thing as what we sent _plus_ an ID. This response tells us that it was successful (if it were _not_ successful, we would have received an ERROR message) and that our information was added to the database and has an ID of 101. Unfortunately this database doesn't _actually_ store this information so we cannot now make a GET request to [/posts/101]() and see our post. If this were a real API, like Twitter, we would be able to now see the information we sent displayed.

Let's try sending the same information to https://jsonplaceholder.typicode.com/posts/1, which **does not** accept POST requests. What is our response now?

#### PUT + PATCH Requests

PUT and PATCH requests are both requests that can be sent to _edit/update_ specific information in the API. Since these both refer to specific information, they are only applicable with singleton resources (like one dog breed or one specific blog post). While PUT and PATCH both _edit_ information contained within the database, they are different.

* **PUT** edits the _entire_ data point. If you make a PUT request to [/posts/1]() it would edit everything about that post. You need to send updated values for each key stored at that data point, otherwise the value will be `undefined`.
* **PATCH** edits _specified_ parts of the data point. If you make a PATCH request to [posts/1](), you could only send and update `title` and it would _only_ update title.

Let's send a PUT and PATCH request to blog post 1:

```js
// PUT
title: bar
body: foo
userId: 1
```
```js
// PATCH
title: foo
```

How are the responses to each request different? Play around with each request and see what happens.

#### DELETE

Delete, as the name suggests, will _remove_ resources from the database. If you DELETE a resource, it’s removed from the collection of resource and repeatedly calling DELETE on that resource will not change the outcome. However calling DELETE on a resource a second time will return an error since it was already removed.

Like with PUT and PATCH, a DELETE request can only be sent to a _singleton resource_ which means you can only delete **one item** at a time.

<details>
  <summary>How might a DELETE request look? Would it require a body?</summary>
  <strong>No.</strong> It would not need a body. Since it removes one entity from the database completely, the API will be set up in such a way that the endpoint tells the database to remove the item with that ID: <code>https://jsonplaceholder.typicode.com/posts/1</code>
 This endpoint tells us, the user, that blog post one lives at this route. If we send a GET request to this endpoint, we would expect to receive that blog post. If we sent a PUT/PATCH request, we would expect to be able to update that post. And, now, if we send a DELETE request we would expect to remove that post.
  </details>

Send a DELETE request to the URL. What is the return value? Why might this be?

## 5. CRUD

Another acronym you may have heard and will definitely hear in the future is _CRUD_. This stands for <b>C</b>reate, <b>R</b>ead, <b>U</b>pdate, and <b>D</b>elete. CRUD represents the basic functionality we have all come to expect from an application. Let's think about this in terms of Instagram.

In terms of CRUD, _create_ means being able to ADD information to whatever application we are using. Write a blog post, post a picture, update your status, whatever. We can _create_ content on Instagram and do this by posting photos.

In CRUD _read_ doesn't necessarily mean reading words on the page but instead consuming content in whatever form the application displays it. We can _read_ information from Instagram by scrolling through photos, reading articles on Facebook, reading blog posts. Reading is a passive activity, meaning you are not doing anything to change the content.

_Update_ is more straightforward. This means you can _edit_ the information that already exists. On Wikipedia, you can _edit_ any page you'd like! It might be rejected and removed, but you can still _edit_ the information provided by the Wikipedia database. On Instagram, you can change your caption, tag people after posting or update the location. These are all forms of _updating_ the database.

Lastly, _delete_, which is also straightforward. This means the user can _delete_ information from the application database and remove it permanently. On Instagram, you are free to delete any of your content that you no longer want to show! It is removed from the database and there is no record of it ever existing (unless their database it backed up. In which case, that embarrassing spring break photo may resurface in your run for President).

Every application you use and create should be a CRUD app. If you cannot update information in your app, it is not a great user experience. Imagine if when you posted something to Instagram, it was there ***FOREVER*** or you were unable to edit your caption and remove a typo. This would not be ideal! Here's a list of which CRUD actions align with which RESTful API HTTP requests:

HTTP METHOD	| CRUD | Route (e.g. [/users]())
-------- | ------ | -----
POST | Create | [/users/{id}]() containing new ID.
GET | Read | [/users/{id}]() to get info for user with ID={id}
PUT | Update | [/users/{id}]() to update ALL info for user with ID={id}
PATCH | Update | [/users/{id}]() to update PARTIAL info for user with ID={id}
DELETE | Delete | [/users/{id}]() to remove user with ID={id}
