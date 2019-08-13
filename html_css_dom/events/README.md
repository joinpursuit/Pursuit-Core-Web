# Events

## Goals
  * Know what an event is in JS and how to create and respond to one
  * Understand what it means to be asynchronous.
  * Understand Event Bubbling and Event Delegation

## Keywords

* .addEventListener()
* DOMContentLoaded
* asynchronous
* submit
* .preventDefault()
* keyup, keydown, keypress
* mousemove, click


# 1. Introduction

So far, we've written all of our code at the bottom of the `<body>` to ensure that the DOM was loaded before we tried to access elements.

However, as our scripts start getting longer, it would be helpful to separate out that code into another file, and have some way of making sure that it only ran after the DOM was loaded.  

Additionally, we've only handled interactions from the user in the form of clicking on a button.  What if we wanted to respond to other actions, like entering text in a text field or moving the mouse?

We can use `events` to handle interactions in a clean and robust way.

Elements have a method `.addEventListener(event, callback)` that will allow us to respond to specific events by running whatever code we choose.

An event *listener* is basically a _non-blocking_ infinite loop with a callback function, and when it "hears" an event,
it triggers the callback function. It sits and waits until it's called.

This leads us to the concept of _asychronosity_.

# 2. Asynchronous Programming

We traditionally think of code as being executed from top to bottom such that lower code waits
for code higher up to complete before being executed.

Many programming languages operate this way but this is not always useful.
For example, when you log into Facebook there is a lot of information being loaded to the page.
As the different information loads on the page, it gets displayed.
This might mean your buttons and side bar appear but the timeline takes longer to load.
Imagine if you had to wait for _everything_ to be loaded before it was displayed on the page--this would not
be a good user experience because you could be staring at a blank screen waiting for it to load for a while!

**Asynchronous programming** solves this problem by starting a process and then moving on to the next
process and starting that, regardless of whether or not the first process has completed.
This is good because, like with our Facebook example, you can get multiple parts of the page loading without having to
wait for any one part to finish first. Another way to think of asynchronous programming would be ordering at the deli.
You place your sandwich order with one employee, another starts making your sandwich,
and the next person in line can place their order. If I order a bacon egg and cheese on a toasted everything bagel (yum)
but the person after me orders a plain roll (less yum), it is likely the person behind me in line will get their order _first_
because it takes much less time than my order. That's exactly what happens with asynchronous programming--functions are called
**in order** but do not need to wait for the previous function to finish to be executed.

For this reason, JavaScript -- a language designed for the web -- heavily relies on **asynchronous** processes.
From StackOverflow: "When you execute something *synchronously*, you wait for it to finish before moving on to another task.
When you execute something *asynchronously*, you can move on to another task before it finishes." When we used window.prompt() or alert()
we were required to wait for our user to interact before the rest of our code could run. This type of code that blocks all other
code until complete is called _blocking code_.


# 3. DOMContentLoaded

If you recall from our previous lessons, we included our `script` tag before the closing `</body>` tag but mentioned that it's
generally placed inside the `<head>`. We had put it before the closing `</body>` because we were referring to elements that had not yet been parsed by the browser. Now we can move our `<script>` tag back to the header, and add an Event Listener to our JS file that waits until all our content has loaded.

*DOMContentLoaded* is the event fired every time the HTML document has been completely loaded and parsed.
Much of our code will always be inside a callback to this function because we can't manipulate the DOM until
the *document* object has been fully built.

### **.addEventListener(event, callback)**

Every Element has the method `.addEventListener()` to hear event triggers. When the event is fired, the element will execute the callback function.

The callback function automatically receives an argument that is typically given the parameter name *event*. This references the event object. The event objects contains many properties that are both general to all events and specific to the triggering event.

Let's try it out! First, we'll make an app that makes an alert when the DOM content has been loaded:

`index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <script src="index.js"></script>
    <title>Document</title>
</head>
<body>
    <h1>Welcome to my website.</h1>
    <p>The JavaScript runs in its own file!</p>
</body>
</html>
```

`index.js`
```js
document.addEventListener('DOMContentLoaded', () => {
    window.alert("The DOM has been loaded!")
})
```

In our `index.js`, we add an event listener to the `document`.  Whenever it observes the `DOMContentLoaded` event, it will run the function that displays a window alert.

Let's try another example:

`index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <script src="index.js"></script>
    <title>Document</title>
</head>
<body>
    <h1>Welcome to my website.</h1>
    <p>The JavaScript runs in its own file!</p>
    <p>This is more text</p>
    <p>And this is yet even more text</p>
</body>
</html>
```

Write code that will display an alert containing the text of all of the paragraphs in the html above:

<details>
<summary>Solution</summary>

```
document.addEventListener('DOMContentLoaded', () => {  
    let headings = document.querySelectorAll('p')
    let str = ""        
    for (let heading of headings) {
      str += heading.innerText
      str += "\n"
    }
    window.alert(str)
})
```
 </details>


# 4. click

The *click* event is fired when an element is clicked. Let's see this in action.


`index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <script src="index.js"></script>
    <title>Document</title>
</head>
<body>
    <h1>Welcome to my website.</h1>
    <button id='favoriteButton'>This is my favorite button</button>
</body>
</html>
```

`index.js`
```js
document.addEventListener('DOMContentLoaded', () => {
    let favoriteButton = document.querySelector("#favoriteButton")
    favoriteButton.addEventListener('click', () => {
        window.alert("You clicked on my favorite button!")
    })
})
```

Remember that callbacks are just functions.  We can have that code live somewhere else if we want to make it more clear.  This can be helpful as your projects start getting much bigger.  Even though we defined our functions below, they are **hoisted** up to the top, so they aren't undefined when we try to call them.

```js
document.addEventListener('DOMContentLoaded', () => {
    configureButtonClickEvent()
})

function configureButtonClickEvent() {
    let favoriteButton = document.querySelector("#favoriteButton")
    favoriteButton.addEventListener('click', showButtonAlert)
}

function showButtonAlert() {
    window.alert("You clicked on my favorite button!")
}
```

Try adding code that makes it so that mousing over the heading shows an alert using the `mouseover` event.

<details>
<summary>Solution</summary>

```js
document.addEventListener('DOMContentLoaded', () => {
    configureButtonClickEvent()
    configureHeadingMouseoverEvent()
})

function configureHeadingMouseoverEvent() {
    let heading = document.querySelector("h1")
    heading.addEventListener('mouseover', showHeadingAlert)
}

function configureButtonClickEvent() {
    let favoriteButton = document.querySelector("#favoriteButton")
    favoriteButton.addEventListener('click', showButtonAlert)
}

function showHeadingAlert() {
    window.alert("You moused over the heading!")
}

function showButtonAlert() {
    window.alert("You clicked on my favorite button!")
}
```

</details>

# 5. **submit**

The *submit* event is fired when a form is submitted.  Here, let's try to log that the form was submitted using the `submit` event:

`index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <script src="index.js"></script>
    <title>Document</title>
</head>
<body>
    <h1>Welcome to my website.</h1>
    <form>
        <p>This is my form</p>
        <p>Enter your name: </p><input type="text">
        <button>Submit</button>
    </form>
</body>
</html>
```

`index.js`
```js
document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('form')   
    form.addEventListener('submit', (event) => {
        console.log("You have submitted your form")      
    })
})
```

When we type something into the input and click "Submit", we see a message flicker briefly on the console, then disappear.  Additionally, the text we entered into the input goes away.

The reason for this is because 'submit' in forms has some built in actions to try and send your form somewhere. That's why the url also changes. This default behavior is almost never something we want. Instead, we developers prefer to have more control of what happens when our forms are submitted. For this reason we have **.preventDefault()**.


### **.preventDefault()**

`.preventDefault()` is a method available to every event object to prevent the event from doing any action it would normally do. It is often paired with a *submit* event to prevent the form submission from reloading the page.

Inside of our previous form event listener, add the line `event.preventDefault()` above our `console.log`. Try submitting your form again and see if you get your console.log message. Don't forget to always invoke your preventDefault() call.

### keypress, mousemove, change

Are all different types of events in JS. Look at all of the [here](https://www.w3schools.com/jsref/dom_obj_event.asp)!

# 6. Bubbling

_Bubbling_ or _Event Delegation_ is the name for the way an event moves up the DOM, triggering
every _listener_ that is a parent of its _target_, all the way to the
top of the DOM. An event's `.target` property points to the element on which the event occurred.

So what does mean? Let's remember that our DOM is a tree of nodes. Think of this picture:

![dom](https://github.com/joinpursuit/Pursuit-Core-Web/blob/master/html_css_dom/events_2/assets/dom_tree_events.jpg)

When an event gets fired it bubbles up the DOM - or, is delegated to the Node's parents. Events occur whether or not we are specifically listening for them. This means that if we click on one of the `li`s in the picture, the click would be _experienced_ by the `li`, then the `ul`, then the `body`, and finally the `html` node. It's bubbling up.

This can be helpful with our page's performance. Let's pretend we have a `ul` with thousands and thousands of li's. If we put a listener on every `li`, we would have a TON of listeners. This could dramatically slow down our program. Instead of doing that, we could use just one listener on the `ul`. Because of event delegation, whenever any `li`s are clicked, our `ul` would know and be able to fire the specific event.

If we click on the `p` tag who experiences that event?

<details>
  <summary>
    Solution
  </summary>
  The `p` tag, then the `body`, and finally the `html`.
</details>

Let's see event delegation in action!

`index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <script src="index.js"></script>
    <title>Document</title>
</head>
<body>
    <h1>Welcome to my website.</h1>
    <ul id="unordered-list">
        <li id="first">First item!</li>
        <li id="second">Second item!</li>
        <ol id="ordered-list">
            <li id="ordered-first">This is ordered</li>
            <li id="ordered-second">So is this!</li>
        </ol>
        <li id="third">Third item!</li>
    </ul>        
</body>
</html>
```

In your `test.js` file, add a click listener to the 'ordered-first' element, the 'ordered-list', the 'unordered-list', and the `body`. Put a `console.log()` inside each of your listeners. Your code should look something like this:

`index.js`
```js
document.addEventListener("DOMContentLoaded", () => {
  let ul = document.getElementById("unordered-list");

  ul.addEventListener("click", event => {
    console.log("ul sees the click")
  });

  let ol = document.getElementById("ordered-list");

  ol.addEventListener("click", event => {
    console.log("ol sees the click")
  });

  let orderedFirst = document.getElementById("ordered-first");

  orderedFirst.addEventListener("click", event => {
    console.log("ordered first sees the click")
  });

  let body = document.querySelector("body");
  body.addEventListener("click", event => {
    console.log("body sees the click")    
  });
});
```

Now that we've set up our listeners, let's reload our page (make sure the Chrome Developer Tools window is open). Click on each of the items and see how the messages are logged to the console.


# Bonus: Mouse Coordinate Tracker

Add a div with the id="coords". Using `document.addEventListener('mousemove', …)`, update the text of the div with the x and y coordinates of the mouse cursor.

You will need to nest your code in a callback to a `DOMContentLoaded` event listener.


  <details>
  <summary>
   Solution
 </summary>

 ```
document.addEventListener('DOMContentLoaded', () => {

  let coords = document.getElementById('coords');

  document.addEventListener('mousemove', (e) => {
    coords.innerHTML = `x: ${e.clientX}, y: ${e.clientY}`;
  });

});
  ```
 </details>




##  Resources

* [MDN - DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded)
* [MDN - EventTarget.addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
* [MDN - Event Reference](https://developer.mozilla.org/en-US/docs/Web/Events)
* [MDN - Event.preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
* [MDN - keypress](https://developer.mozilla.org/en-US/docs/Web/Events/keypress)
* [MDN - click](https://developer.mozilla.org/en-US/docs/Web/Events/click)
