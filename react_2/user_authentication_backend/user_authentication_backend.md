# Registering Users: Backend

## Resources

- [Passport Docs](http://www.passportjs.org/docs/)
- [Example using pg-promise](https://github.com/crymall/express_fullstack_example)

## The skinny

User registration and authentication is fairly difficult to wrap your head around. Thankfully, **it can stay that way** for now. If you want to do Serious Backend Security Development stuff, you can go super deep into these concepts, but for most of us, we just need to have the **boilerplate available** and know how to use it.

That's not to say this won't be a test of your core JavaScript and Express skills, because it absolutely will be. We just won't be going into the nitty gritty of the precise JavaScript syntax, because there's a lot of stuff we're going to set up to configure authentication that makes more sense to our NPM packages than it does to us.

Let's take a look at the provided example above, starting with the root-level `package.json`:

## More modules

```js
"dependencies": {
  "bcryptjs": "^2.4.3",
  "body-parser": "~1.18.2",
  "cookie-parser": "~1.4.3",
  "debug": "~2.6.9",
  "express": "~4.15.5",
  "express-session": "^1.15.6",
  "jade": "~1.11.0",
  "morgan": "~1.9.0",
  "passport": "^0.4.0",
  "passport-local": "^1.0.0",
  "pg-promise": "^7.3.3",
  "serve-favicon": "~2.4.5",
  "supervisor": "^0.12.0"
}
```

New ones include `bcryptjs`, `express-session`, `passport`, and `passport-local`. The first one, a JavaScript-y extension of bcrypt, provides the functionality to put user passwords through a hashing function and salt them for our database.

The other three are all about user authentication:

- `passport` is the biggest package we're installing. It contains the logic for creating and processing _sessions_. You know when you leave a website, return, and are still logged in? Yep, that's because there's a _session token_ containing part of your unique user information. Passport checks this piece of information against your stored information on the backend. If everything is good, you stay logged in and can fetch your private information from protected endpoints.
  - **Note**: Separate session management will also happen on the frontend. Requiring a session to be utilized at both ends will ensure that your user will never access data that you don't want them to.
- `passport-local` is the specific _strategy_ we're applying to our Passport authentication. There are many different strategies you can employ to manage your sessions. For example, the `passport-google` package lets you authenticate to other sites using your Google login. _Local_ means that we're handling everything in-house - we're managing usernames and passwords, we're giving session tokens, and we're processing registration and authentication.
- `express-session` works with `passport` to help Express recognize and process session tokens. It's a little piece of middleware that we need in order to properly process these objects.

## A new folder: `auth/`

In this folder, we have three files:

```
-helpers.js
-local.js
-passport.js
```

- `helpers.js` is where we use `bcrypt` to create and verify users. We also create a piece of middleware here, `loginRequired`, that makes sure a session token is on our request header. We'll use this in routes that we want a user to be logged in to access.
- `passport.js` is where we set up how passport will _serialize_ and _deserialize_ users.
  - **Serializing** processes a user token into plain text, which is how it can be assigned to our request header. In this case, we're putting our username onto our request header to represent that user's session.
  - **Deserializing** takes a plain text request header, converts it into a JavaScript-readable format, and checks our database to make sure that user actually exists. This accomplishes two things: It lets us process a session token, and it makes sure a hacker isn't throwing together a request header without an actual user account to back it up.
- `local.js` determines whether or not we will, in fact, assign a session token to a user who is logging in - in other words, we make sure to check whether the user exists in the database and whether the provided password is correct.

## A deeper dive into `auth/`

### `helpers.js`

```js
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function createUser(req) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return db.none(
    "INSERT INTO users (username, password_digest) VALUES (${username}, ${password})",
    { username: req.body.username, password: hash }
  );
}
```

We define two functions here - `comparePass`, which (as the name implies) hashes its first (plain) argument and compares it to the second (hashed) argument. We have to hash instead of decrypt because **it is impossible** to decrypt hashes.

The second function does what its name implies - it salts and hashes an inputted password and adds the user to the database.

```js
function loginRequired(req, res, next) {
  if (!req.user) {
    res.status(401).json({ status: "Forbidden - please log in." });
    return;
  }
  next();
}
```

`loginRequired` is a little bit different. It's a piece of middleware that we add to routes to make sure there's a user token in the request. We utilize it in our routing like this (this snippet is from the `users.js` file in the routes folder):

```js
router.post("/logout", loginRequired, db.logoutUser);
```

Because after all, you have to login to log out!

### `passport.js`

This file works in tandem with `local.js` to configure Passport. It adds the logic to `serialize` and `deserialize` the user, which we've described above.

### `local.js`

This file is to configure Passport to verify users in our database.

```js
passport.use(
  new LocalStrategy((username, password, done) => {
    db.one("SELECT * FROM users WHERE username = ${username}", {
      username: username
    })
      .then(user => {
        if (!user) {
          return done(null, false);
        }
        if (!helpers.comparePass(password, user.password_digest)) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      })
      .catch(err => {
        return done(err);
      });
  })
);
```

We use `.use` on our instance of Passport to configure it. Essentially, what we're doing here is defining a set of behaviors that Passport is going to utilize when we add it as middleware to our `app.js` file.

Our frontend provides a username and password in the request body, and this function looks in our database for that user based on username (`db.one`). If the username exists, it then checks to see if the password is correct. If both the username and the password are correct, it returns our user. Otherwise, it returns `false`, which throws an error from Express.

Notice, finally, that we imported our `serializeUser` and `deserializeUser` functions as `init`, and called `init()` at the end to apply these behaviors onto our instance of Passport, too.

## `app.js` - Ensuring that authentication occurs

We add several bits to app.js to ensure that requests to the database are properly authenticated:

```js
const session = require("express-session");
const passport = require("passport");

// other middleware stuff

app.use(
  session({
    secret: "never gonna give u up",
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
```

`session` here is used in two different contexts - `session` by itself represents our instance of `express-session`, whereas `passport.session` is passport's processing of that session token.

**Note:** Our session token stores a hash, too, and hashing functions often require a seed to get started. The `secret` part is that seed, and could be anything. It's not generally best-practice to shove it right in there - when we deploy to production, we'll want to hide it in a similar way that we'd hide our API keys.

## `queries.js` - Creating a user

In `queries.js`, we import some auth files and use them to rewrite our addUser function, creating a function called `createUser`:

```js
function createUser(req, res, next) {
  const hash = authHelpers.createHash(req.body.password);

  db.none(
    "INSERT INTO users (username, password_digest) VALUES (${username}, ${password})",
    { username: req.body.username, password: hash }
  )
    .then(() => {
      res.status(200).json({
        message: "Registration successful."
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    });
}
```

The order here is important:

- First, we use our `authHelpers.createHash` method to process and hash the user's password.
- Then, we add our user to the database.
- Finally, we return a message to indicate that we've successfully registered the user.

Afterwards, our client can send another request to the backend to log our user in. Speaking of:

```js
function loginUser(req, res) {
  res.json(req.user);
}
```

What?? Why don't we have any Passport-specific stuff here? Well, we're handling the Passport stuff in the route as middleware _before it even gets_ to this function. In `routes/users/js`:

```js
router.post("/login", passport.authenticate("local", {}), db.loginUser);
```

This tells passport to use the local strategy we defined in the `local.js` file. Luckily, we have a function `logout` on the request that makes logging out a breeze, even without middleware:

```js
function logoutUser(req, res, next) {
  req.logout();
  res.status(200).send("log out success");
}
```

## Putting it all together

So, when our frontend sends a request to create a user, here's what happens on the backend:

- We accept the username and password from the request body.
- We hash the password and insert the username and password into a new row via a SQL request.
- We send a response indicating that a user was successfully created.

When our user logs into that account, here's what happens:

- Passport steps in and, in partnership with bcrypt, makes sure that the username and password are correct.
- If they are correct, Passport creates (_serializes_) a session token, which is placed on any requests from the client from that user until the user logs out or the session expires.
- The user is now able to access routes protected by `loginRequired` because they have a session token that is _deserialized_ and processed for every new request.

And when they log out:

- Passport makes sure they are logged in - you can't log out if you aren't logged in.
- We remove the session token from their request.

And that's it!
