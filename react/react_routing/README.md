# React Routing with React Router

## Objectives

- Explain what client-side routing does and why its useful
- Use React Router to add Routing to a simple app with a code-along

# Introduction

React allows us to build UI (User Interfaces) for web sites with components. Front-end frameworks like React are known as SPAs (Single Page Applications) and so far, that's what we've been building - single pages with a lot of functionality. One thing you may have noticed as we've been building React Apps is that we can't use the URL or forward/back buttons in the browser. So if we wanted to have an `about` page and a `main` page, we can only use conditional rendering, and if we wanted to send someone a link to the `about` page, we can't. We'd have to send them to the main page and then tell them to click to the `about` page.

We can add a library called [React Router DOM](https://reactrouter.com/docs/en/v6) that will allow us to bring in the functionality of a multi-page application to our React apps. Using a library like React Router will allow us to do clint-side routing.

**Caveat:** React Router has gone through some major changes with their different versions. This lesson is on Version 6. When you are googling/looking things up on Stack Overflow, make sure you are looking at things that have to do with Version 6. The old syntax and some of the old solutions don't work with the new version. If you have familiarity with Version 5, you can [go here](https://github.com/joinpursuit/react-router-v5-to-v6) to see a quick summary of most of the changes that would impact the kinds of builds we are making in this class.

## Routing Patterns

Now that we are going to be creating mutliple views, how are we going to organize them?

If we go to a website we may notice some patterns. We usually have some static pages (pages that don't render data/tend not to change much over time), like a welcome page, about, contact, terms of use etc. Then we have dynamic pages that change based on the data provided.

Let's think about GitHub. If you start on the welcome/landing/home page (all these terms are generally interchangable and refer to the same kind of page, typically at the root URL of the website) - https://github.com

If you are logged in you can easily go to your profile page by clicking on your profile on the upper right and choose `your repositories`). This will show you a list of your repositories, this view is usually considered to be an `index` view. (If you are not logged in, please log in).

If you click on any of your repositories the URL will now be https://github.com/username/one-repo (or similar) - this now shows your one repository, but now also shows a new index of the files within this repo.

If you click on a file in this repo the URL will be https://github.com/username/one-repo/a-file (or similar), this shows the one file (show view)

If you scroll to the bottom there is a footer with more links, a lot are static pages like `About`. Look at the URL for the `about` page. Do you notice a pattern here?

If you click on other links in the footer, some will take you to another website. GitHub has chosen to separate things like documentation to a different URL.

The more you click around and look at the URLs and analyze the different views, you see that it can get complex really quickly.

When we build our React apps now, we'll have to be thoughtful about how we create our routes. We want to create a reusable and easy to understand pattern.

Let's stick with the following patterns:

- Home page, always found at `/`
- Static pages, descriptive like `/about`, `/contact` that are easy to understand what they link to.
- Index pages, they will be plural and descriptive based on what they are showing:
  - `/shoes`
  - `/cars`
  - `/blog-posts`
- Show pages will be `nested` from their `index` page and have a unique identifier. GitHub used repository and file names, but another common pattern is to use `id`s. An `id` is a unique identifying number or string for some data (a user, a product, etc.). Ids are used to be able to look up a specific piece of data, even if the data changes. For example someone's email may change, so it could be a problem to choose that as a unique identifier. Names, phone numbers and addresses also may not be unique. If you think about cars, there are many cars that have the same model, color and year, but all have their own unique id (VIN number). Some examples of show pages:
- `/shoes/1234`
- `/cars/sedans/2022/hLm88324`

## Resources

- [React Router - Official Website](https://reactrouter.com/docs/en/v6)
- [React Router - github](https://github.com/ReactTraining/react-router)
- [Composition vs Inheritance - React Docs](https://reactjs.org/docs/composition-vs-inheritance.html)
