# Later in the Course

- Chrome browser extensions - Adds extra features to Chrome
- [Postman](https://www.postman.com/downloads/) - Allows you to make http requests in order to test the servers you are building
- [postgreSQL](https://postgresapp.com/) - A SQL database, which you will learn to use and incorporate into your back-end applications (it's ok if you don't know what this means, you'll learn about it later).

### Chrome Extensions

Each one can be installed by just opening the links below then clicking **Add to Chrome**:

Required:

- [JSON Viewer](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh?hl=en-US)

These are useful, but not required:

- [ColorZilla](https://chrome.google.com/webstore/detail/colorzilla/bhlhnicpbhignbdhedgjhgdocnmhomnp?hl=en) - let's you get the color codes from colors in your browser.
- [Wappalyzer](https://chrome.google.com/webstore/detail/wappalyzer/gppongmhjkpfnbhagpmjfkannfbllamg) - Lets you see the different tech stacks used on different web sites
- [OneTab](https://chrome.google.com/webstore/detail/onetab/chphlpgkkbolifaimnlloiipkdnihall) - Reduces memory usage of having many tabs open

### Postman

Download the app. You don't need to sign up or sign in to use this app. However, the `skip` sign up/log in button can be hard to find!

Be sure to move into the `Applications` folder if prompted.

### PostgreSQL

PostgreSQL is a fast, feature-rich, open-source database application. It is a scalable application that we can use for development and production apps. We will be using PostgreSQL for most of our web-apps.

Fortunately for MacOS X, we can use [postgres-app](https://postgresapp.com/), which provides the database application and a command line interface (CLI) so we can interact with it. To install Postgres.app, download and follow the installation instructions from the website.

Open the app and choose `initialize`

Then, paste this command into the terminal. Note: it's all one line.

```sh
sudo mkdir -p /etc/paths.d &&
echo /Applications/Postgres.app/Contents/Versions/latest/bin | sudo tee /etc/paths.d/postgresapp
```

Close and reopen the terminal tab to gain access to the `psql` command. Let's try it out.

```
# open the PostgreSQL CLI
$ psql

# you should be greeted with a prompt that looks like this
psql (12.X)
Type "help" for help.

yourname=#

# type '\q' to quit
yourname=# \q
```
