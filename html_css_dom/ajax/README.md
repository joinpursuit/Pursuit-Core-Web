# AJAX

## Goals
* Understand what AJAX is and how it is implemented
* Use XML to make requests

## Keywords
* Asynchronous JavaScript and XML (AJAX)
* Extensible Markup Language (XML)
* JavaScript Object Notation (JSON)

# 1. Getting Data from the Internet



# 2. AJAX: A(synchronous) J(avaScript and) X(ML)

AJAX is extremely helpful because it allows you to:

* Update a web page without reloading the page.
* Request data from a server - after the page has loaded.
* Receive data from a server - after the page has loaded.
* Send data to a server - in the background.


AJAX allows web pages to be updated asynchronously by exchanging data with a web server behind the scenes. This means that it is possible to update parts of a web page, without reloading the whole page. When AJAX came to the modern web, it changed the definition of how the web works.

A very, very common use of the AJAX technique is to interact with RESTful APIs through a web app.


# 3. Using XMLHttpRequest to get data

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
