# Deploying a Full-Stack App using Heroku

## Introduction

Welcome to the fun, awesome world of deployment. You made stuff that lives in the browser - now we're gonna make it live on the Internet!

A couple things to remember:

- Don't just copy + paste stuff. I mean, you can copy + paste SOME stuff. Just try to develop a real understanding of what each step is doing.
- Your app is going to break a lot. Either you'll see Heroku-branded errors, or you'll see a blank screen. Don't get upset - expect it and handle it.
- This guide is made assuming you have one way of organizing your files - that is, it assumes your root folder contains two top-level folders, `frontend` and `backend`. If you have a different folders/files structure you just need change the path in places where we point to the frontend to point to the correct location of your frontend.

## Walkthrough

### Step 1: Make a Heroku account and install the Heroku CLI

Alright. First, let's go to [Heroku](https://www.heroku.com/) and sign up for an account. The signup process should be pretty self-explanatory.

Heroku uses Git to manage its projects, so we're going to do a fair amount of stuff in the command line. Therefore, we want to [install](https://devcenter.heroku.com/articles/heroku-cli) the Heroku CLI, which can be done as a download, with Brew, or even (scroll down on that page) with NPM, in a pinch.

Next, close your terminal, open a new terminal window, and type `which heroku`. You should see a directory. That's where your Heroku files are installed.

Then, go to your project's root folder in the terminal and throw out a quick:

```
heroku create
```

...And we're on our way.

### Step 2: Edit your Express app

Your first task is to edit a few basic elements of your Express backend. Take a look at `app.js`. You know that big chunk of middleware? Where you set up logger and bodyParser? We are going to edit the pathing of that very slightly:

```js
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../frontend/build"))); //If you have diff folder structure think about where this should point to
app.use(express.static(path.join(__dirname, "/public"))); 
```

To that end, we'll make one other change to our `app.js` file. After our backend routing (as our last route), we place this snippet of code:

```js
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});
```

This simply says 'okay, Express - don't render your Express views here, we want our React app to render instead.' Basically, we're making React and Express work as as single app on a single port.

### Step 3: Set up your Postgres database on Heroku

#### Provision a Postgres Database for your Heroku App

In the terminal, in your project's root folder, type the following:

```
heroku addons:create heroku-postgresql:hobby-dev
```

This does a couple of things. It:

- Creates a Postgres database in our Heroku account, and
- Sets an environment variable `DATABASE_URL` that we can use to access our database using `pg-promise`.
 
Type `heroku config` to see your unique database URL. This `DATABASE_URL` will be used by `pg-promise` to connect to your database in Heroku, other than that you are not going to do anything directly with it just see that it exists.

#### Seed your Database on Heroku
First, we have to edit our `.sql` file very slightly. No longer are we `DROP DATABASE`-ing, nor do we have to `CREATE` one or `\c` into our Database, because we will already be accessing a database we created in Heroku.

Instead make sure to comment out or remove those lines and instead place `DROP TABLE IF exists` statements.

```sql
-- DROP DATABASE IF EXISTS my_database_name;
-- CREATE DATABASE my_database_name;
-- \c my_database_name;

DROP TABLE IF exists users;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL
);
...
```

After making those changes, we type the following into the command line in our `db` folder to execute our `.sql` file for the database heroku gave us.

```
heroku pg:psql -f file.sql
```

Where `file.sql` is our .sql file's name.

Barring any issues, your database should be seeded! There's only one last thing to do. We go to our `db.js` file or wherever you instantiated `pg-promise` and make sure that we use `process.env.DATABASE_URL` in the connection string (for when running on Heroku) or our local database for when there's no `DATABASE_URL` in the environment. Like so:

```js
var pgp = require("pg-promise")({});
var connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/my_database_name";
var db = pgp(connectionString);
```

...And we are all set!

### Step 4: Create a `package.json` in the root directory
Before we can deploy we need to create a `package.json` file in the root directory for Heroku to understand, configure and know how to run our app.  We need provide commands for Heroku to install our dependencies for the frontend and backend and instruct it how to run our app.

Making sure you are in the root directory execute:
```
npm init -y
```

This gives you a template `package.json`. Modify it for your project and pay attention to the `scripts` property in it

```json  
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "cd backend && npm start",
    "heroku-prebuild": "cd backendh && npm install && cd ../frontend && npm install && npm run build",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/username/my-app.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/username/my-app/issues"
  },
  "homepage": "https://github.com/username/my-app#readme"
}
```

* The `start` script gives Heroku the command it should run to start our application
* The `heroku-prebuild` script instructs Heroku to install our dependencies for the front- and back-end and to build our frontend. Heroku will execute the `heroku-prebuild` before anything else as soon as we push our app to heroku.

The root directory for your app should have something like the following:
```
- frontend/
- backend/
- package.json
```

### Step 5: Deploy that sucker

Would you believe me if I said that the only thing you have to do now is:

```
git add .
git commit -m 'heroku version'
git push heroku master
```

...Because that's it.

Okay, maybe not _quite_. If you want to keep your Heroku version in a different branch, now would be the time to make one, commit to it, and instead of `git push heroku master`, write:

```
git push heroku yourbranch:master
```

Barring any issues (and there can be issues!) sit tight for, like, 10 minutes, and after that, you should see your site on Heroku at the URL it gives you!. You can copy the url and paste it in the browser or your can execute `heroku open` which will open the browser for you.

## Troubleshooting

Okay, so you've deployed, you've waited ten minutes, but your app broke. Or maybe you assume it broke because you only see a blank screen. Not to worry! Heroku is very particular about syntax - much more so than localhost - so you should expect a bump in the road here or there.

The main thing to do is to **figure out where the problem is.** Messages telling you about issues in your code can be found in three different places:

- The terminal itself when you `git push` to Heroku. This is pretty easy - it usually gives you an explicit error, a filename, and even a specific line.
- Your Heroku logs. 
  - Execute `heroku logs --tail` in the terminal and inspect the output carefully. Looking for error messages.
  - Or on the web portal dashboard.heroku.com, navigate to your project, click the upper-right corner where it says "More," and click "View Logs." You should see a verbose description of what, exactly, is going on with your app at any given time.
- Chrome Developer Tools. This tends to have a lower success rate, but sometimes it can be useful. It's especially useful to know if anything was even sent to the frontend. Look through the HTML and JS for anything familiar.

Don't understand an issue, or can't see what's causing the problem? There are a million and one reasons why a Heroku app might not compile. If it's a weird error message, **Google it!** If it's a generic error message, but you still can't figure out what's wrong, get another set of eyes on your code. Don't bang your head against something for nothing!

### Take a look at the [Deployment Cheatsheet for quick commands](./deployment-cheatsheet.md)

## Resources

- [Fully Deployed Example 1](https://github.com/Pursuit-Core-6-2/deployment-fullstack-example)
- [Fully Deployed Example 2](https://github.com/joinpursuit/react-aws-image-example)
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
- [Deploy React and Express app to Heroku](https://daveceddia.com/deploy-react-express-app-heroku/)
- [Deploy a Postgresql database to Heroku](https://medium.com/@HalahSalih/how-to-deploy-an-express-app-to-heroku-with-postgresql-database-using-git-266e100d59ff)
- [Stack Overflow question on seeding a Heroku database with a .sql file](https://stackoverflow.com/questions/15237366/how-to-execute-a-sql-script-on-heroku)
