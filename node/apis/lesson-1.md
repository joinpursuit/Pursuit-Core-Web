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

As you can see we keep talking about **data**. Data is very important to us, our users, and our employers.

When building online applications, it's important to remember that you're working on something that uses the amassed data from many users. It's the application's job to manage that data and portray it accurately to everyone.

### The Solution

This is where APIs come in. APIs allow for a set of recipes to be called upon when necessary by the right parties. For example, here's a basic structure for APIs used in a weather application:

- Your **mobile app** may call an API to get all the weather information for the week.
- Your **dashboard** may call an API to create new Cities to get weather for.
- Your **website** may call an API to get the forecast for a particular zip code.
- Your **weather balloon** may call an API to send back atmospheric pressure, temperature, & humidity.
- You might **sell your API** to third parties to gain access to your weather data.

As you can see, there is always a particular "party" sending a request to an API endpoint. Then there is a data "bank" where the appropriate data is gathered and sent in response.

## What is RESTful API?

There are many ways an API can be created- it just depends on how much data needs to be passed and how frequently. For example, we can use different technologies to structure the way our APIs handle requests and responses. We can use Sockets, TCP, and HTTP, for example. RESTful APIs are built on top of HTTP.

REST is acronym for Representational State Transfer.

### Guiding Principles of REST

1.  **Client / Server -** We differentiate the Client and Server. Server's job is to store and serve all data. Client's job is to portray and request that data.
2.  **Stateless -** Each request from client to server must contain all of the information necessary to understand the request, and cannot take advantage of any stored context on the server. Session state is therefore kept entirely on the client.
3.  **Cacheable –** The ability to cache that data on the client side. The server lets the client know that the data can be cached.
4.  **Uniform interface –** There's a pattern to how to retrieve data. There's a pattern on how the response is structured.
5.  **Layered system –** Being able to divide up the APIs based on a specific feature or model. Also, securing access to API based on the client accessing it.
6.  **Code on demand –** Allows for the overall logic to change on the fly for any feature. Client can stay the same, but APIs can return newer data.

## Designing a RESTful API

### Petpedia

We will be working on building the API of an application called "Petpedia". Petpedia allows people to register the pets they own. We should be able to do the following on Petpedia:

- Create human Users who have a registry with the following information:
  1.  id (must be unique)
  2.  Name
  3.  Email (must be unique)
  4.  Phone Number
- Create animal Pets who have a registry with the following information:
  1.  id (must be unique)
  2.  owner
  3.  type (what kind of animal? dog, cat, beaver?)
  4.  name
  5.  age
- Look up all the users in the registry
- Look up all the Pets in the registry
- Look up all the Pets a User owns
- Look up all the Pets based on their type (example, all the dogs only)

### Identify Object Model

The very first step in designing a REST API based application is identifying the objects which will be presented as resources. In this case we have two important Models:

1.  User Model
2.  Pet Model

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

## Structuring and Seeding RESTful Databases

In order to create the corresponding database for these endpoints, we have to create a file that will set up and create a database for our installation of Postgres. In order to do this, we'll create a file with the suffix `.sql`. This file will be set up so that we can run it and it will automatically create our database. If we run it and our database already exists, it will _nuke_ our database and revert it back to our initial configuration.

For this app, our seed file should look something like this:

```sql
DROP DATABASE IF EXISTS petpedia;
CREATE DATABASE petpedia;

\c petpedia;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  phonenumber INT NOT NULL
);

CREATE TABLE pets (
  id SERIAL PRIMARY KEY,
  owner INT REFERENCES users(id) NOT NULL,
  type VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  age INT
);
```

Let's take a look at this stuff. First, we `DROP (aka delete) DATABASE` on our `petpedia` database if it already exists. This just nukes it. Then, we `CREATE` our new version of `pedpedia` and utilize the command `\c` to check it out.

After we do that, it's a matter of creating our tables with the appropriate columns. To create our columns, we use the following format:

```
  <name of column> <data type of column> <any other constraints or associations>
```

So, for example, when we say `name VARCHAR NOT NULL`, what we're actually saying is: "I want to create a column called `name`. I'd like it to contain short strings, and I'd like there to always be something in this column when a new user is added." More on the different column data types available in Postgres can be found [here](http://www.postgresqltutorial.com/postgresql-data-types/).

As you can see, our Foreign Key relationships are maintained in the `owner` column when we create it using the keyword `REFERENCES`. When we build our database from the ground up with these relationships made clear, we're not only making the app easier to understand and access- we're making it faster to perform those look-ups behind the scenes.

Once we set up a file like this, all we have to do is type the following command in the terminal to seed our database:

```bash
cat seed.sql | psql
```

Where `seed.sql` is the name of your file storing the above commands.
