# React Forms 3: The `form` Tag, Accessibility, and Putting It All Together

## Links
* [Semantic HTML](https://html.com/semantic-markup/)
* [Search Engine Optimization](https://en.wikipedia.org/wiki/Search_engine_optimization#Getting_indexed)
* [Guide to Forms in React](https://blog.logrocket.com/an-imperative-guide-to-forms-in-react-927d9670170a)

## Terms
* Semantic HTML
* HTML Form Events
* `e.preventDefault`
* `onSubmit`

## Introduction

Okay, so we've reviewed all of the different input types. We're done, right? Well, not quite. We'd like to use this as an opportunity to do two things:

* Emphasize semantic HTML, even in React, as a way to improve a site's SEO and accessibility to screen reader software for the blind
* Pull all of these input types together into one big example form

Let's get started, huh?

## Semantic HTML

So, you may have noticed that click events in React can be placed on **any element** of HTML. This means that you don't actually have to have a `button` tag to do something clickable, or a `form` tag to submit information. In fact, React doesn't really care what tag you use - your site could, theoretically, just consist of custom-styled `div`s all the way down.

However, in a production app, this is a terrible and potentially dangerous practice. HTML5, the most recent version of HTML, gives you many custom tags, such as `nav`, `header`, `footer`, `article`, and, of course, `form`.

But why do we want to use these things? We won't go too deep here, but let's review a couple of reasons:

### Reason 1: SEO, Robots, and You

SEO stands for **Search Engine Optimization**. Search engines index websites for particular queries based on relevance, which they determine via a number of factors. Search engine-crawling programs (A.K.A. robots; A.K.A., occasionally, spiders) go through websites and flag words and phrases that are seen related to whatever search term users are looking for. This is one large part of how websites are indexed - in other words, if you want to be on the front page of Google for a certain term, you want to make sure your website prominently features related terms.

If your website is all `div`s, however, robots have no way of determining what text on your site is important and what isn't. Even if it's visually apparent, robots don't take font size into account. They weight terms based on the perceived importance of the *specific HTML tag* those terms are contained in. For example, terms contained in a `header` tag, or even an `h1`, are way more prominently considered by robots than a `div` or `p` tag.

This kind of exposure is super important - just like good salesmanship won't hide a bad product, bad salesmanship makes a good product pointless. If a website goes down on the internet and no search engines are indexing it, does it make a sound?

Well, that's a little philosophical. Let's get into the second reason:

### Reason 2: Accessibility

Folks who have difficulty seeing use screen readers on the Internet. Screen readers are programs that do just what they say: they read the screen. However, they aren't just reading the screen top-down. Think about how much text is on a screen - that'd be a super inefficient way to use a computer!

Screen readers use context clues to inform users about important stuff on a website. You provide these context clues using (you got it) semantic HTML. If a form isn't labeled as such with a `form` tag, for example, it can be difficult for screen readers to tell that there even is a form for a user to fill out.

This is important not only because it's a good, important thing to do to make sure that your website is accessible. It's important because [businesses get sued](https://www.adatitleiii.com/2018/01/2017-website-accessibility-lawsuit-recap-a-tough-year-for-businesses/) for not making their sites accessible. This is avoidable, and a way that you can position your skills as essential and uniquely valuable.

Remember: While semantic HTML is particularly good for tricky things like forms, it's important to do for any and all HTML code you write. Getting into the habit now will save you a lot of headaches later.

## [Example](https://codesandbox.io/s/klm79pw6o)

Here's an example of all the previous apps we've made put together. Take a look at `form.js`. Let's start with the constructor function this time:

```js
constructor() {
  super();
  this.state = {
    name: "",
    likesIceCream: "",
    prefAnimal: "",
    notARobot: false,
    formSubmitted: false,
    message: ""
  };
}
```

We've started our component with all of the parts of state combined into one group, alongside two new parts of state: `formSubmitted` and `message`. `formSubmitted` will check whether the user has correctly filled out the form. If they have, it'll toggle to `true`. If the form is not correctly filled out, `message` will tell them that they need to complete the form properly before they click "Submit".

Our input handler functions are nearly identical to our previous example projects, so we won't be looking at those too much. Instead, let's move on to `handleFormSubmit`:

```js
handleFormSubmit = e => {
  e.preventDefault();
  const { name, likesIceCream, prefAnimal, notARobot } = this.state;

  if (name && likesIceCream && prefAnimal && notARobot) {
    this.setState({
      formSubmitted: true,
      message: ""
    });
  } else {
    this.setState({
      message: "Please complete the form."
    });
  }
};
```

OK, so we're going to see how this is used in just a moment, but for now, just know that we're using the HTML `form` tag in our component. If you'll remember, the HTML `form` by default refreshes the entire page on submission, with the form's responses as URL parameters. Because React is handling form responses for us, we don't need to do this - this is what `e.preventDefault` does on the first line of this function.

After we prevent the page from reloading, we need to verify that the user has filled out the form completely and correctly. Therefore, we use logic operators (particularly `&&`) to make sure that **all form-controlled parts of state** are truthy values. If they are, we set `formSubmitted` to `true` and clear out any error messages. If they aren't, we update the state to display a message to our users.

This is reflected in our `render` function. Warning - This is pretty long:

```js
render() {
  const {
    name,
    likesIceCream,
    prefAnimal,
    notARobot,
    formSubmitted,
    message
  } = this.state;

  return (
    <React.Fragment>
      <form onSubmit={this.handleFormSubmit}>
        <p>
          Your Name: <input value={name} onInput={this.handleTextChange} />
        </p>
        <p>
          Do you like ice cream?{" "}
          <select value={likesIceCream} onChange={this.handleSelect}>
            <option value="" />
            <option value="yes">Yes!</option>
            <option value="no">Nope</option>
          </select>
        </p>
        <p>Do you prefer cats, dogs or giraffes?</p>
        <div>
          Cats
          <input
            type="radio"
            name="prefAnimal"
            value="cats"
            checked={prefAnimal === "cats"}
            onChange={this.handleRadioChange}
          />
        </div>
        <div>
          Dogs
          <input
            type="radio"
            name="prefAnimal"
            value="dogs"
            checked={prefAnimal === "dogs"}
            onChange={this.handleRadioChange}
          />
        </div>
        <div>
          Giraffes
          <input
            type="radio"
            name="prefAnimal"
            value="giraffes"
            checked={prefAnimal === "giraffes"}
            onChange={this.handleRadioChange}
          />
        </div>
        <p>
          I am not a robot{" "}
          <input
            name="notARobot"
            type="checkbox"
            checked={notARobot}
            onChange={this.handleCheckboxChange}
          />
        </p>
        <input type="submit" />
      </form>
      {message ? <p>{message}</p> : ""}
      {formSubmitted ? (
        <p>Thank you, {name}. Your response is recorded.</p>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}
```

At the bottom, you can see, we have a pretty simple `input` of the type "submit". It's important to note that we don't actually put our form submission functionality into this input - that is on the `form` tag itself, using a JSX tag called `onSubmit`. The message and form-submit response is on the bottom.

We also have a new way of packaging our components - `React.Fragment`. `Fragment` is a pretty new React feature that will let us avoid wrapping everything in a `div` tag, which hurts accessibility. While React reads `Fragment` as an acceptable containing tag, it compiles into... nothing at all on the user end. That's right - it's a way for us to include multiple tags in our component's `return` statement. Cheat 'em out, if you will.

The rest of this stuff should be pretty familiar from our earlier projects. Each input updates the state, and our form controls what happens after the user has filled out each input and clicks "submit".

Congratulations, we're now React form experts!
