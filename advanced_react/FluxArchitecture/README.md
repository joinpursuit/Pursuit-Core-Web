# Flux Architecture
Flux is a design pattern for complex statement used by Facebook. Although many have created formal "frameworks" that implement flux principles, it is at heart simply another design pattern.

## What is Flux?

Flux reimagines how a data flow works in an application. Think about how we handle data flow currently: when the user interacts with a particular component, baed on the nature of the interaction we go ahead and make a change and specify which components must be redrawn.

For instance, if the user selects an item from a dropdown, we might want to populate a list of related things below the drop down.

But here's a question - what if the selection of that dropdown were to **not only** populate a list of things below the dropdown, but also update the navbar of the page and change the contents of a pane somewhere else on the application?

This is the type of problem that **Flux** architecture attempts to solve.  In a nutshell, flux is basically **a single source of truth object** that, when updated, rerenders the entire application. By doing so, we are certain that whereever the updated info needs to show up (for instance in our previous example in the navbar and an additional pane), it will show up. Since the entire page is essentially rerendered.

You might be thinking: wait - isn't that super inefficient?? The answer is...*maybe*. Remember, React is built to do DOM diffing, so generally *only* the stuff that needs to be redrawn will be redrawn. However, we still get the advantage of having to **only** consider how to update our **single source of truth object** on user action.

Here's a good image that illustrates this:

![img](https://github.com/mottaquikarim/advanced-react/blob/master/FluxArchitecture/assets/flux-simple-f8-diagram-with-client-action-1300w.png?raw=true)

(^^^ [from fb](https://facebook.github.io/flux/docs/in-depth-overview.html#content))


### More info

* https://github.com/facebook/flux/tree/master/examples
* https://facebook.github.io/flux/docs/in-depth-overview.html#content
