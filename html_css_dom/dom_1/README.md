# Combining HTML and JavaScript + Introduction to the DOM

## Goals

- Know what the DOM is.
- Know the window and what alert and prompt do.
- Understand how to use a script tag.
- Know how to grab an html element with document.
- Be able to change the inside of an html element.

## Terms

- DOM, aka "Document Object Model"
- Window
- window.alert()
- window.prompt()
- Document
- document.getElementById()
- Element
- Element.innerText
- Input.value

## Resources

- [MDN​ ​-​ ​Introduction​ ​to​ ​the​ ​DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [MDN​ ​-​ ​Window](https://developer.mozilla.org/en-US/docs/Web/API/Window)
- [MDN​ ​-​ ​Document](https://developer.mozilla.org/en-US/docs/Web/API/Document)
- [MDN​ ​-​ ​Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)
- [MDN​ ​-​ ​Node](https://developer.mozilla.org/en-US/docs/Web/API/Node)

# 1. The Script Tag

Last lesson, we learned the basics of how to create a website. By using HTML tags, we can format text and choose how to lay it out on a page.

We also went through creating forms and input fields. But there's one thing missing from our forms: handling user interaction.

We can have users type into boxes and select checkboxes, but using pure HTML, we can't do anything with that information. In order for us to do something with the user's input, we'll need to combine HTML and JavaScript.

We can do this using the `<script>` tag:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Javascript + HTML</title>
    <script>
      console.log("Now we're using JavaScript!");
    </script>
  </head>
  <body>
    To see the secret JavaScript message, right click on this page, and click
    "Inspect". Then click on "Console".
  </body>
</html>
```

When the browser loads our website, it stops when it gets to the `<script>` tag, then executes any of the code that it sees there. After it's done, it reads the rest of the HTML and displays it on the screen. Putting the `script` tag in the `head` section, means it will run before any of the body is loaded.

Now we can run JavaScript in our websites! But we probably want to do something more than logging messages to the console...

# 2. The Window Object

`window` is the top level object in browser-side JavaScript that represents a browser window. It is an `object` in the full JavaScript sense: it has properties and values such as `.innerWidth`, `.innerHeight`, and `.localStorage`. Today we'll use two window methods:
`window.alert()` and `\ window.prompt()`.

## Window Alerts

`window.alert("I'm an alert message")` will display a message in a popup window, or alert. In general, it should only be used as a quick and dirty debugging tool, or before you've learned alternative ways to create output. You've probably only seen these as really annoying pop ups on sketchy websites. Let's write our first alert together.

Inside your test.html add a `script` tag inside your head tag. Inside of your `script` tag add an alert that welcomes the user to your test site.

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8" />
    <title>Javascript + HTML</title>
    <script>
      window.alert("Welcome to my website!");
    </script>
  </head>
  <body>
    This is my website.
  </body>
</html>
```

Now instead of logging a message to the console, we can display it to the user.

## Window Prompts

`window.prompt` allows us to display a popup message that also has a text input field inside it. `window.prompt()` will return the value in the input field (as a string) after the "OK" button is pressed.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Javascript + HTML</title>
    <script>
      const userSubmittedName = window.prompt("Enter your name");
      window.alert(`Hello ${userSubmittedName}!  Thank you for your response.`);
    </script>
  </head>
  <body>
    This is my website.
  </body>
</html>
```

Practice: Use `window.prompt()` to ask the user to "type a string". Then, use `window.alert()` to display a fully capitalized version of the string.

<details>
<summary>Hint</summary>
What is prompt's return value?     
</details>

<details>
<summary>Compare Your solution.</summary>

```js
const string = window.prompt("Please enter a string");
window.alert(string.toUpperCase());
```

</details>

---

Practice: Use `window.prompt()` to ask the user to "enter a number". Then, use
`window.alert()` to display that number times two.

If the input cannot be converted to a real number, use
`window.alert()` to display `"Please enter a number next time."`

<details>
<summary>Hint</summary>
`isNaN()` can be used to tell if something is not a number
</details>

<details>
<summary>Compare Your solution.</summary>

```js
const number = Number(window.prompt("Enter a number to be doubled!"));
let displayText = "";
if (isNaN(number)) {
  displayText = "Please enter a number next time";
} else {
  displayText = `Your doubled number is ${number * 2}`;
}
window.alert(displayText);
```

</details>

# 3. The DOM

## What is the DOM

A web page is a document. The Document Object Model (DOM) is a programming interface for HTML and XML documents. The document has a root element (node). Each proceeding element is a _child_ of that node.

![](./assets/dom_tree.jpg)

We use the DOM to find different _elements_ that we've created. An HTML element is anything that uses a tag. All of the tags we've learned so far are HTML elements.

Because the browser knows how HTML elements are ordered (like in the picture above), it can find elements that we've made, as well as delete or add new elements.

By using the DOM, we can present information to the user on the webpage directly instead of having to put up an alert.

## The Document Object

`document` is the object that represents the content of a page. It serves as the entry point into the content. Using `document` allows us to traverse the DOM and find, edit and delete elements.

### Getting Elements in the DOM

#### Attributes

An attribute is extra information that we give to a tag.
In the example above, the tag is `img` and it has 4 attributes, `src`, `alt`, `height`, and `width`.

```html
<img src="smiley.gif" alt="Smiley face" height="42" width="42" />
```

#### ID attribute

In order to find elements, we need to make sure that we have a way to identify them. All HTML elements can have an _attribute_ defined with their id (identifier).

```html
<p id="welcome-para">Welcome to my website</p>
```

Be careful to make sure that all ids you assign are unique. If you give two elements the same id, you might see some unexpected behavior.

#### getElementById

`document.getElementById([id])` takes a string `id` as an argument and returns an Element object matching the id. Let's take a simple website below:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Javascript + HTML</title>
  </head>
  <body>
    <h1>My Website</h1>
    <p id="welcome-para">Welcome to my website</p>
    <p id="last-para">Thank you for visiting</p>
  </body>
</html>
```

Now let's try to make an alert that displays the welcome paragraph in a popup box:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Javascript + HTML</title>
    <script>
      const welcomeElementPara = document.getElementById("welcome-para");
      window.alert(
        `The welcome paragraph element text is ${welcomeElementPara}`
      );
    </script>
  </head>
  <body>
    <h1>My Website</h1>
    <p id="welcome-para">Welcome to my website</p>
    <p id="last-para">Thank you for visiting</p>
  </body>
</html>
```

When we run this, we see that is says "The welcome paragraph element is null". This is because the browser hasn't created the body yet, so there is no element matching that id. We can fix that, by moving the script to the bottom of the body.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Javascript + HTML</title>
  </head>
  <body>
    <h1>My Website</h1>
    <p id="welcome-para">Welcome to my website</p>
    <p id="last-para">Thank you for visiting</p>
    <script>
      const welcomeElementPara = document.getElementById("welcome-para");
      window.alert(
        `The welcome paragraph element text is ${welcomeElementPara}`
      );
    </script>
  </body>
</html>
```

Now, when we open our website, it says "The welcome paragraph element is [object HTMLParagraphElement]". We've got the object that we want! Now we can look at its properties to find out more about it. Its `innerText` property will return its text. A full list of properties for elements can be found [here](https://www.w3schools.com/jsref/dom_obj_all.asp)

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Javascript + HTML</title>
  </head>
  <body>
    <h1>My Website</h1>
    <p id="welcome-para">Welcome to my website</p>
    <p id="last-para">Thank you for visiting</p>
    <script>
      const welcomeElementPara = document.getElementById("welcome-para");
      window.alert(
        `The welcome paragraph element text is ${welcomeElementPara.innerText}`
      );
    </script>
  </body>
</html>
```

### Setting Elements in the DOM

Now that we can access elements, we can also edit their text. Let's build a simple page that gets the user's name, then displays it to them on the actual webpage rather than an alert:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Javascript + HTML</title>
  </head>
  <body>
    <h1>My Website</h1>
    <p id="welcome-para">Welcome to my website</p>
    <p id="last-para">Thank you for visiting</p>
    <script>
      const userSubmittedName = window.prompt("Enter your name");
      const welcomeElementPara = document.getElementById("welcome_para");
      welcomeElementPara.innerText += `, ${userSubmittedName}`;
    </script>
  </body>
</html>
```

Having to use a prompt is bit messy. Let's use a button and an input text area instead. Buttons have an attribute `onclick` that we can link to a function. Inputs do NOT have an innerText that we can use. This is because they don't have a closing tag. Instead, we use their `.value` property.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Javascript + HTML</title>
  </head>
  <body>
    <h1 id="top-heading">My Website</h1>
    <p id="welcome-para">Welcome to my website</p>
    <p>
      Enter your name:
      <input type="text" id="name-input-text" placeholder="First Name" />
    </p>
    <button onclick="addNameToHeading()">Submit</button>
    <p id="last-para">Thank you for visiting</p>
    <script>
      const addNameToHeading = () => {
        const nameInputElement = document.getElementById("name-input-text");
        const userSubmittedName = nameInputElement.value;
        const topHeadingElement = document.getElementById("top-heading");
        topHeadingElement.innerText = `My Website: Made especially for ${userSubmittedName}`;
      };
    </script>
  </body>
</html>
```
