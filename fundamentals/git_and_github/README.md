# Git and Github

## Standards
EF.4.a: Create GitHub accounts
EF.4.b: Use basic Git commands
EF.4.c: Underestand Git workflow
EF.4.d: Be a proficient GitHub user
EF.4.e: Use frequent, descriptive, small commits

## Objectives

- Understand what _Git_ and _GitHub_ are and why they are important to the development process
- Create a GitHub account
- Create a git repo, add to the repo and push it to GitHub

## Resources

- [Git cheatsheet](http://ndpsoftware.com/git-cheatsheet.html)
- [Try Git](http://try.github.io)
- [Pro Git ebook](https://git-scm.com/book/en/v2)
- [Learn Enough Git To Be Dangerous](https://www.learnenough.com/git-tutorial)
- [Oh Shit, Git!](https://ohshitgit.com/)

## Lesson

A **version control system** (or VCS) provides an automatic way to track changes in software projects, giving creators the power to view previous versions of files and directories, develop speculative features without disrupting the primary codebase, securely back up the project and its history, and collaborate easily and conveniently with others. Think of it like the "Save" feature on a local document, except every time you click "Save", you create a snapshot of your project that you can return to, or share with others, anytime.

In addition, using version control also makes deploying production websites and web applications much easier. The version control system that we (and most developers) use is called **Git**. Git is an open standard that lets individual developers and large organizations alike manage a project as it changes over time.

Let's say Corey and Matt are working on a project together and the code is on Matt's computer. If Matt is out, Corey can't work on the code because it's on Matt's computer. Git and GitHub solve this problem by allowing the code to be stored in the cloud on GitHub and available for download. With GitHub, Matt and Corey's code lives in the cloud so if Matt is out, Corey can easily download the latest code from GitHub and work on it. Corey would also be able to see all the previous versions of code, from when they first started the project to its current state.

### Getting started

The most common way to use Git is via a command-line program called `git`, which lets us transform an ordinary folder into a repository (or repo for short) that enables us to track changes to our project.

The easiest way to check for Git is to start a terminal window and use which at the command line to see if the git executable is already present:

```bash
$ which git
/usr/local/bin/git
```

If the result is empty or if it says the command is not found, it means you have to install Git.

### Set Your Identity

First, a quick clarification. **Git** is the open-source standard that manages the version control for our projects. **GitHub** is one of many options to remotely store your Git projects in the cloud. It's one of the most common and popular websites to do this, but keep in mind - Git and GitHub are not the same.

GitHub uses the email you set in your Git configuration to associate commits to
your GitHub account.

Test if you have your email set by running `git config --global user.email` in
your terminal. If it's blank, type `git config --global user.email "example@email.com"` (where "example" is your GitHub account's associated email) to set it. You will only ever need to run this once. Git
will always use this information for anything you do on your computer.

You won't have to do this much at all, but to set your email for a single repository, simply leave off the `--global` flag.
Run `git config user.email "example@email.com"` inside your repository. Check
that this was set up correctly by typing `git config user.email`. Also check
that the global user was not changed by typing `git config --global user.email`.

### Initializing a Repo

We’ll begin by making a directory with the name `git-test`. To make a directory, or folder, we use the command `mkdir` which is short for _**m**a**k**e **dir**ectory_. Then you will run the command `cd git-test` which _**c**hanges **d**irectory_ (or folder) to the git-test folder we just created. In short:

```bash
$ mkdir git-test
$ cd git-test
```

Now that we're in the folder, we are going to create a [_repository_](https://www.sbf5.com/~cduan/technical/git/git-1.shtml). A Git repository, or "repo", represents a single project managed via Git. Practically, it's a series of Git files living in your top-level folder. These files (invisible by default, but visible with `ls -a`) keep track of each change you make and save in a project.

The way to create a new repository with Git is with the `init` command (short for _**init**ialize_), which creates a special hidden directory where Git stores the information it needs to track our project’s changes.

```bash
$ git init
Initialized empty Git repository in  /home/lev/git-test/.git/
```

We now have a boilerplate Git repo that we can store our files in and track their changes over time 💯.

### Initial Commit

We can check the status of our Git repo by typing `git status`. This will tell us which files, if any, have changed since we last updated our Git repo. Check out what happens when we type `git status`:

![001](screenshots/001.png)

We see here that the README.md file is “untracked”, which means Git doesn’t yet know about it. We can add it using the `git add` command:

```bash
$ git add .
```

Here the `.` tells Git to add **all** untracked files from the current folder (even if, in this case, there’s only one) to the repo, thereby updating the status of each file in the repo. Now if we write `git status` again:

![002](screenshots/002.png)

As implied by the word _unstage_, the status of the file has been promoted from untracked to _staged_, which means the file is ready to be _committed_ to the repository. Untracked / unstaged and staged are two of the four states commonly used by Git.

![git status sequence](assets/git_status_sequence.png)

After adding changes in the staging area we can make them part of the local repository by _committing_ them using `git commit`. We also add the command-line option `-m` to include a message indicating the purpose of the commit. **Commit messages are very important because it tells your collaborators what you changed!** They should be short and clear. If your commit message is multiple sentences, you are probably committing _too much_ and should be committing more often. The preference for commit message is **present-tense**, imperative-style. Example of verbs to use: create, merge, update, delete, refactor, extract, fix

For our example, the purpose is to initialize the new repository, which we can indicate as follows:

```bash
$ git commit -m "initialize repo"
[master (root-commit) 38aeeb2] initialize repo
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 README.md
```

At this point, we can use `git log` to see a record of our commit:

```bash
$ git log
commit 38aeeb24b51e4a01a61e1095e1f0efe38b137104
Author: lizraeli <leo2002b@yahoo.com>
Date:   Tue Oct 3 18:40:20 2017 -0400

    initialize repo
```

The commit is identified by a unique string of letters and numbers that Git uses to label the commit and which lets Git retrieve the commit’s changes.

### Viewing the diff

It’s often useful to be able to view the changes represented by a potential commit before making it. To see how this works, let’s add a little bit of content to `README.md` by redirecting the output of `echo`:

```bash
$ echo "hello world" > README.md
```

The `git diff` shows the difference between the last commit and unstaged changes in the current project:

![003](screenshots/003.png)

We can add and commit this change by passing the `-a` option (for “all”) to `git commit`, which arranges to commit all the changes in currently existing files.

```bash
$ git commit -a -m "add content to readme"
[master 092beb2] add content to readme
 1 file changed, 1 insertion(+)
```

**Note that the `-a` option includes changes only to files already added to the repository, so when there are new files it’s important to run `git add .` to make sure they’re added properly.**

Having added and committed the changes, there’s now no diff:

```bash
$ git diff
$
```

In fact, simply adding the changes is sufficient; running `git add -a` would also lead to there being no diff. To see the difference between staged changes and the previous version of the repo, use `git diff --staged`.

We can confirm that the change went through by running `git log`:

![004](screenshots/004.png)

### Adding a Markdown tag

Adding a `#` before the text `hello world` will cause it to appear as a header:

```markdown
# hello, world
```

As before, we’ll run git status and git diff to learn more about what we’re going to commit to Git. The status simply indicates that `README.md` has been modified:

![005](screenshots/005.png)

Meanwhile, the diff shows that one line has been deleted (indicated with -) and another added (indicated with +):

![006](screenshots/006.png)

At this point, we’re ready to commit our changes. Earlier we used both the -a and -m options to commit all pending changes while adding a commit message, but in fact the two can be combined as -am.

```bash
$ git commit -am "Add a # tag"
[master ea24eb6] Add a # tag
 1 file changed, 1 insertion(+), 1 deletion(-)
```

### Adding a line of text

Let's add a blank line followed by our name to `README.md`:

```markdown
# Hello, world

My name is Lev
```

As usual, we can see the changes represented by our addition using `git diff`:

![007](screenshots/007.png)

### GitHub (our remote repository)

Go to [GitHub](https://github.com) and sign up for an account if you have not already done so. GitHub is a great online resource for keeping your code and sharing it with others. So if I wanted to work on one code file and Corey wanted to work on another, we could do so on our own laptops and then _push_ both our changes to GitHub where we would then be able to see what each other has done.

Most engineering teams use GitHub to store their code because it is simple, free, and can be accessed from anywhere in the world. GitHub is an important tool for you to be comfortable with in your new career as a developer.

### Push (to a remote repository)

On the [GitHub home page](https://github.com), click on the green **New Repository** button. In the next screen, give a name to the repository (`git-test`) and click on the green **Create Repository** button. In the following screen, copy the url under **Quick Setup**. It should look like `https://github.com/<user>/git-test.git`, where `<user>` is your username. Now run the following two commands, replacing `<url>` with the one you copied from the github website. Following the second command you may be prompted for your github username and password.

```bash
$ git remote add origin <url>
$ git push -u origin master
```

`git remote add` is doing the same thing as `git add` was doing before but this time we are adding to a _remote repository_, which just means one that is **not** stored locally on our computer. `origin` is a name we give our own computer--you can call this anything you'd like (your name) but the standard name people use is `origin`. Lastly `<url>` is the GitHub url where your repository is located--this is where our _local_ repo will be pushed into.

After establishing our remote repo with `git remote add origin <url>` we `push` our changes to the remote repository on GitHub. This is done by running the command `git push -u origin master`. `git push` takes everything we have locally on our computer and sends it to our remote repo on GitHub. The `-u` adds a tracking reference to the remote repo so we can `pull` or download information from this repo later. And lastly `origin master` is saying we are pushing our current branch to the main remote repo (`origin`) on the master branch.

You can now easily add information to and download information from your remote repo on GitHub.

After executing the first `git push` as shown above, something like the following should appear in your terminal:

```bash
Counting objects: 9, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (9/9), 654 bytes | 0 bytes/s, done.
Total 9 (delta 0), reused 0 (delta 0)
To https://github.com/lizraeli/git-test.git
 * [new branch]      master -> master
Branch master set up to track remote branch master from origin.
```

Now, reload the page on GitHub. It should now look like this:

![008](screenshots/008.png)

### The Readme File

By default, GitHub renders the markdown content of the Readme file in your repository's home folder. Let's create a new file titled `hello.js`, with the following content:

```js
function hello() {
  console.log("hello world");
}
```

The `git status` command should show the `hello.js` file as untracked. Now run the following commands:

```bash
$ git add .
$ git commit -m "add file hello.js"
[master 6254e59] added file hello.js
 1 file changed, 3 insertions(+)
 create mode 100644 hello.js
```

Now we can push the latest commit to our remote repo on the github website:

```bash
$ git push origin master
Username for 'https://github.com': lizraeli
Password for 'https://lizraeli@github.com':
Counting objects: 3, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 323 bytes | 0 bytes/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To https://github.com/lizraeli/git-test.git
   ea24eb6..6254e59  master -> master
```

Refreshing the page on GitHub should show the new file, and clicking on the file will lead to a new screen where the file's code is rendered.

![009](screenshots/009.png)

### Clone

As an example of a common collaboration workflow, we’ll simulate the case of two developers working on the same project, Peter and Lev. Lev will need to add Peter as a collaborator on the remote repository by going to the repo's page and clicking on Settings > Collaborators. Then, Lev will put Peter's GitHub username in the _Add collaborator_ box.

Once Peter gets the notification that he’s been added to the repository, he can go to GitHub to get the repository's URL. This URL lets Peter make a full copy of the repository, including its history, using `git clone`. For now, we will create a `temp` folder in our home directory and `cd` into it.

```bash
(xenial)lev@localhost:~/git-test$ cd ..
(xenial)lev@localhost:~$ mkdir temp
(xenial)lev@localhost:~$ cd temp
(xenial)lev@localhost:~/temp$
```

Now, we can clone our own repo into the temp folder:

```bash
$ git clone <url> git-test
Cloning into 'git-test'...
remote: Counting objects: 12, done.
remote: Compressing objects: 100% (6/6), done.
remote: Total 12 (delta 0), reused 12 (delta 0), pack-reused 0
Unpacking objects: 100% (12/12), done.
Checking connectivity... done.
```

Now we have a copy of our repo has been created in a new `~/temp/git-test` directory. Now, we will `cd` into the directory and modify the `README.md` file:

```markdown
# Test Repo

[our js file](hello.js)
```

The syntax above is a link: the text between the square brackets is the text, and the square between the parentheses is the link itself. Since it does not include `http` or `www` it will be interpreted as a relative link in the current folder, to the file `hello.js`. Now, running `git-diff`:

![010](screenshots/010.png)

We see that the `hello, world` line has been removed, and three new lines have been added. Now we will run `git commit`:

```bash
$ git commit -am "added a link in readme to hello.js"
[master 9fbf058] added a link in readme to hello.js
 1 file changed, 3 insertions(+), 1 deletion(-)
```

And `git push`:

```bash
$ git push origin master
Username for 'https://github.com': lizraeli
Password for 'https://lizraeli@github.com':
Counting objects: 3, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 325 bytes | 0 bytes/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To https://github.com/lizraeli/git-test.git
   6254e59..9fbf058  master -> master
```

### Pull

Going back to the original repo in `~/git-test`, we will run the command `git pull` to get the latest changes:

```bash
~/git-test$ git pull
remote: Counting objects: 3, done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 3 (delta 0), reused 3 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), done.
From https://github.com/lizraeli/git-test
   6254e59..9fbf058  master     -> origin/master
Updating 6254e59..9fbf058
Fast-forward
 README.md | 4 +++-
 1 file changed, 3 insertions(+), 1 deletion(-)
```

Since there are no conflicts with local files, the local ones have been updated. We can see a list of the files changed (just one in this case) and a summary of the changes on the last line.

### Git log

The `git log` command can show the entire commit history of our repo. For each commit, it will show its id, the author, the date, and the commit message. To limit the number of commits we can add the flag `-[number]`: this will show the provided number of commits, from last to first.

![011](screenshots/011.png)

We can also format the output using `--pretty=format:` followed by some arguments. The following show all commits made in an easily readable form.

```markdown
\$ git log --pretty=format:"%h - %an, %ar : %s"
9fbf058 - lizraeli, 34 minutes ago : added a link in readme to hello.js
6254e59 - lizraeli, 70 minutes ago : added file hello.js
ea24eb6 - lizraeli, 4 hours ago : Add a # tag
092beb2 - lizraeli, 4 hours ago : add content to readme
38aeeb2 - lizraeli, 5 hours ago : initialize
```

### Git Branch

When building a larger application (especially when you're working with others), it is important to create different branches to do work on. This way, you won't mess with the main branch (master) while you're building something out like a new feature. It's important to always have a working application, and to not change things that other people on your team could be working on.

To create a new branch type the command: `git checkout -b <new-branch>`. You can change to a different branch by writing: `git checkout <branch-name>`.

Once your feature is fully implemented and everything works, you can then create a **pull request** to merge your branch with master. Simply go:

```bash
$ git push origin <branch-name>
```

And then navigating to your GitHub repo in the browser. You should see a new dialogue to create a pull request. Follow the instructions and submit the pull request.

This lets your collaborators see your branch's changes before they merge it into master.
