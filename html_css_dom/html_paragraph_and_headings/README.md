# HTML Tags - Paragraphs and Headings

## Goals
* Understand how tags work in HTML
* Create an HTML document
* Use paragraph, heading, strong and emphasis tags appropriately in an HTML document

## Keywords
* Tags
  * Paragraph (`<p>`)
  * Headings (`<h1>`, `<h2>`, etc)
  * Strong (aka **bold**, `<strong>`)
  * Emphasis (aka _italics_, `<em>`)

## Resources

* [HTML Paragraphs - HTML Dog](http://htmldog.com/guides/html/beginner/paragraphs/)
* [HTML Headings - HTML Dog](http://htmldog.com/guides/html/beginner/headings/)

## Lesson

## HTML Tags

_Tags_ in HTML are how the browser knows what to render and what each rendered item will look like. Tags have an opening`<TAG>` and a closing `</TAG>` and wrap content like this: `<p>This text is wrapped by paragraph tags!</p>`. When the browser reads an HTML document and hits a `<p>` tag, it knows that what it is reading is a _paragraph_ and will render it according to the default or specified paragraph properties.

Let's start by creating a new blank document titled `test.html`. Below is the skeleton of all basic HTML pages, which you can copy into your test.html document:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My first web page</title>
</head>
<body>
    This is my first web page.
    How exciting!
</body>
</html>
```

`<!DOCTYPE html>` tells the browser what kind of document it's working with (`html`) so it knows how to render it.
Inside the `<html>` tags is all of our HTML code.
`<head>` is the container for all head elements which can include a title for the document, scripts, styles, meta information, and more.
`<body>` defines the document's body and makes up the contents of the HTML document such as text, hyperlinks, images, tables, lists, etc. **This is where all of your code will go.**


### Paragraph Tags

Right click on your test.html file and select the option copy full path, then open a new tab in your browser and paste in the path. Your HTML will load in the browser but it may not look how you might have expected. Even though we put our two sentences on different lines, they appear on the same line on the page. This is because we did not enclose them in any HTML tags, so the browser just renders them as one block of plain text.

Let's wrap our sentences in a paragraph tag (`<p>`) and see how that changes things:

```html
<p>This is my first web page.
How exciting!</p>
```
After saving and reloading your HTML page in the browser, we can see that it didn't change it in the way we expected. It added some space above the sentences but they're still on the same line. This is because we enclosed the two sentences in **one** `<p>` tag. If we want each sentence to be treated like its own paragraph, we need to enclose **each** sentence in `<p>` tags.

```html
<p>This is my first web page.</p>
<p>How exciting!</p>
```

Now when you save and reload your HTML page in the browser, we can see that each sentence is on its own line _and_ they've even got some space between. Nice! :sunglasses: This is because the paragraph tags have default styling that includes spacing between each paragraph tag as well as putting each tag on its own line.

_PRO TIP:_ When writing your html tag, type in the tag without opening and closing angle brackets and hit tab.  

### Heading Tags

Our page is neat but it should probably have a title or _heading_ to make it clear what's happening. In HTML there are **five** different types of headings, `h1` to `h5`, with `h1` having the largest default font size/line spacing and `h5` having the smallest default font size/line spacing. Typically heading tags are used for titles and subtitles on a page, with large bold fonts.

Let's edit our HTML file and change our first sentence to a heading tag using `h1`:

```html
<h1>This is my first web page.</h1>
<p>How exciting!</p>
```

Save and reload. How has our first sentence changed in appearance? What happens if we change it from an `h1` tag to a `h2` tag? `h3` tag?

### Styling Tags

Other tags that can be useful for style and emphasis are the `<strong>` and `<em>` tags. `<strong>` tags, by default, make a text **bold**; `<em>` tags, by default, make text _italic_. If we wanted text to be bold or italic, we would just wrap that text in a `strong` or `em` tag _inside_ our `p` or `h` tags. Let's add some to our HTML and see what happens:
?
```html
<h1>This is my first web page.</h1>
<p>How <em>exciting</em>!</p>
<p><strong>Isn't it?</strong></p>
```
