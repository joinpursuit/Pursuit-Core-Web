# Pursuit Core Environment Setup
 Welcome to Pursuit! We can't wait to begin this journey with you. Before we dive right in and begin programming it is 
 important that we first get our machines up to date and setup. Please follow the instructions below so we can all start with the 
 same setup. 

## Chrome 
Here at Access Code the Browser of choice is [Chrome](https://support.google.com/chrome/answer/95346?co=GENIE.Platform%3DDesktop&hl=en). Chrome will be especially useful when we get to frontend debugging. It has wonderful tools that are already built in. 

Here is a list of chrome extensions that I recommend:
* [Video Speed Controller](https://chrome.google.com/webstore/detail/video-speed-controller/nffaoalbilbmmfgbnbgppjihopabppdk?hl=en) 
* [Page Ruler Redux](https://chrome.google.com/webstore/detail/page-ruler-redux/giejhjebcalaheckengmchjekofhhmal?hl=en)
* [uBlock Origin](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm?hl=en)
* [OneTab](https://chrome.google.com/webstore/detail/onetab/chphlpgkkbolifaimnlloiipkdnihall)
* [JSON Viewer](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh?hl=en-US)
* [ColorZilla](https://chrome.google.com/webstore/detail/colorzilla/bhlhnicpbhignbdhedgjhgdocnmhomnp?hl=en)

## Mac OS Installation Instructions

1. Open a terminal window.

2. Enter:

```bash
$ xcode-select --install
```

3. You will see an alert box:

![devtools popup](../assets/xcode_devtools.png)

Click “Install” to download and install Xcode Command Line Tools.

4. Enter:

```bash
$ cd ~
$ mkdir homebrew && curl -L https://github.com/Homebrew/brew/tarball/master | tar xz --strip 1 -C homebrew
```

5. Enter

```bash
$ brew install node
```

6. To check that node is installed, enter:

```bash
$ node -v
```

7. This one is super easy. Go to [atom.io](http://www.atom.io), then download and install Atom.

To verify that the shell commands were installed correctly, run `which atom` in your terminal. If `atom` is not a recognized command, open the Atom editor and go to Atom > Install Shell commands (on Linux, you may have to open the Command Palette using `Ctrl+Shift+P` and search for `Window: Install Shell Commands`). This allows you to easily open files in atom from the Terminal using the `atom` command followed by a file or directory.

Let's install some linters to help us write clean code while working in atom.
Run the following:
```sh
# apm is the 'atom package manager'
apm install linter linter-eslint prettier-atom linter-jscs highlight-selected react
```


8. Drag the downloaded file into your `applications` folder. A pop up will appear - click `authenticate`, then enter the user name and password for your machine.

## Git
Git is a version control system that allows us to track, commit and revert changes to files within a directory. Here we will install it and add global user info.

```sh
# install git
brew install git

# makes git terminal output pretty
git config --global color.ui true

# this will mark you as the 'author' of each committed change
git config --global user.name "your name here"

# use the email associated with your GitHub account
git config --global user.email your_email_here
```

### PostgreSQL
PostgreSQL is a fast, feature-rich, open-source database application. It is a scalable application that we can use for development and production apps. We will be using PostgreSQL for most of our web-apps.

#### MacOS X

Fortunately for MacOS X, we can use [postgres-app](https://postgresapp.com/), which provides the database application and a command line interface (CLI) so we can interact with it. To install Postgres.app, download and follow the installation instructions from the website.


Paste these commands into the terminal:

```sh
sudo mkdir -p /etc/paths.d &&
echo /Applications/Postgres.app/Contents/Versions/latest/bin | sudo tee /etc/paths.d/postgresapp
```

#### Linux

The [Ubuntu wiki][pg-linux] can help. See especially "Alternative Server Setup".

[pg-linux]: https://help.ubuntu.com/community/PostgreSQL

### After installation

Close and reopen your terminal to gain access to the `psql` command. Let's try it out.

```
# open the PostgreSQL CLI
psql

# you should be greeted with a prompt that looks like this
psql (10.X)
Type "help" for help.

yourname=#

# type '/q' to quit
yourname=# \q

```

## Postman 
We will be using Postman to test call to our backend. Download it [here](https://www.getpostman.com/apps).

## PSequel 
Will allow us to try running different SQL calls on a database. Download it [here](http://www.psequel.com/).

## Slack
Is an App that allows us to message and communicate easy. Download it [here](https://slack.com/downloads/osx).
