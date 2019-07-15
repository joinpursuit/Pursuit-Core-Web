# CSS Reset 

## Goals 
* Know what a css reset is.
* Understand why you would want to use it. 
* Be able to write your own. 

## Keywords
* Reset
* Selectors

## Lesson 
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
Take a moment to look at the code and try to understand what each part is doing. Notice how we no longer have any automatic 
indentation with our list items. We also removed the bullet points and numbers. 

The only remaining styles on the page are the ones that we added from previous lessons and are written below our reset. It 
is important to remember that our css files read from top to bottom. So any style written lower in the file will overwrite
 styles written higher up. 
 
 
 ## Resources 
 * [css reset](https://cssreset.com/what-is-a-css-reset/)
