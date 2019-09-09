# Intro to CSS

## Goals
* Understand what Cascading Style Sheets (CSS) is and how it is used to style HTML web pages
* Use CSS to style an HTML page
* Use the Grid model to layout HTML pages
* Use a CSS reset to customize all styling on a page


## Keywords
* Cascading Style Sheets (CSS)
* Styling
* Selectors
* Properties
* `style` and `link` tags
* Box Model
* Margin
* Border
* Padding
* Content

## Resources

* [How CSS Works - MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/How_CSS_works)
* [CSS Intro - W3Schools](https://www.w3schools.com/css/css_intro.asp)
* [CSS Syntax - MDN](https://www.w3schools.com/css/css_syntax.asp)
* [CSS Syntax - W3Schools](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Syntax)
* [CSS Reset - stackoverflow](https://stackoverflow.com/questions/11578819/css-reset-what-exactly-does-it-do)
* [CSS Box Model - MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Box_model)
* [CSS Box Model - W3Schools](https://www.w3schools.com/css/css_boxmodel.asp)

# 1. Introduction to Cascading Style Sheets (CSS)

In previous lessons we created a pretty basic website that didn't look so nice. While the functionality was all there, it only used the default styles which are quite boring. In order to make websites look nice, web developers use **Cascading Style Sheets**, or CSS, to specify how the page is displayed to users. Using CSS involves using _selectors_ and _properties_ that determine which elements you want to modify and how you want them to look.

**Selectors** select the element(s) on the page that you would like to style, for example paragraphs or lists. <br>
**Properties** are the features of the element you want to change, for example making the background red or increasing font size.

# 2. Adding a CSS file

Typically when you style a page, you do so in a separate css file. You _can_ add a `<style>` tag to the `head` of your HTML document and write your CSS in there, but that's considered bad practice. Instead we will **import** our stylesheet.

To better understand how CSS files and styling works, let's create a CSS file for our bland HTML page we made. Go to the same folder where your test.html file lives and create a new file called "test.css". After you've created your file, update the `head` of your test.html document to match the example below:

```html
<head>
    <title>My first web page</title>
    <link rel="stylesheet" href="test.css">
</head>
```

The `link` tag is how we can connect our document to an outside source. The `stylesheet` attribute in the `link` tag tells the browser to use that file for the styles on the page and **NOT** the default styles. The `href` is the location of the file on the computer (just like when we were using the `a` tag for links). Since we have our CSS file in the same folder as our HTML, we just need to put the name of the file for it to work appropriately. Today and in the following lessons we will edit the test.css file in order to update the styling of our test.html page.

# 3. CSS Syntax

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

# 4. CSS Reset

As we've already seen in previous lessons, different HTML elements have different default styling. This isn't necessarily a bad
thing but it is definitely important to be aware of this fact. Because of the default styling, HTML elements sometimes behave in
unexpected ways. The purpose of a _CSS reset_ is to remove those default settings. This is very good practice when you start
to build your own websites. You want to have complete control over all the elements on your page.

Copy the following code into the top of your test.css file and see how it changes:

```html
html, body, header, nav, h1, a,
ul, ol, li, strong, main, button, i,
section, img, div, h2, p, form,
fieldset, label, input, textarea,
span, article, footer, time, small {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font: inherit;
  color: inherit;
  text-align: inherit;
  text-decoration: inherit;
  vertical-align: inherit;
  box-sizing: inherit;
  background: transparent;
}

ul, ol {
  list-style: none;
}

img {
  display: block;
  width: 100%;
  height: auto;
}

input[type="password"],
input[type="email"],
input[type="text"],
input[type="submit"],
textarea,
button {
  -webkit-appearance: none;
  -moz-appearance: none;
}

button,
input[type="submit"] {
  cursor: pointer;
}
```

Take a moment to look at the code and try to understand what each part is doing. Notice how we no longer have any automatic indentation with our list items. We also removed the bullet points and numbers.

The only remaining styles on the page are the ones that we added from previous lessons and are written below our reset. It is important to remember that our css files read from top to bottom. So any style written lower in the file will overwrite styles written higher up.

# 5. The Box Model

 You can think of all of the HTML elements you've learned about as **boxes**. Whether it's a paragraph, image, or heading all HTML elements are boxes. And each HTML element comes with its own built in properties that specify how much space the element occupies on the page. These properties are **margin, border, padding** and **content**:

![box_model](https://cdn-images-1.medium.com/max/1200/1*6DrszcyPybYDGziiS9CWdg.png)

**Margin**: This is how much space you would like _around your element_. This does not affect the size of the element but instead adds space around it. Margins are transparent.<br>
**Border**: A border that can enclose your padding and content. Can adjust the width, color and style of the border.<br>
**Padding**: This is how much space you would like _around your content_. This **does** affect the size of the element. Adding more padding will increase the overall size of the element. Like margins, padding is transparent.<br>
**Content**: The content of the element where images and/or text appears. The size of the content area defaults to the amount/size of content unless you specify the `height` and `width` of the element. `height` and `width` refer to the _content area_, not the box as a whole.<br>

Let's see how the box model looks on the pages we've made. In your test.html file, we're going to wrap each _section_ in a `<div>` tag. A `div` in CSS is a tag that allows you to group elements of different types together. On its own, a `div` does not affect the appearance of the page at all--it's just a bucket that allows you to style all the elements inside the `div` in the same manner. You can wrap your sections in the `body` of your test.html file like so:

```html
<div>
  <h1>This is my first web page.</h1>
    <p>How <em>exciting</em>!</p>
    <p><strong>Isn't it?</strong></p>
</div>

<div>
  <h2>Let's make a list!</h2>
  <ul>
    <li>First item!</li>
    <li>Second item!</li>
    <ol>
      <li>This is ordered</li>
      <li>So is this!</li>
    </ol>
    <li>Third item!</li>
  </ul>
</div>

<div>
  <h2>Links</h2>
  <a href="https://www.google.com">Take me to Google!</a>
</div>

<div>
  <h2>Images</h2>
  <img src="http://www.readersdigest.ca/wp-content/uploads/2013/03/6-facts-to-know-before-owning-a-puppy.jpg" alt="Puppy!" width="300"/>
</div>

<div>
  <h2>Table</h2>
  <table>
        <tr>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
      </tr>
      <tr>
          <td>Row 1, cell 1</td>
          <td>Row 1, cell 2</td>
          <td>Row 1, cell 3</td>
      </tr>
      <tr>
          <td>Row 2, cell 1</td>
          <td>Row 2, cell 2</td>
          <td>Row 2, cell 3</td>
      </tr>
      <tr>
          <td>Row 3, cell 1</td>
          <td>Row 3, cell 2</td>
          <td>Row 3, cell 3</td>
      </tr>
  </table>
</div>

<div>
  <h2>Form</h2>
  <form>
    First name:<br>
    <input type="text" name="firstname" value="First name"><br>
    Last name:<br>
    <input type="text" name="lastname" placeholder="Last name"><br>
    <input type="radio" name="gender" value="male"> Male<br>
    <input type="radio" name="gender" value="female"> Female<br>
    <input type="radio" name="gender" value="other"> Other<br>
    <input type="checkbox" name="vehicle1" value="Bike"> I have a bike<br>
    <input type="checkbox" name="vehicle2" value="Car"> I have a car<br>
    <input type="submit" value="Submit">
  </form>
</div>
```

Great! Now each `div` in our file contains all associated elements for that section. Open your test.css file and delete the `h1` declaration block. We want the `h1` elements to be un-styled. What we are going to do is make each `div` 400 pixels wide by specifying the width, padding, border and margins using the code below:

```css
div {
  width: 350px;
  margin: 10px;
  border: 5px solid gray;
  padding: 10px;
}
```

Save your file and reload the page. What happened to our page?

We now have borders and margins around each section with padding around the content. But we specified the `width` to be `350px`, why did we say that each `div` is 400 pixels wide? That's because the _content_ is 350px wide (so the text and the images are all 350px wide) **plus** the margin, which is 10px wide on each side (so that adds another _20px_ to the width) **plus** the border, which is 5px wide on each side (so that adds _10px_ to the width) **plus** the padding, which is 10px on each side (so that adds _20px_ to the width):

350px content width + 20px margin width + 10px border width + 20px padding width = **400px**


Play around with these properties to explore how changing each property's value alters the appearance of your page.
