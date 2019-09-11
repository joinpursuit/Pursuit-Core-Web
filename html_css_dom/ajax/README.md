# AJAX

## Goals
* Understand what AJAX is and how it is implemented
* Use XML to make requests

## Keywords
* Asynchronous JavaScript and XML (AJAX)
* Extensible Markup Language (XML)
* JavaScript Object Notation (JSON)

# 1. Getting Data from the Internet

So far, all of the data that we've used has been provided to us.  Over the last couple days, we've seen how companies create resources (endpoints) so that other people can access their information.  Today, we'll build a simple web app that accesses data from the internet instead of essentially working offline.  Our app will load a list of random users from the [Random User Generator API](https://randomuser.me/documentation).

# 2. AJAX: A(synchronous) J(avaScript and) X(ML)

How can we get data from the internet?  We want to make sure that we are getting data *asynchronously*.  This is so that our whole website doesn't freeze while we're waiting for data to come back.  The tool that we'll use to get data is called `AJAX` which stands for A(synchronous) J(avaScript and) X(ML).  Why is it called `XML`?  It's essentially a misnomer at this point, but back when it was first created, it was used primarily for XML instead of JSON.  You can find more information [here](https://stackoverflow.com/questions/12067185/why-is-it-called-xmlhttprequest).

AJAX is extremely helpful because it allows you to:

* Update a web page without reloading the page.
* Request data from a server - after the page has loaded.
* Receive data from a server - after the page has loaded.
* Send data to a server - in the background.

A very common use of the AJAX technique is to interact with RESTful APIs through a web app.  To actually make a call to get data, we will use the class `XMLHttpRequest`.


# 3. Using XMLHttpRequest to get data

Let's start by putting together a simple HTML file that can display a list of users:

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Random Users</title>
    <script src="index.js"></script>
</head>
<body>
    <h1>Random Users</h1>
    <ul id="userList"></ul>
    <button id="loadUsersButton">Load 10 random users</button>
    <button id="removeAllRandomUsers">Remove all random users</button>
</body>
</html>
```

Now let's hook it up to a JavaScript file that will handle the load button being clicked:

```js
document.addEventListener("DOMContentLoaded", () => {
    let button = document.querySelector('#loadUsersButton')
    button.addEventListener('click', loadUsers)
})

function loadUsers() {
    console.log("Loading Users...")
}
```

Check your console to make sure that you are listening to button click events.  Now, let's add functionality to get 10 random users from our API at https://randomuser.me/api/?results=10:

```js
document.addEventListener("DOMContentLoaded", () => {
    let button = document.querySelector('#loadUsersButton')
    button.addEventListener('click', loadUsers)
})

function loadUsers() {
    let xml = new XMLHttpRequest()
    xml.onreadystatechange = function() {
        console.log(this.readyState)
        if (this.readyState === this.DONE) {
            console.log(JSON.parse(this.response))
        }
    }
    xml.open("GET", "https://randomuser.me/api/?results=10")
    xml.send(null)
}
```

Let's break down what we have above:

First, we create a new `XMLHttpRequest`.  This class has 3 important properties / methods that we are using:

1. `onreadystatechange`
2. `open``
3. `send`

### onreadystatechange

`onreadystatechange` is a method that gets called several times in the process of getting data back.  Each time something interesting happens to the state of our request, this method is called and the `readyState` of the request updates with its current progress.  The list of `readyState`s is below:

```
0	UNSENT	Client has been created. open() not called yet.
1	OPENED	open() has been called.
2	HEADERS_RECEIVED	send() has been called, and headers and status are available.
3	LOADING	Downloading; responseText holds partial data.
4	DONE	The operation is complete.
```

### open

Once we've made our request, we need to open a connection to our endpoint using the `open` method.  We also list the type of request that we want to make; here it's a `GET` request.

### send

After we open a connection to our endpoint, we have to send it any information that it needs.  For `POST` requests, we would send the data that we want to be posted.  Here, we don't need to give any additional information, so we send `null` instead.

### JSON.parse(this.response)

Every `XMLHttpRequest` has a `response` property that contains the data that we get back from the endpoint.  However, it's not necessarily in JSON form (more reading [here](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/response)).  To ensure we can use it like every other object we've made so far, we use the `JSON.parse()` class method.

Now we can see all of the users!  Go in the console and look at the structure of the JSON you get back.  It should look something like this:


```js

```

```js
document.addEventListener("DOMContentLoaded", () => {
    let button = document.querySelector('#loadUsersButton')
    button.addEventListener('click', loadUsers)
})

function loadUsers() {
    let xml = new XMLHttpRequest()
    xml.onreadystatechange = function() {
        console.log(this.readyState)
        if (this.readyState === this.DONE) {
            let usersJSON = JSON.parse(this.response)            
            let randomUsers = usersJSON.results
            addUsersToDOM(randomUsers)
        }
    }
    xml.open("GET", "https://randomuser.me/api/?results=10")
    xml.send(null)
}

function addUsersToDOM(users) {
    let userList = document.querySelector("#userList")
    for (user of users) {
        let newListItem = document.createElement("li")
        console.log(user)
        newListItem.innerText = `${user.name.title} ${user.name.first} ${user.name.last}`
        userList.append(newListItem)
    }
}
```


So how do we use this magical AJAX? Nowadays there's lots of ways. You may have already heard about JQuery's $.ajax, or the fetch api, or axios. These are all great ways to handle Ajax requests and each have their positives and negatives. Today though, we're going to touch upon the original way to make AJAX requests. Don't worry if it doesn't all make perfect sense, it's definitely confusing the first time you see it.

Browsers provide the [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)  object to make AJAX calls. The documentation is very helpful for this.

1. Create XMLHttpRequest an object and assign it to a variable
2. Give that object an event listener
3. Use the object's `.open()` method to specify a URL path
4. Use the object's `.send()` method to send the request

The _response_ object will be passed as the event object in your callback function.

Try running this block of code in your test.js file.

```js

let xml = new XMLHttpRequest();
xml.onreadystatechange =  function () {
  if(this.readyState === this.DONE){
    console.log(JSON.parse(this.response));
  }
}
xml.open("GET", "https://ghibliapi.herokuapp.com/films");
xml.send(null);


```
Throw in some debuggers so that you can see what everything is.

# 4. Displaying Data from Online


Let's try to use it in a more practical sense.

1. In your test.html add a new ul under your click me button with an id of "movies".
2. In your test.js file grab your button element and add an event listener for click.
3. In your button event create a new XMLHttpRequest object called xml and add the event listener "load", have the fired function be showMovies.
4. Send a "GET" request to https://ghibliapi.herokuapp.com/films inside your xml.open call.
5. Include xml.send(null).

<details>
  <summary>
    How your code should look so far:
  </summary>

  ```js

  let button = document.getElementById('button');

  button.addEventListener('click', () => {
  let xml = new XMLHttpRequest();
  xml.addEventListener("load", showMovies);
  xml.open("GET", "https://ghibliapi.herokuapp.com/films");
  xml.send(null)
  });
 ```

</details>


6. Now write your showMovies function. It should grab your movies html ul. Iterate through your array after you've called JSON.parse(this.response). Inside each iteration create a new li element called newMovie. Change it's innerText to movie.title. Finally append the newMovie to our movies ul.


<details>
  <summary>
    Solution:
  </summary>

  ```js

function showMovies() {
    let movies = document.getElementById("movies")
    JSON.parse(this.response).forEach( movie => {
      let newMovie = document.createElement('li');
      newMovie.innerText = movie.title;
      movies.append(newMovie)

    })
  }
 ```

</details>


Remember, when we're iterating through an array filled with objects, we can key into those objects with each iteration.

Notice that the page does not reload with each request. This is EXCITING!


## Resources

* [AJAX - MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started)
* [AJAX - W3Schools](https://www.w3schools.com/xml/ajax_intro.asp)
