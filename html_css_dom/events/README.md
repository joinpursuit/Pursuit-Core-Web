# Events

Working with javascript events in the browser, and learning about asynchronous vs synchronous code.

## Goals

- Know what an event is in JS and how to create and respond to one
- Understand what it means to be asynchronous.
- Understand Event Bubbling and Event Delegation

## Keywords

- .addEventListener()
- DOMContentLoaded
- asynchronous
- submit
- .preventDefault()
- keyup, keydown, keypress
- mousemove, click

# Introduction

So far, we've written all of our code either:

- at the bottom of the `<body>`
- or by using `defer` in the script tag

to ensure that the DOM was loaded before we tried to access elements.

However, as our scripts start getting longer, it will be helpful to separate out that code into another file, and have some way of making sure that it only runs after the DOM is loaded.

Additionally, we've only handled interactions from the user in the form of clicking on a button. What if we wanted to respond to other actions, like entering text in a text field or moving the mouse?

We can use `events` to handle interactions in a clean and robust way.

Elements have a method `.addEventListener(eventName, callback)` that will allow us to respond to specific events by running whatever code we choose.

An event _listener_ is basically a _non-blocking_ infinite loop with a callback function, and when it "hears" an event,
it triggers the callback function. It sits and waits until it's called.

This leads us to the concept of _asychronicity_.

# Asynchronous Programming

The Javascript we have written so far has been executed from top to bottom. Meaning code lower down in the file waits for code higher up to complete before being executed. You can obviously change this using functions, but even then, the functions are synchronous - they run in the order you call them.

Many programming languages operate this way but this is not always useful.

For example, when you log into Facebook there is a lot of information being loaded to the page.
As the different information loads on the page, it gets displayed.
This might mean your buttons and side bar appear first but the timeline takes longer to load.
Imagine if you had to wait for _everything_ to be loaded before it was displayed on the page--this would not
be a good user experience because you could be staring at a blank screen waiting for it to load for a while!

**Asynchronous programming** solves this problem by starting a process and then moving on to the next
process and starting that, regardless of whether or not the first process has completed.
This is good because, like with our Facebook example, you can get multiple parts of the page loading without having to
wait for any one part to finish first.

Another way to think of asynchronous programming would be ordering at the deli.
You place your sandwich order with one employee, another starts making your sandwich,
and the next person in line can place their order. If I order a bacon egg and cheese on a toasted everything bagel (yum)
but the person after me orders a plain cream cheese roll (less yum), it is likely the person behind me in line will get their order _first_
because it takes much less time than my order. That's exactly what happens with asynchronous programming--functions are called
**in order** but do not need to wait for the previous function to finish to be executed.

For this reason, JavaScript -- a language designed for the web -- heavily relies on **asynchronous** processes.

When you execute something _synchronously_, you wait for it to finish before moving on to another task.

When you execute something _asynchronously_, you can move on to another task while it finishes.

Writing a while loop is a good example of _blocking code_. This type of code blocks all other code until it's complete.

# DOMContentLoaded

Let's add a plain old `<script>` tag to the header without adding a `defer` attribute. Also we will add an Event Listener to our JS file that waits until all our content has loaded.

_DOMContentLoaded_ is the event fired every time the HTML document has been completely loaded and parsed.
Much of our code will always be inside a callback to this function because we can't manipulate the DOM until
the _document_ object has been fully built.

## .addEventListener()

Every Element has the method `.addEventListener()` which waits for event triggers. When the event is fired, the element will execute the callback function.

The callback function automatically receives an argument that is typically given the parameter name _event_. This references the `event object`. The event object contains properties that are both general to all events and specific to the triggering event.

Let's try it out! First, we'll make an app that counts how many paragraphs there are.

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

`index.js`

```js
let p = document.querySelectorAll("p")
window.alert(`There are ${p.length} paragraphs`)
```

What do we see? How many paragraphs do you expect?

This happens because the javascript executes before the HTML is finished loading. To avoid this, we can either add `defer` to our script tag, or we can add an event listener to the entire document.

Now add an event listener to the `document`. Whenever it observes the `DOMContentLoaded` event, it will run the function that displays a window alert.

```js
document.addEventListener("DOMContentLoaded", () => {
  let p = document.querySelectorAll("p")
  window.alert(`There are ${p.length} paragraphs`)
})
```

### You do

Write some code that will display an alert containing the text of all of the paragraphs in the body.

<details>
<summary>Solution</summary>

```js
document.addEventListener("DOMContentLoaded", () => {
  let headings = document.querySelectorAll("p")
  let str = ""
  for (let heading of headings) {
    str += heading.innerText
    str += "\n"
  }
  window.alert(str)
})
```

</details>

# Click

The _click_ event is fired when an element is clicked. You can add a click event to any element, including the entire document!

Let's see this in action.

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
    <button id="favoriteButton">This is my favorite button</button>
  </body>
</html>
```

`index.js`

```js
document.addEventListener("DOMContentLoaded", () => {
  let favoriteButton = document.querySelector("#favoriteButton")
  favoriteButton.addEventListener("click", () => {
    window.alert("You clicked on my favorite button!")
  })
})
```

Callbacks are just functions. Just like with .map() and .forEach(), you can do as many things as you want inside of one.

You can also define a function somewhere else, and then call it from inside the event. This can be helpful as your projects start getting much bigger.

```js
document.addEventListener("DOMContentLoaded", () => {
  configureButtonClickEvent()
})

function configureButtonClickEvent() {
  let favoriteButton = document.querySelector("#favoriteButton")
  favoriteButton.addEventListener("click", showButtonAlert)
}

function showButtonAlert() {
  window.alert("You clicked on my favorite button!")
}
```

In the above example, even though we defined our functions below, they are **hoisted** up to the top, so they aren't undefined when we try to call them.

### You do

There are other events you can use instead of just `click`. [See a list of more events](https://developer.mozilla.org/en-US/docs/Web/Events)

Using the `mouseover` event, write some code that does the following:

- mousing over the `h1` makes an alert that says `"You moused over the heading!"`

<details>
<summary>Solution</summary>

```js
document.addEventListener("DOMContentLoaded", () => {
  configureButtonClickEvent()
  configureHeadingMouseoverEvent()
})

function configureHeadingMouseoverEvent() {
  let heading = document.querySelector("h1")
  heading.addEventListener("mouseover", showHeadingAlert)
}

function configureButtonClickEvent() {
  let favoriteButton = document.querySelector("#favoriteButton")
  favoriteButton.addEventListener("click", showButtonAlert)
}

function showHeadingAlert() {
  window.alert("You moused over the heading!")
}

function showButtonAlert() {
  window.alert("You clicked on my favorite button!")
}
```

</details>

# Submit

The _submit_ event is fired when a form is submitted. Here, let's try to log that the form was submitted using the `submit` event:

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
      <p>Enter your name:</p>
      <input type="text" />
      <button>Submit</button>
    </form>
  </body>
</html>
```

`index.js`

```js
document.addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector("form")
  form.addEventListener("submit", (event) => {
    console.log("You have submitted your form")
  })
})
```

When we type something into the input and click "Submit", we see a message flicker briefly on the console, then disappear. Additionally, the text we entered into the input goes away.

The reason for this is because 'submit' in forms has some built in actions to try and send your form somewhere. That's why the url also changes. This default behavior is almost never something we want. Instead, we prefer to have more control of what happens when our forms are submitted. For this reason we have **.preventDefault()**.

## .preventDefault()

`.preventDefault()` is a method available to every event object to prevent the event from doing any action it would normally do. It is often paired with a _submit_ event to prevent the form submission from reloading the page.

Inside of our previous form event listener, add the line `event.preventDefault()` above our `console.log`. Try submitting your form again and see if you get your console.log message. Don't forget to always invoke your preventDefault() call.

<details>
    <summary>
    preventDefault example
    </summary>

```js
document.addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector("form")
  form.addEventListener("submit", (event) => {
    event.preventDefault()
    console.log("You have submitted your form")
  })
})
```

</details>

## keypress, mousemove, change

Are all different types of events in JS. Look at all of the events [here](https://developer.mozilla.org/en-US/docs/Web/Events)!

### You do

Try experimenting with two of the following event types and see what they do. Some of these events only work on the document, some work on any element or the document.

- mousemove
- mouseup
- mouseout
- dblclick
- scroll
- keydown
- keyup

# 6. Bubbling

_Bubbling_ or _Event Delegation_ is the name for the way an event moves up the DOM, triggering
every _listener_ that is a parent of its _target_, all the way to the
top of the DOM. An event's `.target` property points to the element on which the event occurred.

So what does mean? Let's remember that our DOM is a tree of nodes. Think of this picture:

![dom](https://github.com/joinpursuit/Pursuit-Core-Web/blob/master/html_css_dom/events_2/assets/dom_tree_events.jpg?raw=true)

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
  let ul = document.getElementById("unordered-list")

  ul.addEventListener("click", (event) => {
    console.log("ul sees the click")
  })

  let ol = document.getElementById("ordered-list")

  ol.addEventListener("click", (event) => {
    console.log("ol sees the click")
  })

  let orderedFirst = document.getElementById("ordered-first")

  orderedFirst.addEventListener("click", (event) => {
    console.log("ordered first sees the click")
  })

  let body = document.querySelector("body")
  body.addEventListener("click", (event) => {
    console.log("body sees the click")
  })
})
```

Now that we've set up our listeners, let's reload our page (make sure the Chrome Developer Tools window is open). Click on each of the items and see how the messages are logged to the console.

## Event Target

The last thing we should know about is how to reference the element that we attached a listener to. Above, we learned this was called the `event target`. Simply console log `event.target` inside the `ul` eventListener above.

```js
ul.addEventListener("click", (event) => {
  console.log(event.target)
  console.log("ul sees the click")
})
```

Now click on each different element and see what gets logged!

The target is the actual element itself, so you can access any property that the element has - like `.textContent` or `.innerHTML` or anything you're used to using.

### You do

Write some code to change the `.textContent` of any clicked-on element to all uppercase characters.

<details>
    <summary>
    Solution
    </summary>

```js
ul.addEventListener("click", (event) => {
  event.target.textContent = event.target.textContent.toUpperCase()
})
```

</details>

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

## Resources

- [MDN - DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded)
- [MDN - EventTarget.addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [MDN - Event Reference](https://developer.mozilla.org/en-US/docs/Web/Events)
- [MDN - Event.preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
- [MDN - keypress](https://developer.mozilla.org/en-US/docs/Web/Events/keypress)
- [MDN - click](https://developer.mozilla.org/en-US/docs/Web/Events/click)
