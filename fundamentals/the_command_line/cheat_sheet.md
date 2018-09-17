# Cheat Sheet
* Knowing keyboard shortcuts and terminalogy can be extremely helpful. It can greatly speed up the development process. Knowing the
lingo is helpful too. If you sound like a developer, you probably are a  developer :-). 

## Vocabulary
* Operating System (OS)
* Graphical User Interface (GUI)
* Command Line Interface (CLI) = Terminal = Shell
* Folder = directory

## Bash Commands
* `pwd` - print working directory
* `cd ..` - go to parent directory (aka up)
* `cd [folder]` - go into folder
* `~` - your home folder
* `ls` - list files and subfolders in current folder
* `touch [filename]` - create a new file
* `mkdir [directory name]` - make a new directory
* `rm [filename]` - remove (delete) a file
* `rm -r [directory name]` - remove (recursively) a folder, all files, subfolder, subfiles, etc. Will prompt if trying to remove special files.
* `mv [filename] [foldername]` - move a file to a different folder
* `mv [filename] [new filename]` - rename a file
* `atom [filename]` - open the atom editor
* `atom .` - Opens atom editor at place of path
* `ctrl` + `a` - go to the beginning of Line
* `ctrl` + `e` - go to the end of Line
* `ctrl` + `k` - delete to end of line
* `ctrl` + `u` - delete to front of line
* `ctrl` + `w` - cut to previous word
* `ctrl` + `y` - paste terminal buffer
* `npm list -g --depth 0` - To see which packages are installed globally


## Atom Shortcuts 

`cmd` + `LArrow` : Go to beginning of a line

`cmd` + `RArrow` : Go to end of a line

`cmd` + `/` : Toggle line/selection comment

`cmd` + `f` : Search within file

`cmd` + `shift` + `f` : Search within project

`ctrl` + `k` : Delete everything after the cursor on the same line

`ctrl` + `shift` + `k` : Delete current line

`cmd` + `ctrl` + `UArrow/DArrow` : Move current line up/down

`cmd` + `d` : Select current word (repeat to select multiples of the same word)

`cmd` + `click` : Place multiple cursors

`cmd` + `shift` + `d` : Duplicate a line

`cmd` + `t` : Search for file by name within project

`ctrl` + `g` : Go to line number

`cmd` + `\` : Toggle tree-view sidebar

`cmd` + `enter` : Add newline after current line

`cmd` + `shift` + `enter` : Add newline above current line

`cmd` + `g` : Find next

`cmd + ]` : Indent selection

`cmd + [` : Un-indent selection

`cmd` + `shift` + `p` : Find and run available commands

`ctrl` + `0` : Switch between tree view and text editor

## git commands
* `git help` - For help and documentation
* `which git` - Check for git.
* `git init` - Initialize empty git repo
* `git clone <url>` - Clone and existing Repository
* `git status` - check for changes in your working directory
* `git diff` - Changes to tracked files
* `git add .` - Add all current chnages to next commit
* `git add -p <file>` - Add some changes in <file> to next commit.
* `git commit -a` - Commit all local changes in tracked files. 
* `git commit -m` - make a commit with a messge. 
* `git log` - Show all commits
* `git log -p <file>` - show changes over time for specific file
* `git branch -av` - List all existing branches
* `git checkout <branch>` - Switch HEAD branch
* `git branch <new-branch>` - Create a new branch based on your current HEAD
* `git branch -d <branch>` - delete a local branch 
* `git remote -v` - List all currently configured remotes.
* `git remote add <shortname> <url>` - Add a new remote repository. 
* `git pull <remote> <branch>` - Download changes and directly merge / integrate into HEAD.
* `git push <remote> <branch>` - Publish local changes on remote. 
* `git merge <branch>` - Merge <branch> into current HEAD. 
* `git reset --hard HEAD` - Discard all local changes in your working directory. 
* `git checkout HEAD <file>` - Discard local changes in specific file. 
* `git revert <commit>` - Revert a commit.
* `git reset --hard <commit>` - Reset your HEAD pointer to a previous commit ... and discard all changes since then. 
 

## Tip

* Use tab to autocomplete. for example, if the current folder has subfolders titled `games`, `photos` and `photography`, typing `pho` and pressing the tab key will result in displaying `photo` and `photography`. If we then type the letter `g` to get `photog`,and press the tab key - the command will be autocomplete to `photography`.

* You can also use the up and down keys to step through the commands typed before.

## Resources 
* [git tower](https://www.git-tower.com/blog/git-cheat-sheet)
