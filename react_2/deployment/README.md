# Deploying a Full Stack App

## Resources

- [Book-e JSON API](https://github.com/joinpursuit/Pursuit-Core-Web-book-e)
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
- [Stack Overflow question on seeding a Heroku database with a .sql file](https://stackoverflow.com/questions/15237366/how-to-execute-a-sql-script-on-heroku)
- [Deploy a React App to Netlify](https://www.netlify.com/blog/2016/07/22/deploy-react-apps-in-less-than-30-seconds/)
- [Understanding Heroku Deployments](https://albasfdc.com/2019/03/19/understanding-heroku-git-deployments/)

## Introduction

Welcome to the fun, awesome world of deployment. You made stuff that lives in the browser - now we're gonna make it live on the Internet!

A couple things to remember:

- Don't just copy + paste everything. You can copy + paste SOME stuff. But don't copy + paste someone else's username and password, or connection url. Just try to develop a real understanding of what each step is doing.
- Your app is going to break a lot. Either you'll see Heroku-branded errors, or you'll see a blank screen. Don't get upset - expect it and debug it.

## Heroku deployment vs. static deployment

Heroku is a hosting provider that does a lot of work for you. Rather than providing a whole server that you have to configure yourself, it hides all that away and just lets you focus on deploying a standalone app.

Heroku is intended for whole applications, like `node` or `python` or even `ruby` apps. Anything that requires a process or command to run is what heroku specializes in.

Contrast this with front-end technologies, like plain old HTML, CSS, and JS. Even react! You should not use heroku for these. There are other platforms that specialize in static file hosting, like [surge](https://surge.sh/) and [netlify](https://www.netlify.com/) that are much more efficient and easy to use.

React though, really? Yes, even react. So far your exposure to react has mostly been using `create-react-app` that comes with a webpack server to enable things like hot-reloading. That's great for development, but remember react is just front-end javascript and at the end it will produce just HTML, CSS and JS. `create-react-app` does a lot of the work of bundling all our source code files together for us, but you don't want to deploy an entire `create-react-app` repository to heroku. Instead, check out the documentation for [producing a build bundle](https://create-react-app.dev/docs/production-build). The directory that gets created when you do an `npm run build` is all that needs to get deployed. No `node` required.

## Environment Variables

So far we've just had our applications running locally on our laptop. In order to get them online, we have to make sure they can run on other machines. For example, while running express on our machine we want to connect to a database on `localhost`, which is also on our machine. But on a server, we might want to connect to a database on a completely different server. Instead of writing a bunch of `if` statements in our code, we can just replace the connection string with a variable that comes from **outside** of our application. In this case, a variable that comes from the **environment**. 

When the `node` process starts, node loads all of its environment variables into an object called `process.env`. We can then access them globally using that object. We can also _define_ our own variables using the terminal:

```
export CUSTOM_NODE_ENV="test"
```

This gives us:

```js
console.log(process.env.CUSTOM_NODE_ENV)
// "test"
```

Try it out. In your terminal run the following (skip the dollar sign that is just what my terminal prompt looks like)
```sh
$ export CUSTOM_NODE_ENV="test"  
$ node
> console.log(process.env.CUSTOM_NODE_ENV)
```
Your environment variable then becomes available to your JavaScript code in node through `process.env.CUSTOM_NODE_ENV` 

This is cool, but kind of useless because we'd have to do that every time before we launch our app (environment variables written and exported in this way only live until you close that terminal).

### More permanent environment variables

A convention many node apps follow is by storing environment variables in a file called `.env` in the root directory of the project.

```
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

Heroku provides its own environment variables to node applications for us to use. All we have to do is configure our app to use them, which means we make some code changes. Once we create a database on Heroku the url to connect to it will be available to our backed-end as an environment variable called `DATABASE_URL`. 

## Deploying a Backend to Heroku

### 1) Make a Heroku account and install the Heroku CLI

Alright. First, let's go to [Heroku](https://www.heroku.com/) and sign up for an account. The signup process should be pretty self-explanatory.

Heroku uses Git to manage its projects, so we're going to do a fair amount of stuff in the command line. Therefore, we want to [install](https://devcenter.heroku.com/articles/heroku-cli) the Heroku CLI, which can be done as a download, with Brew, or even (scroll down on that page) with NPM, in a pinch.

Next, close your terminal, open a new terminal window, and type `which heroku`. You should see a directory. That's where your Heroku files are installed and means you can run the `heroku` command.

### 2) Create a Heroku App

To start, we're all going to deploy a JSON api called [book-e](https://github.com/joinpursuit/Pursuit-Core-Web-book-e). It's already built, but we need to configure it to read some environment variables. 

Clone it down and `cd` to the directory.

Then, in the terminal throw out a quick:

```
heroku create <your_app_name>
```

**Things to note**:
* The exact name for your app might not be available. Try adding `-backend` or `-api` at the end or anything else. You can also just skip passing in a name and Heroku will give you a random name like `sleepy-woodland-45930` or `thawing-tundra-21611`.
* Since you are in your project's folder and your folder is already a git repo, this `heroku create` command adds a new `remote` to your repo where you can push your code to heroku when deploying. Run `git remote -v` and verify you have a remote named `heroku` there.

### 3) Set up a Postgres database for our app on Heroku

To create a Postgres database on heroku, in the terminal, type the following:

```
heroku addons:create heroku-postgresql:hobby-dev
```

This does a couple of things:

- Creates a Postgres database in our Heroku account for your app
- Sets an environment variable `DATABASE_URL` that we can use to access our database using pg-promise. Type `heroku config` if you want to inspect your unique database URL.

### Seeding your Database
Seeding our database, which creates the tables and sets up database constrains is done in a similar way to what we do when we want to seed our local database but we will use the `heroku pg:psql` command.

Before we seed our Heroku database, we have to edit our `.sql` file very slightly. No longer are we going to do `DROP DATABASE`, nor do we have to `CREATE DATABASE` or `\c` into it. This is because we will already be accessing a database Heroku created for us. We should keep all the table-related commands. (`DROP/CREATE TABLE`).

After making those changes, to seed a database on heroku run:

```
heroku pg:psql -f db/seed.sql
```

> Note: If you are getting an error that says `Error: Missing required flag: -a, --app APP  app to run command against`
> then you should make sure you're running these commands in the project directory, or include -a <your_app_name_here>.

Barring any issues, your database should exist and have tables! 

### 4) Edit your Express app

#### Connecting to the Database via the Environment Variable
Once a database is created in Heroku the url to connect to it will be available as an environment variable `DATABASE_URL`. We can read it from the environment in our JavaScript code with `process.env.DATABASE_URL`.

Let stop hardcoding our database url and instead read it from the environment our application is running on. When we are developing our application locally we want `DATABASE_URL` to contain our local database url something that looks like this `postgres://localhost:5432/my_db`. 

In our backend root directory lets create a file called `.env` and fill it  with the following
```
DATABASE_URL=postgres://localhost:5432/my_db
```

To load the `.env` file so that our environment variables become available to our code we need the [`dotenv`](https://www.npmjs.com/package/dotenv) npm package.

Let's install `dotenv`:

```
npm install dotenv
```

In our backend `app.js` or `index.js` to actually load the variables put the following right at the top
```js
require('dotenv').config()
``` 

Now, lets go to our `db/db.js` file or wherever you setup `pg-promise` and instead of all that hardcoding our database url, let read it from  `process.env.DATABASE_URL`. Like so:

```js
var pgp = require("pg-promise")();
var connectionString = process.env.DATABASE_URL;
var db = pgp(connectionString);
```

**Important Notes:**
* The `.env` file should never be pushed to GitHub, nor tracked by `git`. Make sure you have a `.gitignore` with a line that includes `.env` 
* Setting up our database url in an environment variable helps us because when we are running our app locally the `dotenv` package will load our variables from the `.env` file. When our app is running in Heroku the database url will be picked up from the `DATABASE_URL` environment variable that Heroku sets up and makes available for us.

...And we are all set!

### Editing the Port

The last thing we need to set is the port that our express server runs on. Because heroku manages the server for us, they also decide what ports get assigned for each application. Imagine running several thousand different express apps on one server! Developers would set their apps to port 3000 or 4000 or some nice round number, and that would cause major problems for heroku.

Instead, heroku assigns ports dynamically using, guess what! An **environment variable**. So we have to tell express to read that variable.

Back in our `index.js` find this line:

```js
const PORT = 8080
```

and change it to:

```js
const PORT = process.env.PORT || 8080
```

Now it'll read the environment variable, or, in case it's undefined, default to port 8080.

We could also put this value into our .env file if you prefer that:

```
PORT=8080
```

Then you can leave off the `|| 8080` above.

Now we're all set! Let's push to heroku.

### 5) Deploy 

To deploy our app to Heroku we just need to push our code to Heroku as if we were pushing to GitHub. Do you remember that when we created a Heroku app that gave us a new `remote`? Well, we just need to push to that remote, `heroku` (Heroku) instead of `origin` (GitHub).

```
git add .
git commit -m 'heroku version'
git push heroku master
```

If you want to keep your Heroku version in a different branch, now would be the time to make one, commit to it, and instead of `git push heroku master`, write:

```
git push heroku yourbranch:master
```

This will push `yourbranch` to the `master` branch on heroku's remote. Note that heroku will only deploy things pushed to its master branch.

Barring any issues (and there can be issues!) sit tight for, like, 5 minutes, and after that, you should see your backend on Heroku at the URL it gives you!

**Congratulations!!** you deployed your Back-end to Heroku!.

### seeding / Final steps

If everything worked, you should be able to hit your heroku URL with postman! Give it a try.

You might find that there isn't any data - that's because we didn't actually seed the database with anything, we just created the tables.

Luckily we have a seed file here in our repo, and we can tell heroku to run it.

```bash
heroku run node db/seed.js
```

`heroku run` is a command that tells heroku to execute a shell command on the remote server. So to seed locally we'd run `node db/seed.js`. To run it remotely, just prefix with `heroku run`. Beautiful!

### Troubleshooting

Okay, so you've deployed, you've waited five or ten minutes, but your app broke. Or maybe you assume it broke because you only see a blank screen. Not to worry! Heroku is very particular about syntax - much more so than localhost - so you should expect a bump in the road here or there.

The main thing to do is to **figure out where the problem is.** Messages telling you about issues in your code can be found in two different places:

- The terminal itself when you `git push` to Heroku. This is pretty easy - it usually gives you an explicit error, a filename, and even a specific line.
- Your Heroku backend. Navigate to a project on heroku.com, click the upper-right corner where it says "More," and click "View Logs." You should see a verbose description of what, exactly, is going on with your app at any given time. You can also access this with `heroku logs -a <your_app_name>`.
  - If you want a live feed of the logs, you can do `heroku logs --tail`. This is useful for watching a build or deploy process.

Don't understand an issue?, **Google it!** If it's a generic error message, but you still can't figure out what's wrong, get another set of eyes on your code. Don't bang your head against something for nothing!

## Deploying a React App (Frontend) to Netlify

Netlify is a service that make it painless to deploy static websites. It's much easier to work with, and supports a lot of predefined projects, like create-react-app.

### Signup for a Netlify Account
Go to https://app.netlify.com/signup and sign up for an account using your GitHub account.

### Install `netlify-cli`
Once you have an account and are logged in. Lets install `netlify-cli` globally

```
npm install -g netlify-cli
```
This will gives the `netlify` command that we will use to deploy our app.

### Lets bundle/compile our React App
```
npm run build
```

This will take some time. This command will compile our App into a few files and put them in a folder called `build/`
Our compiled app has all the code we wrote for our app but it is often uglified/minified to save space and protect our code of being inspected. 
Once building its is done we can inspect the build folder.

### Login in netlify with `netlify-cli`
```
netlify login
```

### Deploy

While in your front-end folder:

```
netlify deploy
```

Follow the prompts in the terminal. This will take some time but by the end your app should be deployed.

### Alternatives step by steps
* To deploy though the Netlify Website follow [this tutorial](https://dev.to/easybuoy/deploying-react-app-from-github-to-netlify-3a9j)
