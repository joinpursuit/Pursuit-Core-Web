# Pursuit Core Environment Setup

Welcome to Pursuit! We can't wait to begin this journey with you. Before we dive right in and begin programming it is important that we first get our machines up to date and setup. Please follow the instructions below so we can all start with the same setup.

## Objective

* Install all the necessary software to get your computer ready for writing code!

## List of things we're installing

* Google Chrome
  * Plus several browser extensions
* iTerm2
* oh-my-zsh
* Visual Studio Code
  * Plus some recommended plugins
* Homebrew
  * Includes `git`
* Node.js
* postgreSQL
* PSequel
* Insomnia
* Slack

## Installation Instructions!

Read through the instructions below in order, and install each item. Some will take awhile (homebrew especially) so you can move on while they're running.

> Note: You can open any program by searching for it with `spotlight`. Click the magnifying class in the top right of your taskbar, or type `command + space`. Once it's open you can type the name of the program you're looking for, then hit `enter` to open it.

### Chrome

Here at Pursuit the browser of choice is [Chrome](https://support.google.com/chrome/answer/95346?co=GENIE.Platform%3DDesktop&hl=en). Chrome will be especially useful when we get to frontend debugging.

Here is a list of chrome extensions that we recommend. Each one can be installed by just opening the links below then clicking **Add to Chrome**:

- [JSON Viewer](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh?hl=en-US)
- [React Devtools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [uBlock Origin](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm?hl=en)

These are useful but not required:
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- [OctoTree](https://www.octotree.io)
- [Video Speed Controller](https://chrome.google.com/webstore/detail/video-speed-controller/nffaoalbilbmmfgbnbgppjihopabppdk?hl=en)
- [Page Ruler Redux](https://chrome.google.com/webstore/detail/page-ruler-redux/giejhjebcalaheckengmchjekofhhmal?hl=en)
- [OneTab](https://chrome.google.com/webstore/detail/onetab/chphlpgkkbolifaimnlloiipkdnihall)
- [ColorZilla](https://chrome.google.com/webstore/detail/colorzilla/bhlhnicpbhignbdhedgjhgdocnmhomnp?hl=en)
- [Wappalyzer](https://chrome.google.com/webstore/detail/wappalyzer/gppongmhjkpfnbhagpmjfkannfbllamg)

### iTerm2

iTerm is a much better terminal than the one built-in. We'll install it and a new shell called ZSH which provides better color highlighting and tab completion.

Download the latest stable release here:

https://iterm2.com/downloads.html

### Homebrew

Homebrew is a package manager for macOS. This means we can use it to install other software from the terminal!

Go to https://brew.sh and paste the install command into your terminal.

> If you get a prompt asking for your password, type it in.

At some point you will see an **alert box** (though the exact message may be different):

![devtools popup](./assets/xcode_devtools.png)

Click `Install` to download and install Xcode command line tools.

> Note: this may take a very long time!

After this process finishes, follow the remaining setup instructions that are displayed in the terminal if there are any.

**ZSH**

Once iTerm is installed, open it using spotlight, and then follow the directions below to install ZSH. You can paste the ZSH install command into iTerm by typing `command+v`.

https://ohmyz.sh#install

> Note: Anytime you see a command that starts with a `$`, ignore that symbol. The `$` indicates you're typing a command into the terminal, but it is not part of the command itself, and including it prevents the desired command from running.

Once ZSH is installed, completely close out of iTerm (`command + Q`) and reopen it.

### Node.js

Node is JavaScript! But running on your computer, instead of inside a browser.

We'll install the latest version using homebrew.

```bash
$ brew install node
```

If your Homebrew installation was successful, you should see a bunch of output indicating that node is being installed.

To verify it works, type:

```bash
$ node -v
```

You should see your Node installation's version number.

### Visual Studio Code

Go to [Visual Studio](https://code.visualstudio.com/) - AKA VSCode, and ***download button and install Visual Studio Code***

This will download a .zip file, double click it. A window will open up a warning window, click accept.

The Visual Studio icon will appear on the directory you downloaded it next to the .zip file. Drag this icon to your `Applications` folder, which is on the left side of your Finder window.

Launch VSCode, and press `command + shift + P` (⌘⇧P), this will open up a prompt, type 'shell command'. The option to download 'Shell Command: Install 'code' command in PATH' will open up. Click on it and it will download it for you. This will enable you to type `code <name of file>` on your command line and open through your command line.

You can browse and install extensions from within VS Code. Bring up the Extensions view by clicking on the Extensions icon in the Activity Bar on the left side of VS Code or the View: Extensions command `command + shift + X` (⌘⇧X).

We recommend installing the below extensions. You can do this now or at any time later:

- [Visual Studio Live Share](https://visualstudio.microsoft.com/services/live-share/): real-time collaborative development.

- [Prettier - Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode): VS Code package to format your JavaScript / TypeScript / CSS using Prettier.

- [Settings sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync): Synchronize Settings, Snippets, Themes, File Icons, Launch, Keybindings, Workspaces and Extensions Across Multiple Machines Using GitHub Gist.

- [CSS Peek](https://marketplace.visualstudio.com/items?itemName=pranaygp.vscode-css-peek): Allow peeking to css ID and class strings as definitions from html files to respective CSS.

- [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)

VS Code provides a rich and easy keyboard shortcuts, you can find a list on this [PDF](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf). This list can be found by using the shortcut ⇧⌘P and typing shortcut.

### Git

Git is a version control system that allows us to track, commit and revert changes to files within a directory. 

When we installed homebrew, it should have installed `git`. To verify, type: 

```
$ git --version
```

You should see the version output something like this:

```
git version 2.24.3 (Apple Git-128)
```

**IF GIT IS NOT INSTALLED**

```sh
# install git only if it is not installed already
$ brew install git
```

Either way, you can now configure git to have your personal info.

```
# makes git terminal output pretty
$ git config --global color.ui true

# this will mark you as the 'author' of each committed change
# use your first and last name
$ git config --global user.name "your name here"

# use the email associated with your GitHub account
$ git config --global user.email your_email_here

# use vscode as default editor 
$ git config --global core.editor "code --wait"
```

### PostgreSQL

PostgreSQL is a fast, feature-rich, open-source database application. It is a scalable application that we can use for development and production apps. We will be using PostgreSQL for most of our web-apps.

Fortunately for MacOS X, we can use [postgres-app](https://postgresapp.com/), which provides the database application and a command line interface (CLI) so we can interact with it. To install Postgres.app, download and follow the installation instructions from the website.

Paste this command into the terminal, it's all one line.

```sh
$ sudo mkdir -p /etc/paths.d &&
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

### PSequel

Will allow us to try running different SQL calls on a database. Download it [here](http://www.psequel.com/).

Unzip the zip file and drag the PSequel icon into your `Applications` folder.

### Insomnia

We will be using Insomnia to test making requests to our backend. Download it [here](https://insomnia.rest/download/#mac).

> Note: Download the `Core` version

Double click the downloaded file. It will pop up a new window, then drag the Insomnia Icon to the Applications folder. Close the window when you're done.

### Slack

Is an App that allows us to message and communicate easily. Download it [here](https://slack.com/downloads/osx).

We will use slack every day in class!

Login to the pursuit core workspace, you should have received an email invitation.

### Github setup

* Create an account on github.com if you haven't already. Use your personal email, not pursuit.
* It is best practice to make your github name your first and last name, or something similar. Why? Because future employers will look at your github. Keep it professional. 
* Follow the [guide to generating a new ssh key](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
* Add the key [to your github account](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account)
* Test that everything works with this command:

```bash
ssh -T git@github.com
# Hi jabyess! You've successfully authenticated, but GitHub does not provide shell access.
```

## Wrapping up

Make sure you have everything installed! Go through each item in the list at the beginning of this article. See if you can open or run each one. Ask your instructor if you have any questions!

