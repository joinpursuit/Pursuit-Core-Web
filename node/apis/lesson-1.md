# Building APIs: Intro

# Topics
- What is an API?
- RESTful APIs
- Designing APIs


# Lesson

## What is an API?

API stands for Application Programming Interface.

Now what does that actually mean? People throw around that term very casually, but don't actually understand the true concept of what an API is.

### The Problem

When you are building something (a product and/or service), there are often times many challenging problems to solve:

- How will my user communicate with my data?
- How will my client / other products communicate with my data?
- Should everyone have access to my data?
- Am I allowing others to interact with my data?

As you can see we keep talking about DATA. Infact data is very important to us, our users and the overall organization building the product. 

When building online applications, it's important to understand that you're something that uses the amassed data from various users. It's the applications job to manage that data and portray it accurately to all the different parties associated.

### The Solution

This is where APIs come in. APIs allow for a set of recipes to be called upon when necessary by the right parties. For example: 

- Your Mobile App may call an API to get all the weather information for the week.
- Your Dashboard may call an API to create new Cities to get weather for. 
- Your Website may call an API to get the forecast for a particular zip code. 
- Your Weather Balloon may call an API to send back atmospheric pressure, temperature, & humidity.
- You might sell your API to 3rd Parties to gain access to your weather data.

So as you can see, there is always a particular "party" sending a request to an API endpoint. Then there is a data "bank" where the appropriate data is gather and responded with.

## What is Restful API?

There are many ways an API can be created. It just matters on how much data needs to be passed and how frequently. For example, we can use different technologies to create APIs. We can use Sockets, TCP, HTTP. Restful APIs are built on top of HTTP.

REST is acronym for REpresentational State Transfer.

### Guiding Principles of REST
1. **Client / Server -** We differentiate the Client and Server. Server's job is to store and serve all data. Client's job is to portray and request that data. 
2. **Stateless -** Each request from client to server must contain all of the information necessary to understand the request, and cannot take advantage of any stored context on the server. Session state is therefore kept entirely on the client.
3. **Cacheable –** The ability to cache that data on the client side. The server lets the client know that the data can be cached.
4. **Uniform interface –** There's a pattern to how to retrieve data. There's a pattern on how the response is structured.
5. **Layered system –** Being able to divide up the APIs based on a specific feature or model. Also securing access to API based on the client accessing it.
6. **Code on demand –** Allows for the overall logic to change on the fly for any feature. Client can stay the same, but APIs can return newer data.

## Designing a RESTful API

### Petpedia

We will be working on building the API of an application called "Petpedia". Petpedia allows people to register the pets they own. We should be able to do the following on Petpedia:

- Create human Users who have a registry with the following information:
  1. id (must be unique)
  2. Name
  3. Email (must be unique)
  4. Phone Number
- Create animal Pets who have a registry with the following information:
  1. id (must be unique)
  2. owner 
  3. type (what kind of animal? dog, cat, beaver?)
  4. name
  5. age
- Look up all the users in the registry
- Look up all the Pets in the registry
- Look up all the Pets a User owns
- Look up all the Pets based on their type (example, all the dogs only)

### Identify Object Model

The very first step in designing a REST API based application is identifying the objects which will be presented as resources. In this case we have two important Models:

1. User Model
2. Pet Model

Note that both objects/resources in our above model will have a unique identifier, which is the `integer id` property. An unique identifier is very important to look up specific models. 

### Create Model Endpoints
Now when object model is ready, it’s time to decide the endpoints. At this step, while designing the endpoints focus on the relationship between resources and its sub-resources.

```
// User Endpoints
/user/all
/user/{id}
/user/{id}/pets

// Pets Endpoints
/pet/all
/pet/{id}
/pet/{type}
```

### Determine Representation

When returning a collection resource, include only most important information about resource. This will keep the size of payload small, and so will improve the performance of REST APIs.

#### User Model Responses

Single model response:

```javascript 
{
  id: 1,
  name: "John Smith",
  email: "john.smith@email.com",
  phonenumber: 1231231234
}
```

Multiple model resonse:

```javascript
[
  {USER_1},
  {USER_2},
  ...
]
```

#### Pet Model Responses

Single model response:

```javascript 
{
  id: 1,
  owner: 1,
  type: "dog",
  name: "Rexy",
  age: 2
}
```

Multiple model resonse:

```javascript
[
  {PET_1},
  {PET_2},
  ...
]
```

### Assign HTTP Methods

So our resource endpoints and their representation are fixed now. Let’s decide the possible operations in application and map these operations on resource endpoints. A user of Petpedia can perform browse, create, update or delete operations. So let’s map them.

#### CREATING MODELS

```
POST /user
POST /pet
```

#### BROWSING 

```
// User Endpoints
GET /user/all
GET /user/{id}
GET /user/{id}/pets

// Pets Endpoints
GET /pet/all
GET /pet/{id}
GET /pet/{type}
```

#### UPDATING

```
PUT /user/{id}
PUT /pet/{id}
```

#### DELETING

```
DELETE /user/{id}
DELETE /pet/{id}
```
