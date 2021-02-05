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

In our introduction to HTML, we created simple websites that didn't look so nice. **Cascading Style Sheets**, or CSS, allows us to create custom styling and specify how a page is displayed to users. CSS is made up of  _selectors_, _properties_, and _values_:

- **Selectors** select the element(s) on the page that you would like to style, for example paragraphs or lists. <br>
- **Properties** are the features of the element you want to change, for example background color or font size.
- **Values** are the values a property should have, for example a background color might be `red` or the font size could be `12pt`.

# 2. Adding a CSS file

There are three main ways to add CSS to an HTML file:

1. (_Only use for testing_) add a style attribute to an existing HTML element:
```html
<div style="border: 2px solid black;"></div>
```
2. (_Only use for testing_) use a style tag to add CSS code into the head of your HTML file: 
```html
<head>
  <style> div { border: 2px solid black; } </style>
</head>
```
3. (_Best practice_) create a separate CSS file and link it to your HTML page.

We will **always** put our CSS in a separate file because it makes it less likely we write conflicting CSS in different locations, and because it makes our stylesheets reusable, so we can apply the same stylesheet to many HTML pages. 

In this folder, you'll find two files -- `test.html` and `test.css`. Open up both files in VS Code and open up the HTML file in your browser. Inside the CSS file you should see the following code:

```css
h1 {
    color: blue;
    font-size: 12px;
}
```

We'll cover this syntax in depth shortly, but the goal of this CSS is to make our `h1` tags have small blue text. However, you'll notice that the headings in your browser are niether blue, nor do they have 12px font! That's because inside our HTML file, we must link the stylesheet so the browser knows to apply these styles. Add the following code inside the head of your HTML file:

```html
<head>
    <!-- ....title and meta tags -->

    <!-- ADD THIS TAG! -->
    <link rel="stylesheet" href="test.css">
</head>
```

The `link` tag is how we can connect our document to an outside source. The value of the `rel` attribute in the `link` tag tells the browser to use that file for the styles on the page and **NOT** the default styles. The `href` is a relative path from the HTML file to the CSS file that we want to import (just like when we were using the `a` tag for links). Since we have our CSS file in the same folder as our HTML, we just need to put the name of the file for it to work appropriately.

Now when you refresh your browser, the `h1` at the top of our site should have a small blue heading! Today and in the following lessons we will edit the `test.css` file in order to update the styling of our `test.html` page.

# 3. CSS Syntax

Like JavaScript or HTML, CSS has its own syntax. CSS syntax is relatively straightforward, but not very forgiving--one misplaced comma and your entire page won't load. Let's take a closer look at the code in `test.css`:

```css
h1 {
    color: blue;
    font-size: 12px;
}
```

This is a single **declaration block**. This declaration block is made up of:

1. A **selector**. The selector for this declaration block is `h1`. Whatever we type _inside_ the curly braces will apply to **ALL** `h1` elements on the page.
2. Two **property : value;** pairs, called **declarations**. The `color` of all `h1` tags is set to `blue` (`color` refers to the color of text inside the `h1` tag, not background color!). The `font-size` of all `h1` tags is set to `12px` (`12px` refers to the size 12 pixels, which is much smaller than the default 32px font size for an `h1` tag).

## Format
Each declaration inside the curly braces starts with the _property_ that you want to style followed by a _colon_ (`:`) and the _value_ you'd like the property set to. A declaration ends with a semicolon (`;`) which is typically something people forget (we've all been there!), so make sure you are including semicolons after each declaration.<br>

## Debugging CSS
CSS doesn't have helpful error messages like JavaScript, making it difficult to debug. That's why it's good practice to write your CSS for **one** declaration block at a time and then check it. If you do all your styling first and _then_ check to make sure it looks good, you may have missed many mistakes that are now hard to find!

# 4. CSS Reset

As we've already seen in previous lessons, different HTML elements have different default styling. 
To make matters more complicated, different browsers often have different default styling for HTML elements!
Because default styling differs across browsers, HTML elements sometimes behave in
unexpected ways. The purpose of a _CSS reset_ is to remove those default settings, so you can be certain your web applications appear the same no matter what.
You want to have complete control over all the elements on your page.

Also in this directory, you'll find a file named `reset.css`. Copy the css inside into your `test.css`, and make sure to place it at the **top** of `test.css`. Refresh your browser to see what your page looks like with the default styling removed!

Take a moment to look at the reset code and try to understand what each part is doing. Notice how we no longer have any automatic indentation with our list items. We also removed the bullet points and numbers.

## Specificity and order of declaration blocks

Each selector in a CSS file has a value associated with it called its [speceficity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity).
The idea behind this is that if two declaration blocks both apply to an element but contain conflicting declarations, whichever selector is more _specific_ will override the other.
We will learn more about speceficity and selectors in the coming lessons.
What's important now is that if two declaration blocks have the _same_ speceficity, the one that comes lower down in the file will win.
Because the `h1` selector in our CSS reset code has the same speceficity as the `h1` selector we used to turn the text blue, it's important to place the reset code at the *top* of the file so that it doesn't override our other declaration block.

# 5. The Box Model

 You can think of all of the HTML elements you've learned about as **boxes**. Whether it's a paragraph, image, or heading all HTML elements are boxes. And each HTML element comes with its own built in properties that specify how much space the element occupies on the page. These properties are **margin, border, padding** and **content**:

![box_model](https://cdn-images-1.medium.com/max/1200/1*6DrszcyPybYDGziiS9CWdg.png)

**Margin**: This is how much space you would like _around your element_. This does not affect the size of the element but instead adds space around it. Margins are transparent.<br>
**Border**: A border that can enclose your padding and content. Can adjust the width, color and style of the border.<br>
**Padding**: This is how much space you would like _around your content_. This **does** affect the size of the element. Adding more padding will increase the overall size of the element. Like margins, padding is transparent.<br>
**Content**: The content of the element where images and/or text appears. The size of the content area defaults to the amount/size of content unless you specify the `height` and `width` of the element. `height` and `width` refer to the _content area_, not the box as a whole.<br>

Let's see how the box model looks on the pages we've made. In your test.html file, we're going to wrap each section of related content in a `<div>` tag.
The `div` tag is used to group HTML elements that make up a cohesive section so that we can move and manipulate the contents together using CSS.
On its own, a `div` does not affect the appearance of the page at all--it's just a bucket that allows you to style the elements inside the `div` together.

Let's identify sections of related HTML content and wrap them in `div` tags.
Ultimately, there's no single right way to approach grouping your content, but whatever you decide will have implications for the layout of your webpage.
After wrapping the code in `div` tags, check out `withdivs.html` to see a model for how to group content.


```html
<!-- I'm wrapping the h1 and two p elements in a div so I can move them around and style them as a single unit -->
<div> 
  <h1>This is my first web page.</h1>
    <p>How <em>exciting</em>!</p>
    <p><strong>Isn't it?</strong></p>
</div>

<!-- I'd like to do this with my list section as well! -->
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

<!-- Now you try wrapping the remaining sections in divs... -->

```

Now that each section in your file is contained within a `div`, let's apply some styles.
Open your test.css file and delete the `h1` declaration block that turns text blue.
We want the `h1` elements to be un-styled.
Now let's make each `div` 400 pixels wide by specifying the width, padding, border and margins using the code below:

```css
div {
  border: 5px solid gray;
  margin: 10px;
  width: 350px;
  padding: 10px;
}
```

Save your file and reload the page. What happened to our page?

We now have borders and margins around each section with padding around the content. But we specified the `width` to be `350px`, why did we say that each `div` is 400 pixels wide? That's because the _content_ is 350px wide (so the text and the images are all 350px wide) **plus** the margin, which is 10px wide on each side (so that adds another _20px_ to the width) **plus** the border, which is 5px wide on each side (so that adds _10px_ to the width) **plus** the padding, which is 10px on each side (so that adds _20px_ to the width).

350px content width + 20px margin width + 10px border width + 20px padding width = **400px**

Play around with these properties to explore how changing each property's value alters the appearance of your page.

## Margin Collapse
The CSS above made the margin for each `div` 10 pixels. However, when the the `div` tags are stacked vertically, there are only 10 pixels (instead of a cumulative 20 pixels) of space between the bottom border of one `div` and the upper border of the next `div`. What's going on here? (Hint: [margin collapse](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)) 
