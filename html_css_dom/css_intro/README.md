# Intro to CSS

## Goals
* Understand what Cascading Style Sheets (CSS) is and how it is used to style HTML web pages
* Use CSS to style an HTML page

## Keywords
* Cascading Style Sheets (CSS)
* Styling
* Selectors
* Properties
* `style` and `link` tags

## Resources

* [How CSS Works - MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/How_CSS_works)
* [CSS Intro - W3Schools](https://www.w3schools.com/css/css_intro.asp)
* [CSS Syntax - MDN](https://www.w3schools.com/css/css_syntax.asp)
* [CSS Syntax - W3Schools](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Syntax)

## Lesson

## Cascading Style Sheets (CSS)

In previous lessons we created a pretty basic website that didn't look so nice. While the functionality was all there, it only used the default styles which are quite boring. In order to make websites look nice, web developers use **Cascading Style Sheets**, or CSS, to specify how the page is displayed to users. Using CSS involves using _selectors_ and _properties_ that determine which elements you want to modify and how you want them to look.

**Selectors** select the element(s) on the page that you would like to style, for example paragraphs or lists. <br>
**Properties** are the features of the element you want to change, for example making the background red or increasing font size.

### Styling a Page

Typically when you style a page, you do so in a separate css file. You _can_ add a `<style>` tag to the `head` of your HTML document and write your CSS in there, but that's considered bad practice. Instead we will **import** our stylesheet.

To better understand how CSS files and styling works, let's create a CSS file for our bland HTML page we made. Go to the same folder where your test.html file lives and create a new file called "test.css". After you've created your file, update the `head` of your test.html document to match the example below:

```html
<head>
    <title>My first web page</title>
    <link rel="stylesheet" href="test.css">
</head>
```

The `link` tag is how we can connect our document to an outside source. The `stylesheet` attribute in the `link` tag tells the browser to use that file for the styles on the page and **NOT** the default styles. The `href` is the location of the file on the computer (just like when we were using the `a` tag for links). Since we have our CSS file in the same folder as our HTML, we just need to put the name of the file for it to work appropriately. Today and in the following lessons we will edit the test.css file in order to update the styling of our test.html page.

### CSS Syntax

Just like other programming languages, CSS has its own syntax and rules. You'll find that the syntax for CSS is fairly straightforward but not very forgiving--one misplaced comma and your entire page won't load with little reason given! This is why it is good practice to write your CSS for **one** element at a time and then check it. If you do all your styling first and _then_ check to make sure it looks good, you may have missed many mistakes that are now hard to find!

In addition to _selectors_, _properties_ and _values_ are responsible for editing how a page looks. Selectors choose the element or elements to edit while properties and values can form **declarations**. It is these declarations, called _declaration blocks_ that actually dictate how the element looks which in turn dictates the overall page's appearance. Below is an example of a declaration block.

<img src="https://www.w3schools.com/css/selector.gif">

This declaration block is written on one line for readability but you will typically see each property/value pair on its own line.<br>
**Selector**: The selector for this declaration block is `h1`. This means whatever we type _inside_ the curly braces will apply to ALL `h1` elements on the page.<br>
**Properties**: The properties of all `h1` elements that are to be altered are `color` and `font-size`. `color` refers to the _font color_ and `font-size` refers to the _size of the font_.<br>
**Values**: The value `blue` means that the `h1` text will now be the color blue. Not the background or highlight color--the actual text will be in blue instead of black. The value `12px` means that all `h1` text on the page will have a `font-size` of 12 pixels (which is quite a bit smaller than the 32px standard font size for `h1` elements).<br>
**Format**: Each declaration starts with the _property_ that you want to style followed by a _colon_ (`:`) and the _value_ you'd like the property set to. The declaration ends with a semicolon (`;`) which is typically something people forget (we've all been there!), so make sure you are including semicolons after each declaration.<br>

More often, you'll see CSS declaration blocks like below:

```css
h1 {
    color: blue;
    font-size: 12px;
}
```

Copy that code into your test.css file, save and reload your page. What happens?
