# Events 2

## Goals

- Understand Event Bubbling and Event Delegation
- Know the difference between event.target and event.currentTarget
- Understand and know how to create and Element.
- Know how to append an element and how to remove one.
- Be able to change the class on an element.

## Keywords

- bubbling
- delegation
- event.stopPropagation()
- event.target
- event.currentTarget
- document.createElement()
- Node.appendChild()
- ChildNode.remove()

### **Context**

_Bubbling_ or _Event Delegation_ is the name for the way an event moves up the DOM, triggering
every _listener_ that is a parent of its _target_, all the way to the
top of the DOM. An event's `.target` property points to the element on which the event occurred.

So what does mean? Let's remember that our DOM is a tree of nodes. Think of this picture:

![dom](./assets/dom_tree_events.jpg)

When an event gets fired it bubbles up the DOM - or, is delegated to the Node's parents. Events occur whether or not we are specifically listening for them. This means that if we click on one of the `li`s in the picture, the click would be _experienced_ by the `li`, then the `ul`, then the `body`, and finally the `html` node. It's bubbling up.

This can be helpful with our page's performance. Let's pretend we have a `ul` with thousands and thousands of li's. If we put a listener on every `li`, we would have a TON of listeners. This could dramatically slow down our program. Instead of doing that, we could use just one listener on the `ul`. Because of event delegation, whenever any `li`s are clicked, our `ul` would know and be able to fire the specific event.

If we click on the `p` tag who experiences that event?

<details>
  <summary>
    Solution
  </summary>
  The `p` tag, then the `body`, and finally the `html`.
</details>

Let's see event delegation in action! Inside your test.html file add the `id` "unordered-list" to your `ul`. Add the `id` "ordered-list" to your `ol`, and add the `id`s "ordered-first" and "ordered-second" to the `ol`'s children. It should look something like:

```html
  <ul id="unordered-list">
    <li id="first">First item!</li>
    <li id="second">Second item!</li>
    <ol id="ordered-list">
      <li id="ordered-first">This is ordered</li>
      <li id="ordered-second">So is this!</li>
    </ol>
    <li id="third">Third item!</li>
  </ul>
```

In your `test.js` file, add a click listener to the 'ordered-first' element, the 'ordered-list', the 'unordered-list', and the `body`. Put a `debugger` inside each of your listeners. Your code should look something like this:

```js
document.addEventListener("DOMContentLoaded", () => {
  let ul = document.getElementById("unordered-list");

  ul.addEventListener("click", event => {
    debugger;
  });

  let ol = document.getElementById("ordered-list");

  ol.addEventListener("click", event => {
    debugger;
  });

  let orderedFirst = document.getElementById("ordered-first");

  orderedFirst.addEventListener("click", event => {
    debugger;
  });

  let body = document.querySelector("body");
  body.addEventListener("click", event => {
    debugger;
  });
});
```

Now that we've set up our listeners, let's reload our page (make sure the Chrome Developer Tools window is open). Click on the first item in our ordered list. What happened? We've hit a `debugger`. In the console take a look at `event.target`, and `event.currentTarget`.

Now, in `debugger`, hit continue. Again, check your `event.target` and your `event.currentTarget`. Do you see what's happening? Hit continue and check again. One more time. This is how an event bubbles up and how we can find where the event occurred and where it is now.

When you're done exploring the events, remove the `debugger`s from your code.

### **document.createElement()**

To build a _new_ HTML page element, use the `document.createElement(tag)`
method. This creates a new _HTMLElement_ of type `tag`. This is identical
to the type of element object returned by `.getElementById()` or
`.querySelector()`, and you may modify this element by the same properties
and methods.

You may add this element into the DOM with `Node.appendChild()`.

### **Node.appendChild()**

The `.appendChild(node)` method of the _Node_ object (and so inherited by
_Element_) will add a new element into the DOM as a child of the calling
element. This is best demonstrated by example.

1.  In your `test.js` file, create a variable called `ul` and assign its value to the node 'unordered-list'.

<details>
  <summary>
    Solution
  </summary>
  let ul = document.getElementById('unordered-list');
</details>

2.  Create a new element called `newLi`.

<details>
  <summary>
    Solution
  </summary>
  let newLi = document.createElement('li');
</details>

3.  Using the `innerText` property give your `newLi` some text.

<details>
  <summary>
    Solution
  </summary>
  newLi.innerText = 'NEW LI';
</details>

4.  Finally use `append` to add your `newLi` into your `ul`.

<details>
  <summary>
    Solution
  </summary>
  ul.append(newLi);
</details>

### **ChildNode.remove()**

You may call the `.remove()` method on any Node to remove it from the DOM. Note that this will also remove all of a node's children.

In your `test.js` file, add a `debugger` after your `ul.append(newLi)`. Try writing `newLi.remove()` in the console. Then try `ul.remove()`.

### **Other DOM Manipulation Methods**

We won't use these today, but be aware that their are many other DOM manipulation methods including:

- `.replaceChild()`
- `.removeChild()`
- `.insertBefore()`
- `.cloneNode()`

## Resources

- [MDN - Event Bubbling and Capture](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture)
- [MDN - Event.target](https://developer.mozilla.org/en-US/docs/Web/API/Event/target)
- [MDN - Node.appendChild()](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)
- [MDN - ChildNode.remove()](https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove)
