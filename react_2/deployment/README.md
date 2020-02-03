# Deploying a Full-Stack App using Heroku

## Resources

- [Book-e JSON API](https://github.com/joinpursuit/Pursuit-Core-Web-book-e)
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
- [Stack Overflow question on seeding a Heroku database with a .sql file](https://stackoverflow.com/questions/15237366/how-to-execute-a-sql-script-on-heroku)

# Outline

explain 
* environment variables
* Backend vs cra deployment
  * surge/netlify vs heroku

do
* create heroku app
* create psql database
* set up environment vars
  * port
  * psql connection
  * ??
* seed db



## Introduction

Welcome to the fun, awesome world of deployment. You made stuff that lives in the browser - now we're gonna make it live on the Internet!

A couple things to remember:

- Don't just copy + paste everything. You can copy + paste SOME stuff. But don't copy + paste someone else's username and password, or connection url. Just try to develop a real understanding of what each step is doing.
- Your app is going to break a lot. Either you'll see Heroku-branded errors, or you'll see a blank screen. Don't get upset - expect it and debug it.


## Heroku deployment vs. static deployment

Heroku is a hosting provider that does a lot of work for you. Rather than providing a whole server that you have to configure yourself, it hides all that away and just lets you focus on deploying a standalone app.

Heroku is intended for whole applications, like `node` or `python` or even `ruby` apps. Anything that requires a process or command to run is what heroku specializes in.

Contrast this with front-end technologies, like plain old html, css, and JS. Even react! You should not use heroku for these. There are other platforms that specialize in static file hosting, like [surge](https://surge.sh/) and [netlify](https://www.netlify.com/) that are much more efficient and easy to use.

React though, really? Yes, even react. So far your exposure to react has mostly been using `create-react-app` to host a server. That's great for development, but remember react is just front-end javascript. `create-react-app` does a lot of the work of bundling all the various javascript files together for you, but you don't want to deploy an entire `create-react-app` repository. Instead, check out the documentation for [producing a build bundle](https://create-react-app.dev/docs/production-build). The directory that gets created when you do an `npm run build` is all that needs to get deployed. No `node` required.

## Environment Variables

So far we've just had our applications running locally on our laptop. In order to get them online, we have to make sure they can run on other machines. For example, while running express on our machine we want to connect to a database on `localhost`, which is also on our machine. But on a server, we might want to connect to a database on a completely different server. Instead of writing a bunch of `if` statements in our code, we can just replace the connection string with a variable that comes from **outside** of our application. In this case, a variable that comes from the **environment**. 

When the `node` process starts, node loads all of its environment variables into an object called `process.env`. We can then access them globally using that object. We can also _define_ our own variables using the terminal:

```bash
export CUSTOM_NODE_ENV="test"
```

This gives us:

```js
console.log(process.env.CUSTOM_NODE_ENV)
// "test"
```

This is cool, but kind of useless because we'd have to do that every time before we launch our app (environment variables written and exported in this way only live until you close that terminal).

### More permanent environment variables

A convention many node apps follow is by storing environment variables in a file called `.env` in the root directory of the project.

```plain
CUSTOM_NODE_ENV="test"
DATABASE_URL="postgres://localhost/book-e"
```

We can then use a package called `dotenv` to read the variables locally!
```
npm install dotenv
```

In index.js:
```js
const dotenv = require('dotenv')
dotenv.config()

console.log(process.env.DATABASE_URL)
// "postgres://localhost/book-e"
```

Heroku provides its own environment variables to node applications for us to use. All we have to do is configure our app to use them, which means we make some code changes.

## Step 1: Make a Heroku account and install the Heroku CLI

Alright. First, let's go to [Heroku](https://www.heroku.com/) and sign up for an account. The signup process should be pretty self-explanatory.

Heroku uses Git to manage its projects, so we're going to do a fair amount of stuff in the command line. Therefore, we want to [install](https://devcenter.heroku.com/articles/heroku-cli) the Heroku CLI, which can be done as a download, with Brew, or even (scroll down on that page) with NPM, in a pinch.

Next, close your terminal, open a new terminal window, and type `which heroku`. You should see a directory. That's where your Heroku files are installed.

## Step 2: Edit your Express app

To start, we're all going to deploy a JSON api called [book-e](https://github.com/joinpursuit/Pursuit-Core-Web-book-e). It's already built, but we need to configure it to read some environment variables. Clone it down and `cd` to the directory.

Then, go to your project's root folder in the terminal and throw out a quick:

```
heroku create
```

...And we're on our way.




This simply says 'okay, Express - don't render your Express views here, we want our React app to render instead.' Basically, we're making React and Express work together on a single port.

To that end, we'll make one other change to our `app.js` file. After our backend routing, we place this snippet of code:

```js
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
```

If you're using the `frontend/` and `backend/` folder organization, it'll probably look something like this:

```js
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../frontend/build/index.html"));
});
```

This just makes sure we're never showing Express responses without the window dressing of React. JSON is, perhaps, not the best look for a production app to have. Nor is an error view on Express.

We are pretty close! In Express, all that's left is to set up our `package.json` file. Heroku automatically runs certain scripts if we name them properly. Therefore, there's nothing to do here besides run the proper commands in a particularly named script:

```js
"scripts": {
    "start": "node ./bin/www",
    "heroku-postbuild": "cd client && npm install --only=prod && npm run build"
  }
```

In the other (`frontend/` + `backend/`) configuration, your scripts might look like this:

```js
"scripts": {
    "start": "node ./backend/bin/www",
    "heroku-postbuild": "cd backend && npm install && cd ../frontend && npm install --only=prod && npm run build"
  }
```

...And that should be it! All the edits we need to make to our Express app are done.

Well, besides...

## Step 3: Set up your Postgres database on Heroku

In the terminal, in your project's root folder, type the following:

```
heroku addons:create heroku-postgresql:hobby-dev -a <app-name-on-heroku>
```

This does a couple of things. It:

- Creates a Postgres database in our Heroku account, and
- Sets an environment variable DATABASE_URL that we can use to access our database using pg-promise. Type `heroku config` to see your unique database URL.

Now, there's two ways to structure and seed our database. You can either access the command to open your database in the terminal on database.heroku.com, manually typing in `CREATE` and `INSERT` statements, or you can use a .sql file. We are going to be doing the latter.

First, we have to edit our .sql file very slightly. No longer are we `DROP DATABASE`-ing, nor do we have to `CREATE` one or `\c` into it, because we will already be accessing a database we created from Heroku. Everything afterwards (`DROP/CREATE TABLE`) we can keep.

After making those changes, we type the following into the command line in our `db` folder:

```
cat file.sql | heroku pg:psql
```

Where `file.sql` is our .sql file's name.

Barring any issues, your database should be seeded! There's only one last thing to do. We go to our `queries.js` file and instead of all that `localhost` stuff to reference our database, we write `process.env.DATABASE_URL`. Like so:

```js
var pgp = require("pg-promise")({});
var connectionString = process.env.DATABASE_URL;
var db = pgp(connectionString);
```

...And we are all set!

## Step 4: Deploy that sucker

Would you believe me if I said that the only thing you have to do now is:

```
git add .
git commit -m 'heroku version'
git push heroku master
```

...Because that's it.

Okay, maybe not _quite_ it. If you want to keep your Heroku version in a different branch, now would be the time to make one, commit to it, and instead of `git push heroku master`, write:

```
git push heroku yourbranch:master
```

Barring any issues (and there can be issues!) sit tight for, like, 10 minutes, and after that, you should see your site on Heroku at the URL it gives you!

### Troubleshootin'

Okay, so you've deployed, you've waited ten minutes, but your app broke. Or maybe you assume it broke because you only see a blank screen. Not to worry! Heroku is very particular about syntax - much moreso than localhost - so you should expect a bump in the road here or there.

The main thing to do is to **figure out where the problem is.** Messages telling you about issues in your code can be found in three different places:

- The terminal itself when you `git push` to Heroku. This is pretty easy - it usually gives you an explicit error, a filename, and even a specific line.
- Chrome Developer Tools. This tends to have a lower success rate, but sometimes it can be useful. It's especially useful to know if anything was even sent to the frontend. Look through the HTML and JS for anything familiar.
- Your Heroku backend. Navigate to a project in Heroku, click the upper-right corner where it says "More," and click "View Logs." You should see a verbose description of what, exactly, is going on with your app at any given time.

Don't understand an issue, or can't see what's causing the problem? There are a million and one reasons why a Heroku app might not compile. If it's a weird error message, **Google it!** If it's a generic error message, but you still can't figure out what's wrong, get another set of eyes on your code. Don't bang your head against something for nothing!
