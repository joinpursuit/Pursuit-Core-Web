
[![Pursuit Logo](https://avatars1.githubusercontent.com/u/5825944?s=200&v=4)](https://pursuit.org)


# Authentication w/Firebase, React & Express

Using Google Firebase to manage users & authentication for your app!

### Learning Objectives

- Integrating a third-party service into a react & express app
- Building routes that are protected to only authenticated users
- Understanding authentication flow

### Standards

- TBD

### Prerequisites

- React
- Express

---

## Framing & Background

For most web applications, we need some way to verify a user's identity. Think about something like twitter - all tweets come from users, and twitter knows who the users are because it required them to sign up with a unique ID (usually email).

Since authentication & verification are fairly complex to implement ourselves, we can use third party services to do most of the heavy lifting for us. Firebase manages all aspects of authentication, from creating accounts, to logging in, to controlling sessions, and even logging out. All we have to do is hook firebase into our app in the right places.

## App Setup

We'll be working off [this app](https://github.com/joinpursuit/FSW-Firebase-Auth-React-Express) so clone it down and follow the setup instructions.

## Firebase setup (frontend)

Before we start using this app, we have to create a firebase account and configure the frontend to use the API keys associated with that account.

Currently this app has some API keys already committed to the frontend. This is not ideal. You never want to commit private API keys to git.

Additionally, in a real environment, we would configure firebase to only allow requests from specific domains or IP addresses. Right now, we are only testing locally so this is not required.

We'll use a package called `dotenv` to include our API keys in a secure way instead. It's actually already built in to `create-react-app` so we don't have to install anything!

### Security first

* create an empty file called `.env` in `/frontend`
* add `.env` to your `.gitignore` file so it doesn't get committed

`dotenv` reads the contents of `.env` when the application starts. Then it puts those values into a global variable we can access called `process.env`. 

Here's the rough outline of what we need to do to get the rest of the project setup:

* Create a firebase account (use your pursuit email) at `firebase.google.com`.
* Create a new project. Give it whatever name you like.
  * You don't need to enable google analytics but you can just leave it checked. Accept all terms and conditions.
* Once the project is created (it takes about 30 seconds), click continue.
* Click the `</>` icon to create a new firebase web app. Give it whatever name you like. 
  * **DO NOT** set up firebase hosting
* Configure your frontend to use the new firebase auth keys
  * You'll see a bunch of configuration code - copy paste only the `config` object into `.env`. Then rewrite the config to match this format:

```
REACT_APP_APIKEY="982342lkjsdfksdh23SDhfsnk-CX8E"
REACT_APP_AUTHDOMAIN="whatever.firebaseapp.com"
REACT_APP_DATABASEURL="https://something.firebaseio.com"
REACT_APP_PROJECTID="whatever-auth"
REACT_APP_STORAGEBUCKET="pursuit-whatever.appspot.com"
REACT_APP_MESSAGINGSENDERID="3245322"
REACT_APP_APPID="xxxx:xxx:Xxxxx:Xxxxx"
```

For each key in the object, uppercase it and prefix it with `REACT_APP_`. Otherwise it will be ignored by create-react-app. Also change the `:` to `=` and get rid of the comma at the end of the line. 

Basically, what was this line:

```js
apiKey: "982342lkjsdfksdh23SDhfsnk-CX8E",
```

Becomes this line:

```
REACT_APP_APIKEY="982342lkjsdfksdh23SDhfsnk-CX8E"
```

  * Click `continue to console` when done copy-pasting and rewriting.
* Setup email/password authentication 
  * Scroll down and click the `authentication` card
  * Click the `sign-in method` tab
  * Click `Email/Password` and enable just the first checkbox. If you click both, firebase will email every user that signs up and require them to verify their account, so skip that for now because it makes testing with fake emails harder.
  * Click Save

Now that we've enabled everything, we also need to tell our app to use the new keys in `.env` instead of the ones in `firebase.js`.

```js
// /frontend/firebase.js
import app from "firebase/app"
import "firebase/auth"

// destructure all the values from process.env
const {
  REACT_APP_APIKEY,
  REACT_APP_AUTHDOMAIN,
  REACT_APP_DATABASEURL,
  REACT_APP_PROJECTID,
  REACT_APP_STORAGEBUCKET,
  REACT_APP_MESSAGINGSENDERID,
  REACT_APP_APPID,
} = process.env

// pass them into the config object for firebase instead of hardcoding
const config = {
  apiKey : REACT_APP_APIKEY,
  authDomain: REACT_APP_AUTHDOMAIN,
  databaseURL: REACT_APP_DATABASEURL,
  projectId: REACT_APP_PROJECTID,
  storageBucket: REACT_APP_STORAGEBUCKET,
  messagingSenderId: REACT_APP_MESSAGINGSENDERID,
  appId: REACT_APP_APPID,
}

// initialize firebase just like before
app.initializeApp(config)

// export it for use in components
export default app
```

This rewriting is a little tedious, but now we don't have to worry about our API keys being stolen.

Okay! That should be all we need to do to get our frontend working. The backend is a separate process that we'll get to later.

Now run `npm start` in the frontend to fire it up.

## Frontend overview

Open up the project in your code editor while the app is running in your browser. You can sign up, log in, log out, try all kinds of things. Everything should work except clicking the buttons in `Home`.

Spend 10-15 minutes looking through the frontend, and pay attention to a couple things:

* `firebase.js` is located in the root of the frontend. Where is it being used?
* The `Signup` and `Login` containers are written differently on purpose so you can compare how you might do something in a component class using lifecycle methods (`Signup`), versus using hooks in a functional component (`Login`). What are the differences? 
* Where is the code thats actually accomplishing the authentication? Can you figure out what it does?

### Signup Explained

Here's how the authentication flow actually works.

When a user clicks sign up in the navbar, the url changes and the `Signup` component gets mounted. 

On mount, the `componentDidMount` lifecycle hook gets fired (similar to `useEffect`). This sets up an event listener to the firebase authentication function called `onAuthStateChanged`.

Once a user types in their email and password into the form, it fires `handleSubmit` which runs the firebase function `createUserWithEmailAndPassword` and passes those two things in. All we do is console log the response, we don't actually need it. 

If there's an error, set the state with the error message, which renders a warning on the page.

If the user account gets created successfully, firebase runs the `onAuthStateChanged` function again (it's an event listener!), which now contains a `user` object. This redirects us back to the homepage.

The redirect means that the `Signup` component gets unmounted, and we call `unsubscribe()` to stop listening for events. 

> Any accounts you create can be viewed in the firebase console! Go to Develop -> Authentication -> Users tab to see

### Login Practice

Using this knowledge, pair up with someone and spend 10 minutes on the following exercise:

* Go through `Login.js` line by line and comment what each line is doing, starting at the very top.
* When finished, compare it with `Signup.js` and see if you can understand the similarities and differences.

### Rewrite the Signup component (30 min)

To gain a better understanding of how firebase's signup process works, rewrite the component to use hooks instead. 

You'll have to do a few things here:

* Manage the state from the form inputs
* Handle the form submission
* Redirect if the firebase signup works sucessfully 
* Display errors if something goes wrong 
* unsubscribe from the listener on unmount

## Backend authentication

So far, we have gone over firebase on the frontend, which is where most of the heavy lifting comes in. Users can sign up and create accounts, log in, and log out. This is great, but we also want a way to verify who's sending requests to our back end. Currently, anyone could make a request to our backend and we wouldn't know who is who.

In this case, we will use a `token` that's generated by firebase to validate that the user who's sending requests exists in the database.

We'll create an express `middleware` function to validate the token on a route that we want to protect from anyone who isn't authorized.

### Backend overview

This backend is using express, but a super simplified version of it.

The entire backend is contained in just one file - `/backend/index.js`, plus one config file next to it - `firebase.js`.

In this express app, we've got three routes: `/anonymous`, `/protected` and `/unprotected`. Take a look at what each one does, and especially at the `/protected` method. 

Here's what happens on the protected route:

* A post request comes in and hits `checkFirebaseToken()`, which is defined outside the route.
* It calls `admin.auth().verifyIdToken()`, which is the firebase function to validate the token is legit. 
* The ID token is passed in the request body from the frontend, and through to `verifyIdToken()`.
* If the token matches, the promise resolves and `next()` is called in the middleware, which forwards the request through to the final middleware.
* If it doesn't match, then the promise rejects, and we send back an error.

Most of the work here is coming from the `verifyIdToken` function. It's just one function from the firebase admin package.

Let's look at how the token gets passed from the frontend.

### Token passing

In `/frontend/src/Home.js`, there's a method called `getFirebaseIdToken` that gets called when the component mounts. It makes a request to firebase and sets the state with the token that gets returned.

Now, whenever the user clicks the `Protected API` button, it fires the `handleProtectedAPI` function which makes a request to the backend protected route, and passes the token along in the body.

### Backend setup

So all of this should work once we authorize our backend with firebase. In order to do that, we have to create a `service account`, which is an administrator account that lets our backend talk to firebase.

Because this is an administrator account, it is **extremely** important to keep it secure. You should **never**:

* commit this key to git
* use this key on the frontend of your application in any form whatsoever

Anyone who has access to this key has access to your firebase account, so keep it frosty.

To set up your service account:

* Go to the [firebase console](https://console.firebase.google.com/)
* Click the gear next to `Project Overview` and click `Project Settings`
* Go to the `Service Accounts` tab and generate a new private key
* Download the private key to your computer
* Copy it to the `/backend` directory and name it `firebase_key.json`
* Change the `databaseURL` string in the `admin.initializeApp` config object to the one in the admin sdk example code

That should be all you have to do! The `firebase_key.json` is already in `.gitignore` so it won't be committed acidentally.

Now go ahead and test the protected route when you're logged in. You should see some very sensitive data in the console.

### Resources

- [Simplify forms with react hooks](https://dev.to/stanleyjovel/simplify-controlled-components-with-react-hooks-23nn)
- [firebase web documentation](https://firebase.google.com/docs/web/setup)
- [firebase admin documentation](https://firebase.google.com/docs/admin/setup)
