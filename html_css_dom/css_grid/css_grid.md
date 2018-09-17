# CSS Grid

## Goals 
* Understand the advantages of using CSS Grid.
* Know how to initiate a CSS Grid.
* Be able to manipulate elements inside of a grid. 
* Know basic grid calls. 

## Keywords
* Rows
* Column
* Grid 
* Responsive 

## Lesson 

CSS Grid is the newest and hottest thing to change about CSS. This is something that was added after Flexbox and uses a lot of 
the familiar flexbox commands that we've grown to know and love. 

### The what?
CSS Grid Layout is a two-dimensional layout system for the web.
It lets you lay content out in rows and columns, and has many features that make building complex layouts straightforward. 
Essentially, it's displaying your HTML elements on a preconceived grid. This allows for easy responsive design and gives us 
developers lots of control about where we want to place our elements on the screen. 

To start, create two new files: grid.html, and grid.css. 

Copy the following code into your HTML:

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>GRID!</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="./grid.css">
  </head>
  <body>
    <div class="container">
     <div class="one">One</div>
     <div class="two">Two</div>
     <div class="three">Three</div>
     <div class="four">Four</div>
     <div class="five">Five</div>
     <div class="six">Six</div>
     <div class="seven">Seven</div>
     <div class="eight">Eight</div>
     <div class="nine">Nine</div>
   </div>
  </body>
</html>

```

Add this styling to your CSS file:


```css
.container div {
  border-radius: 5px;
  padding: 10px;
  background-color: lightblue;
  border: 2px solid red;
}


```

Great, now open up the window and take a look at what we're working with.  

### Grid Creation

To define a grid we use the grid value of the display property. Inside your CSS add the code: 

```css
.container {
  display: grid;
}

```

Unlike flexbox, the items will not immediately look any different. Declaring display: grid gives you a one column grid, so your items will continue to display one below the other as they do in normal flow.

To see something that looks more like a grid we can add some columns. Add the following attribute to your container:
`grid-template-columns: 200px 200px 200px;`. You can make as many columns as you want, use any unit of length, or even use percentages. Experiment! 

Now add `justify-content: center;` to center your divs. 

CSS Grid also gives us a new unit of size called `fr`. This stands for fraction. Try having your grid-template-columns point to 1fr 1fr 1fr. What if you change the middle to 2fr? Don't forget to adjust the screen size to see the way it's responsive.

`grid-template-columns: repeat(3, 1fr);` is the same as writing: `grid-template-columns: 1fr 1fr 1fr;`. You can even add different units before or after the repeat. 

If you'd like to add some space between your divs, add the command `grid-gap: 5px;` to `.container`. These gaps can be any length unit or percentage except `fr`. 

So far we have only been working with columns, and rows have automatically been created. By default, these rows have been auto-sized. We can control the height of these auto rows with the following: `grid-auto-rows: 100px;`

This looks good, but what happens if we were to have an item that was taller than 100px? It would cause an overflow. Because of this, it is often better to use the `minmax(min, max)` function. This way we can be sure our items won't be smaller than 100px and that they will still fit into our item even if they are bigger. 

Change your css to: `grid-auto-rows: minmax(100px, auto);`

Sometimes it is helpful to be able to ask grid to create as many columns as will fit into the container. We can do this by combining everything we've learned so far. . We do this by setting the value of grid-template-columns using repeat() notation, but instead of passing in a number, pass in the keyword auto-fill. For the second parameter of the function we use minmax(), with a minimum value equal to the minimum track size that we would like to have, and a maximum of 1fr.

Change your css to: `  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));`

### Grid Placement

You can think of your grid made up of lines. The count starting at 1. This is the first line on the left side, and the first line on the top. We can place items onto the grid by using these commands:
* grid-column
* grid-row

These let you specify the start and end lines at once, separated by a / — a forward slash character.

Let's see this in action: 
First change you CSS file to look like this:

```css
.container div {
  border-radius: 5px;
  padding: 10px;
  background-color: lightblue;
  border: 2px solid red;

}

.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  grid-gap: 5px;
  grid-auto-rows: minmax(100px, auto);
}

```

Next, experiment with grabbing a div and moving it around using grid-column, and grid-row. Try this command to get you started:

```css
.one {
  grid-row: 2;
  grid-column: 2 / 4;
}

```

After you've played around for a bit go through the _Practice_ in the next section. 

## Practice 
Go through [this](https://scrimba.com/g/gR8PTE) tutorial and practice using CSS Grid. 

## Resources 
* [MDN- CSS Grid](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids)
