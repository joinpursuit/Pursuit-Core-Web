# Document Object Model

## Goals
* Know what the DOM is.
* Know the window and what alert and prompt do.
* Understand how to use a script tag.
* Know how to grab an html element with document.
* Be able to change the inside of an html element.

## Terms

- DOM, aka "Document Object Model"
- Window
- window.alert()
- window.prompt()
- Document
- document.getElementById()
- Element
- Element.innerText
- Element.innerHTML


## Lesson

### Context

A web page is a document. The Document Object Model (DOM) is a programming
interface for HTML and XML documents.
The DOM represents the document as nodes and objects. so that programs can change the document structure, style, and content.

If you're having a hard time imagining an HTML page as _nodes_ try to think of them in terms of this picture:

![](./assets/dom_tree.jpg)

The document has a root element (node). Each proceeding element is a _child_ of that node. We continue to build out a webpage in this way.

### Using JavaScript in an HTML Page

There are two primary ways to utilize JavaScript in an HTML page:

1. Enclose it in a `script` tag, like so:
`<script> //JS code goes in here </script>`

2. Link an external JavaScript file path with code like `<script src="./main.js"></script>`.

Typically, `script` tags are placed inside of the `head` tag of an HTML file. However, when a web browser that is parsing an HTML document meets a `script` tag, it will immediately run the JS. This can be a problem if your JS is referring to an HTML element that has not yet been parsed by the browser. There are a couple of different ways to get around this problem such as moving the script tag to the line before the closing `</body>` tag, adding an _event listener_ that waits for the whole file to load before starting the JS file, or adding the word _async_ to the `script` tag. These will be discussed in more detail later, but for now you should just be aware of this problem. If you'd like to read more about `script` placement please read this StackOverflow [answer](https://stackoverflow.com/questions/436411/where-should-i-put-script-tags-in-html-markup)

### The Window Object

`window` is the top level object in browser-side JavaScript. It represents a browser window and
contains the DOM document. It also has many of its own properties, such as `.innerWidth`, `.innerHeight`, and `.localStorage`. Today we'll use two window methods:
`window.alert()` and `\ window.prompt()`.

### `window.alert()`

`window.alert("I'm an alert message")` will display a message in a popup window, or alert. In general, it should only be used as a quick and dirty debugging tool, or before you've learned alternative ways to create output. You've probably only seen these as really annoying pop ups on sketchy websites. Let's write our first alert together.
Inside your test.html add a `script` tag inside your head tag. Inside of your `script` tag add an alert that welcomes the user to your test site.

``` html
<head>
    <title>My first web page</title>
    <link rel="stylesheet" href="test.css">
    <script type="text/javascript">
      window.alert('hello');
    </script>
</head>

```

### `window.prompt()`

`window.prompt("I'm a message asking for some input")` will display message in a popup window, along with a text input field. `window.prompt()` will return the value in the input field (as a string) when the form is submitted.

Let's give this a try.

1. First, remove the previous `script` tag that is currently holding your alert.

2. Create a file called `test.js `. This is the file that we will be writing our JavaScript in.

3. Create a new `script` tag. Add the path to test.js via the `src` attribute.
  <details>
    <summary>
        Hint if Needed:
    </summary>
        <script type="text/javascript" src="./test.js"></script>  

  </details>

4. Inside your test.js file add a `prompt` asking the welcoming the user and asking for their name.
  <details>
     <summary>
        Hint if Needed:
    </summary>

    window.prompt("Welcome, what's your name?")

  </details>



Challenge: Use `window.prompt()` to ask the user to "type a string". Then, use `window.alert()` to display a fully capitalized version of the string.

<details>
     <summary>
        Hint
    </summary>
      What is prompt's return value?     

  </details>

<details>
     <summary>
        Compare Your solution.
    </summary>

let string = window.prompt('Please enter a string');

window.alert(string.toUpperCase());

  </details>

---

 Challenge: Use `window.prompt()` to ask the user to "enter a number". Then, use
`window.alert()` to display that number times two.

 If the input cannot be converted to a real number, use
`window.alert()` to display `"Please enter a NUMBER next time."`

<details>

  <summary>
      Hint
  </summary>
  Remember, NaN !== NaN returns true.
</details>


<details>
     <summary>
        Compare Your solution.
    </summary>

let number = window.prompt('Enter a number to be doubled!');

number * 2 !== number * 2 ? window.alert('Please enter a NUMBER next time.') : window.alert(number * 2);

  </details>

### The Document Object

`document` is the object that represents the content of a page. It serves as the entry point into
the content. Everything begins with the document. (Except the window.)
Let's learn our first `document` method: `document.getElementById()`.

### `document.getElementById()`

`document.getElementById([id])` takes a string `id` as an argument and returns an Element object which can be selected by id. Another way of saying this is that
`document.getElementById([id])` fetches the same element as the `#id` CSS selector, but
returns it as a JavaScript object.
You should bind the return value to a variable.
Let's see this in action! Because we want our HTML to all be on the page before our JS file is read, please move your `script` tag to the line before the closing `</body>` tag. You HTML page should look something like:

```html
 <body>
  <!-- All your HTML -->
  <script type="text/javascript" src="./test.js" ></script>
</body>

```

Now let's make our test.js file say:
```js
  let first = document.getElementById('first');
   debugger
```

Debugger is an extremely powerful tool that we will use **A LOT** throughout this course. Start using it now so you can get comfortable with it. In order for debugger to work it must be placed on it's own line anywhere inside your JS, and you must have your browsers console open. The code will _stop_ at the debugger and allow you further investigate your code at that exact point in time.

Refresh your _test_ page with the console open.

Inside the console you can take a look at your declared variable `first`. If you'd like to see the available methods that you can call on `first`, type in a `.` directly after first. The console will show you the auto complete options. Try out `first.innerText`.


### The Element Object

An Element object is… an element! An HTML element (usually). We use this object to access
important properties of an element, such as `.innerHTML`, `.innerText` (inherited from the
Node object) and `.classList`.
Today we are only concerned with `.innerHTML` and `.innerText`.

### Element.innerHTML and Element.innerText

`.innerText`​ ​gets​ ​and​ ​sets​ ​the​ ​text​ ​of​ ​an​ ​HTML​ ​Element.​ ​It​ ​is​ ​used​ ​via​ ​JavaScript's​ ​standard
object​ ​dot​ ​notation.​

Refresh your page. After you get caught on the debugger, instead of pressing enter after typing in `first.innerText` type `first.innerText = 'Look I've Changed'`. You will see the HTML on the page change


`.innerHTML​`​ ​works​ ​the​ ​same​ ​way​ ​as​ ​`.innerText​`,​ ​but​ ​gets​ ​and​ ​sets​ ​HTML​ ​instead​ ​of​ ​text.
This​ ​is sometimes a useful​ ​shortcut​ ​to​ ​building​ ​nested​ ​elements. When setting an HTML element, the HTML element must be written as a sting. Like:
`first.innerHTML = "<h1> Now my li holds an h1 tag </h1>"`

Try it yourself and you can see the change. If you want do double confirm the changes click on the consoles 'Elements' tab and then the little arrow on the same line. You can then use your mouse to highlight and inspect the different HTML elements on the page. Click the arrow icon again to toggle it off.



When you're done playing around and finished with the debugger, click on the blue play arrow on the screen. The code will continue to run either until it finishes parsing everything or until it hits another debugger.

Now remove your debugger so that it doesn't continue to stop each time we load the page.


## Resources

- [MDN​ ​-​ ​Introduction​ ​to​ ​the​ ​DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [MDN​ ​-​ ​Window](https://developer.mozilla.org/en-US/docs/Web/API/Window)
- [MDN​ ​-​ ​Document](https://developer.mozilla.org/en-US/docs/Web/API/Document)
- [MDN​ ​-​ ​Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)
- [MDN​ ​-​ ​Node](https://developer.mozilla.org/en-US/docs/Web/API/Node)
