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

![devtools popup](./assets/xcode_devtools.png)

Click “Install” to download and install Xcode Command Line Tools.

4. Enter:

```bash
$ cd ~
$ mkdir homebrew && curl -L https://github.com/Homebrew/brew/tarball/master | tar xz --strip 1 -C homebrew
```

```bash 
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

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

### PSequel
Will allow us to try running different SQL calls on a database. Download it [here](http://www.psequel.com/).

### Postman
We will be using Postman to test call to our backend. Download it [here](https://www.getpostman.com/apps).

### Slack
Is an App that allows us to message and communicate easy. Download it [here](https://slack.com/downloads/osx).

## Linux Setup

Okay, so this is similar to Mac, in that you're going to be using the terminal a lot to install this stuff. In fact, you're probably going to be using the terminal more.

Please refer to the OSX installation instructions for a detailed description of what this software is and what it does. After we get this stuff installed, it should work similarly to your Mac-toting peers.

### [Installing Node](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)

Head to your terminal and type (one line at a time, making sure to press enter in between lines):

```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -

sudo apt-get install -y nodejs
```

Then, **close and reopen your terminal** and write:

```
node -v
```

If you don't see anything, let us know.

### [Installing Atom](https://flight-manual.atom.io/getting-started/sections/installing-atom/#platform-linux)

In your terminal, go ahead and type (again, one line at a time):

```
curl -sL https://packagecloud.io/AtomEditor/atom/gpgkey | sudo apt-key add -

sudo sh -c 'echo "deb [arch=amd64] https://packagecloud.io/AtomEditor/atom/any/ any main" > /etc/apt/sources.list.d/atom.list'

sudo apt-get update
```

Then, type:

```
sudo apt-get install atom
```

And you're all set.

### [Installing Git](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-18-04-quickstart)

Alright, Git is pretty simple. First type:

```
sudo apt install git
```

After you press "Enter", **close and reopen your terminal** and make sure you've got the installation right by checking the Git version you have installed:

```
git -v
```

If something comes up, you're good.

Once we have Git installed, we want to make the color output pretty, and we're going to want to set it up with a username and password. Use your GitHub username and password here!

```
git config --global color.ui true
git config --global user.name "Your Name"
git config --global user.email "youremail@domain.com"
```

### [Installing Postgres](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04)

So, this is a little bit more painful than it is on Mac. We'll cross this bridge when we get here, but essentially, you have to verify yourself as a user when installing Postgres on Linux - by default, it creates a user named `postgres`, which you can use, but which you may have trouble using to interface with your apps.

For now, however, let's just install Postgres:

```
sudo apt update
sudo apt install postgresql postgresql-contrib
```

And a graphical viewer for Postgres, PGAdmin 3:

```
sudo apt install pgadmin3
```

The link in the title here provides pretty detailed instructions on how to set up a user that isn't `postgres`. The [Ubuntu wiki](https://help.ubuntu.com/community/PostgreSQL) can also help. See especially "Alternative Server Setup".

### Postman
We will be using Postman to test call to our backend. Download it [here](https://www.getpostman.com/apps).

### Slack
Is an App that allows us to message and communicate easy. Read the instructions and download it [here](https://get.slack.help/hc/en-us/articles/212924728-Slack-for-Linux-beta-).
