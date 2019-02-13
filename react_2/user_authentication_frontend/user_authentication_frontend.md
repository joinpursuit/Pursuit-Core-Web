# User Authentication: Frontend

- [Same Example](https://github.com/crymall/express_fullstack_example)

Okay, so we've done authentication on the backend, which should prevent our users from fetching data that they aren't authorized to fetch. However, we still don't have a way (currently) to prevent users from accessing routes on the frontend.

That's about to change.

Frontend authentication is a little bit tricky. Not because it's super complex in and of itself, but because we'd like to ensure _consistency_ between login statuses on the frontend and backend. When our user logs in, we'd like to create a session on both the frontend and the backend every time. When they log out, we'd like to end **both** of those sessions.

## A client for our clientele

Let's see this in practice. This app handles user login and registration. It also renders all registered users - but **only** if a user is logged in. Taking a look at the `client/src/` directory, we can see the following files and folders:

- `login/` - Contains login form components.
  - `AuthForm.js` - Perhaps better referred to as `FormContainer`. Contains the functionality for interfacing with user authentication methods.
  - `Form.js` - Contains the presentational logic for both our register and login forms.
- `users/` - Contains protected user component.
  - `Users.js` - This is a very simple functional component. However, it can **only** be accessed if a user is logged in.
- `utils/` - Contains login utilities.
  - `Auth.js` - Contains functions to login, logout, and check the login status of a user.
  - `AuthRouting.js` - Contains a function that replaces `Route` in the situations where we'd like to ensure a user is logged in.
- `App.js`
- `index.js`

The frontend authentication of this app prevents our user from seeing the "All Users" page (on the `/users` route) unless they are logged in. Let's see how it does that.

### `utils/`

Let's take a look at the functions making this whole app tick, starting with `Auth.js`:

```js
const Auth = {
  authenticateUser: token => {
    sessionStorage.setItem("token", token);
  },
  isUserAuthenticated: () => {
    return sessionStorage.getItem("token") !== null;
  },
  deauthenticateUser: () => {
    sessionStorage.removeItem("token");
  },
  getToken: () => {
    return sessionStorage.getItem("token");
  }
};

export default Auth;
```

Auth is an object with several methods, all of them referring to or affecting something called `sessionStorage`. Huh! But we aren't getting `sessionStorage` _from_ anywhere, it seems. No imports, no variables, nowhere.

This is because `sessionStorage` is a built-in functionality that our browsers make available to us. We can use methods to set, retrieve, and remove items from our session storage object as we need them.

What we're doing with the arguments of `setItem`, then, is actually defining key-value pairs for the `sessionStorage` object. `removeItem` and `getItem` only have one argument, because we just need the key that we want to remove or retrieve the value for.

We use these methods all over the place, starting with `AuthRouting`, where we define a function called `PrivateRoute`:

```js
import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./Auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isUserAuthenticated() ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: "/auth/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
```

`PrivateRoute`, as you can see, accepts a component and a bunch of properties, just like `Route` does. It assembles a `render` function that uses one of our `Auth` methods, `isUserAuthenticated`, to make sure the user is logged in. If they are, it renders the component they want. If they aren't, it redirects them to the login page. Pretty cool, huh?

### Components part 1: `App.js`

```js
import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import Users from "./users/Users";
import AuthForm from "./login/AuthForm";
import Auth from "./utils/Auth";
import PrivateRoute from "./utils/AuthRouting";

class App extends Component {
  state = {
    isLoggedIn: false,
    user: ""
  };

  componentDidMount() {
    // check if user is logged in on refresh
    this.checkAuthenticateStatus();
  }

  checkAuthenticateStatus = () => {
    this.setState({
      isLoggedIn: Auth.isUserAuthenticated(),
      username: Auth.getToken()
    });
  };

  logoutUser = () => {
    axios
      .post("/users/logout")
      .then(() => {
        Auth.deauthenticateUser();
      })
      .then(() => {
        this.checkAuthenticateStatus();
      });
  };

  // ...
}

export default App;
```

Let's look at the functions that we've defined on our `App` component. There's no Redux here, by the way - right now, we're handling everything with good old React state.

So. What are these functions doing? Well, `logoutUser` is pretty clear about what it's trying to do. We define it in our `App` component because we're rendering our logout button here.

`logoutUser` has an interesting flow. First, it logs out our user on the backend via an Axios request to the route `/users/logout`. Then, it removes our session from our session storage by way of `Auth.deauthenticateUser`. Finally, it asks the component to check to see whether the user exists in our session storage, updating the React state to reflect our new logged-out status. It handles every aspect of logging out, step by step, from the backend all the way to presentation.

Although the login function is not included in this component, rest assured it'll follow a similar pattern.

Let's see what our app is rendering:

```js
render() {
  const { isLoggedIn, username } = this.state;
  let greeting = isLoggedIn ? (
    <span>
      Welcome {username} {" ~ "}
    </span>
  ) : null;
  let logoutButton = isLoggedIn ? (
    <span>
      <button onClick={this.logoutUser}>Logout</button> {" ~ "}
    </span>
  ) : null;

  return (
    <div>
      <nav>
        {greeting} {logoutButton}
        <Link to="/auth/register">Register</Link> {" ~ "}
        <Link to="/auth/login">Log In</Link> {" ~ "}
        <Link to="/users">All Users</Link>
      </nav>

      <Switch>
        <Route
          path="/auth"
          render={() => {
            return (
              <AuthForm
                checkAuthenticateStatus={this.checkAuthenticateStatus}
                isLoggedIn={isLoggedIn}
              />
            );
          }}
        />
        <PrivateRoute path="/users" component={Users} />
      </Switch>
    </div>
  );
}
```

Note that a lot of stuff here is just because we don't have a `Navbar` class. We render a greeting and a logout button conditionally depending on whether or not a user is logged in.

Underneath our navbar is where the really interesting stuff happens. Notice we have a `PrivateRoute` pointing to our `Users` component.
