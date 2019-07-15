# HTML Tags - Tables + Forms

## Goals
* Create an appropriate table using the HTML table tags
* Create an appropriate form using the HTML table tags

## Keywords
* Table
* Form
* Tags
  * Table (`<table>`)
  * Table Row (`<tr>`)
  * Table Header (`<th>`)
  * Table Data/Cell (`<td>`)
  * Form (`<form>`)
  * Form Input (`<input>`)

## Resources

* [HTML Tables - HTML Dog](http://htmldog.com/guides/html/beginner/tables/)
* [HTML Tables - W3Schools](https://www.w3schools.com/html/html_tables.asp)
* [HTML Forms - HTML Dog](http://htmldog.com/guides/html/beginner/forms/)
* [HTML Forms - W3Schools](https://www.w3schools.com/html/html_forms.asp)

## Lesson

## Table Tags

HTML tables are just like any other table you've used or created: there are columns of data and each column has a heading. HTML tables work by populating each row with data and enclosing all that information in a `table` tag. Let's look at an example from HTML Dog:

```html
<table>
    <tr>
        <th>Column 1 Heading</th>
        <th>Column 2 Heading</th>
        <th>Column 3 Heading</th>
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
```

As you can see, everything _inside_ the `table` tags makes up the content of the table. First, you should create headings for each column of your table using the `th` tag. If you do not put the headings first, they will _not_ be on top of each column, so it's important that you put the headings _first_ in your table. If your table's columns do not require headings, then don't worry about adding in any headings. Then you specify row-specific content with the `tr` tag. All of the information you put inside the `tr` tag will be displayed in a row, horizontally from left to right. In order for the information to display correctly, you must put each piece of data inside a table data (`td`) tag. Each `td` tag represents **one** box or cell on your table.

Add the HTML above to your test.html document then save and reload your test.html page in the browser. Does the table look as expected? Pretty much! Don't worry about the boring default styling right now--we'll learn how to style a table later.

## Form Tags

One of the most important parts of the internet is being able to contribute material online. Whether it's buying something on Amazon, signing up for Netflix or commenting on a Facebook post you are using **forms**. While forms may seem quite boring at first, they are one of the most important tools you'll have as a web developer! In order to collect data on any website, you'll need to use forms in some way. The forms we create today won't actually send data anywhere but don't worry, we'll get there soon! For now just focus on understanding how forms function.

Similar to tables, HTML forms are enclosed in a `form` tag. Everything _inside_ this tag represents the elements that make up the form. Form elements are different types of **input elements**, like text fields, checkboxes, radio buttons, submit buttons, and more. Input elements are made of `input` tags that accept attributes which dictate the type of input it will be.

### Text Input

Every time you are typing text into a form, you are writing in a `text` input element. The way the browser knows to display a text box is because inside the `input` tag, we pass the `text` attribute like this:

```html
<input type="text">
```

This would render a blank text box on the page, which isn't terribly helpful. Thankfully there are a few ways you can let the user know what goes in the text box:

```html
<form>
  First name:<br>
  <input type="text" name="firstname" value="First name"><br>
  Last name:<br>
  <input type="text" name="lastname" placeholder="Last name"><br>
</form>
```

In the example above, the Form would have "First name" placed above the first text box with "First name" typed into the first text box. This is because "`First name:<br>`" above the text input field writes the words "First name:" on the page and then adds a line break with `<br>` so the text and text field are not on the same line. "First name" would be _typed_ into the text field because the `value` attribute represents what is typed into the text box. As a user types into the text box, the _value_ is updated.

The second text box would also have "`Last name:`" written above it for the same reasons that "First name" appears above the first text box. The second text box, however, is utilizing the `placeholder` attribute. This will put greyed-out text inside the text box that disappears when the user clicks on the text box. This is different from `value` because the user has to delete `value` but not `placeholder`. It is generally good practice to _not_ have a default value in any text box, unless it is information that user has previously provided (like when a form auto-fills your billing address based on the mailing address you already gave). This is because forcing the user to delete information typed into a form is annoying.

### Input Selections: Radio Buttons

In addition to typing into forms, you've probably also had to select one or more items from a list. This is useful when you only want to give the user _certain_ options for a form. The first type are **radio buttons** which allow the user to select ONE choice from the list. The other type are **checkboxes** which allow the user to select AS MANY choices from the list as they'd like.

To create radio buttons, you would do the following:
```html
<form>
  <input type="radio" name="gender" value="male" checked> Male<br>
  <input type="radio" name="gender" value="female"> Female<br>
  <input type="radio" name="gender" value="other"> Other
</form>
```
Here we can see the `type` is `radio`. A radio group is defined by giving each of radio buttons in the group the same `name`. Once a radio group is established, selecting any radio button in that group automatically deselects any currently-selected radio button in the same group. Since all three of these radio buttons relate to the choice of gender, they are all named `gender`. A `value` must also be filled in because this is what is sent on the form submit, just like in a text form. If `value` is left blank nothing will be sent for that selection when a user clicks submit and the radio button will also be blank. You need to include text before or after the radio button to let the user know what the button represents. The last attribute called `checked` represents the value that the user has selected--this is an _optional_ attribute as radio buttons default to not being selected however you can make one of your selections be the default selection.

### Input Selections: Checkboxes

Checkboxes work in a very similar way to radio buttons except their `type` is `checkbox`. Just like radio buttons, the `value` of the checkbox represents the information that will be sent with the form when a user submits the form. Again, like radio buttons, you need to include text that tells the user what the checkbox represents because `value` is not displayed.

```html
<form>
  <input type="checkbox" name="vehicle1" value="Bike"> I have a bike<br>
  <input type="checkbox" name="vehicle2" value="Car"> I have a car<br>
</form>
```

### Input Submission

The most important part of a form is being able to _submit_ the information. This information is usually sent to a server where it is saved, compiled or used for some other purpose. For today, we won't actually send our user information anywhere. The input type for submitting a form is, appropriately, `submit`. With `submit` input, it will appear as a button and the text that appears on the button is equal to the `value` attribute: `<input type="submit" value="Submit">`. This would appear as a button with the word "Submit" on it.

Submit buttons can also have an `onClick` attribute which can be used to process the information. Forms can have an `onSubmit` attribute that can also be used for processing the information in a form. Again, don't worry about those for now--you'll have plenty of time to practice that soon!

### Example HTML for a Form

```html
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
```
