# HTML Tags - Lists, Links + Images

## Goals
* Understand how list tags work in HTML
* Use ordered and unordered list tags appropriately in an HTML document
* Use link tags appropriately in an HTML document
* Use image tags in an HTML document

## Keywords
* Lists
* Links
* Images
* Tags
  * Ordered List (`<ol>`)
  * Unordered List (`<ul>`)
  * List Items (`<li>`)
  * Link (`<a>`)
  * Image (`<img>`)

## Resources

* [HTML Lists - HTML Dog](http://htmldog.com/guides/html/beginner/lists/)
* [HTML Lists - W3Schools](https://www.w3schools.com/html/html_lists.asp)
* [HTML Links - HTML Dog](http://htmldog.com/guides/html/beginner/links/)
* [HTML Links - W3Schools](https://www.w3schools.com/html/html_links.asp)
* [HTML Images - HTML Dog](http://htmldog.com/guides/html/beginner/images/)
* [HTML Images - W3Schools](https://www.w3schools.com/html/html_images.asp)

## Lesson

## List Tags

It is not uncommon to see bulleted lists of information (ahem, look up :point_up:) or numbered lists on the web, but how do we create those? Right now, you could probably put together a list by using `<p>` tags and symbols or numbers. But this might not give us the desired result.

Now when we save and reload our page If we add a list using paragraph tags to our test.html document, you'll see it mostly looks like a list but not quite. Copy the code below then save and reload your page.
```html
<h1>This is my first web page.</h1>
  <p>How <em>exciting</em>!</p>
  <p><strong>Isn't it?</strong></p>

<h2>Let's make a list!</h2>
  <p>1. First item!</p>
  <p>2. Second item!</p>
  <p>3. Third item!</p>
```

It looks pretty much like a list but now imagine we want add ten more items but then want to delete this first item. Now we have to manually change _every_ number because the second bullet would now become the first. This is not ideal! To fix that problem we can use _list tags_.

### Ordered List Tags

To solve the problem we've created above we are going to implement an _ordered list_ which is basically just a numbered list. Ordered lists are great because we don't need to keep track of what number each bullet is--they are automatically incremented. To create an ordered list we first use the `<ol>` tag and then put our list items `<li>` inside that.

Let's change our list to be an actual ordered list:

```html
<ol>
  <li>First item!</li>
  <li>Second item!</li>
  <li>Third item!</li>
</ol>
```

If we save and reload, we can see that the list looks much nicer! The content is indented and the large space between each line is removed. Now if we add a fourth item and remove the first, the list updates accordingly and we don't have to worry about changing any numbers.

### Unordered List Tags

An _unordered list_ works in the same way that an ordered list does except now it uses standard bullets in place of numbers. To make our list unordered, we just need to change our `<ol>` tags to `<ul>` tags.


```html
<ul>
  <li>First item!</li>
  <li>Second item!</li>
  <li>Third item!</li>
</ul>
```

Now our list's numbers have been replaced by bullet points and thus an unordered list is born. You'll notice that the _entire_ list of items is wrapped in either an ordered or unordered list tag. This means that you **cannot** mix bullets and numbers in one list. You can, however, make a sub-list that is different from the main list. In the example below, the ordered sub-list will be indented further than the unordered main list.

```html
<ul>
  <li>First item!</li>
  <li>Second item!</li>
  <ol>
    <li>This is ordered</li>
    <li>So is this!</li>
  </ol>
  <li>Third item!</li>
</ul>
```

## Link Tags

Remember how we said _HyperText_ means that disparate web pages on the internet can connect to one another? That's one of the most important parts of the web as we know it, so **links** are pretty important HTML tags! Without them, it just wouldn't be HTML (literally! :nerd_face:). A link tag is very similar to the tags we've been working with except this tag accepts an _attribute_ that points to the link's destination. Every `a` tag includes an `href` attribute that accepts that URL where the link goes to. To add an attribute to an HTML tag, you put it **inside** the opening tag like so: `<a href="https://www.google.com">`. This link would direct the user to Google when they click it. 

If we wanted to also add text to our link, we would put that _in between_ the opening and closing tags, like we've been doing with all our other tags:

```html
<h2>Links</h2>
<a href="https://www.google.com">Take me to Google!</a>
```

Let's add this to our test.html document under our lists. You'll see it looks just like any old link you've seen before but this one is special because **you made it**! It is important to note that if we made our link `www.google.com` or `google.com` it _WOULD NOT_ work! It would try to go to a location on your computer. You need to include the `https://` because that tells the browser you are looking for an **outside** page on the Web--not on your computer. We normally don't have to type all that into the browser because the browser has been designed to assume you meant to include the `https://`.

## Image Tags

Image tags are used for embedding an image into our HTML page. Any page that has an image on it is using an **image tag**. An image tag is represented by `<img>` and similar to our `a` tags above, image tags accept attributes. With image tags, they need to be given a URL that points to the location of the image. This can be a URL from the internet or a location on your computer. The `src` (like _source_) attribute is what points to the image URL and the `alt` (like _alternate_) attribute is text that appears if the link is broken or the image cannot load. You should include _both_ for every `img` tag you use just to be safe. The `img` tag is also unique because the opening tag can close itself like so: `<img />`. While you can use the standard format (`<img></img>`), you'll find it is much easier to just type `<img/>`.

Let's add a cute puppy picture to our test.html file! Copy the code below under your Links section:

```html
<h2>Images</h2>
<img src="http://www.readersdigest.ca/wp-content/uploads/2013/03/6-facts-to-know-before-owning-a-puppy.jpg" alt="Puppy!"/>
```

Aw cute! But wow that picture is _huge_! Luckily the `img` tag also accepts `width` and `height` attributes. In later lessons, we'll learn how to use CSS to format our images in a much better way, but for now using the `width` and `height` attributes will do the job! By setting our `width` and `height` to `300`, we are actually setting them both equal to 300 pixels in height and width. Writing style attributes directly into the HTML is called inline markup. This is generally bad practice; later we will learn cleaner ways to style our HTML. 

```html
<h2>Images</h2>
<img src="http://www.readersdigest.ca/wp-content/uploads/2013/03/6-facts-to-know-before-owning-a-puppy.jpg" alt="Puppy!" width="300" height="300"/>
```

Yay! But it looks a little... _off_. This is because we specified a height and width **without** respect to the ratio of the photo. To solve this problem, just modify either the height _or_ the width--not both. If we just set the width to 300, it's height will fill automatically.

```html
<h2>Images</h2>
<img src="http://www.readersdigest.ca/wp-content/uploads/2013/03/6-facts-to-know-before-owning-a-puppy.jpg" alt="Puppy!" width="300"/>
```

Much better! :dog:
