# CSS Box Model

## Goals
* Understand what the box model is in CSS
* Utilize the box model to style an element

## Keywords
* Box Model
* Margin
* Border
* Padding
* Content

## Resources

* [CSS Box Model - MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Box_model)
* [CSS Box Model - W3Schools](https://www.w3schools.com/css/css_boxmodel.asp)

## Lesson

## The Box Model

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
