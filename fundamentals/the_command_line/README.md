# The Command Line Cheat Sheet

## Standards
EF.2.a, EF.2.b, EF.2.c, EF.2.d, EF.3

## Objectives

## Keywords

- Operating System (OS)
- Graphical User Interface (GUI)
- Command Line Interface (CLI) = Terminal = Shell
- Folder = directory
- `pwd` - print working directory
- `cd ..` - go to parent directory (aka up)
- `cd [folder]` - go into folder
- `~` - your home folder
- `ls` - list files and subfolders in current folder
- `touch [filename]` - create a new file
- `mkdir [directory name]` - make a new directory
- `rm [filename]` - remove (delete) a file
- `rm -r [directory name]` - remove (recursively) a folder, all files, subfolder, subfiles, etc. Will prompt if trying to remove special files.
- `mv [filename] [foldername]` - move a file to a different folder
- `mv [filename] [new filename]` - rename a file
- `code [filename]` - open the VSCode editor

## Resources

- Oracle: [CLI versus GUI](https://docs.oracle.com/cd/E19683-01/806-7612/startup-78447/index.html)
- Tree House: [Introduction to the Mac OS X Command Line](http://blog.teamtreehouse.com/introduction-to-the-mac-os-x-command-line)
- Git Tower: [Command Line 101](https://www.git-tower.com/learn/git/ebook/en/command-line/appendix/command-line-101)
- Command Line Cheat Sheet : [Cheat Sheet](https://www.makeuseof.com/tag/mac-terminal-commands-cheat-sheet/)
- Linux command line for beginners : [Beginner tutorial](https://tutorials.ubuntu.com/tutorial/command-line-for-beginners#0)


## What is the terminal?

One way people interact with their operating system (be it Mac OS, Windows, or Linux) is through the Graphical User Interface - or, in short, the GUI. GUIs use graphics, along with a keyboard and a mouse, to provide an easy-to-use interface. They provide windows, pull-down menus, buttons, scrollbars, and icons, enabling the user to interact with the operating system or application.

A command line interface (CLI) enables users to type commands in a terminal or console window to interact with an operating system. Users input commands and (usually) receive responses back from the system.

A note for folks who might ask: We utilize "terminal" and "command line" interchangeably here - they are, basically, the same thing.

## Getting Started

To open the terminal on Mac, open your Applications folder, then open the Utilities folder. Open the Terminal application. Pin it to your dock. You could also use Spotlight to search for `terminal`.

When it’s launched, we see something like this:

```bash
computer:~ user$
```

The `~` symbol stands for your home directory.

## Where We Are

In the console, you are always working in a directory (AKA folder). The terminal's currently selected directory is called the working directory. You can see where you are using `pwd` (AKA "print working directory").

```bash
pwd
```

## Navigation

You can change your directory with cd ("change directory"). If you follow this command with a name, it will move you to that directory. Without an argument, it will take you to your home directory (~).

```bash
cd Downloads
```

I was in my home directory, which contains the a directory called `Downloads`. This is called a _relative path_, because I specified my destination relative to my current directory. In other words, `Downloads` exists inside my home (~) directory. I can provide a full path starting with my home directory (~) like this:

```bash
cd ~/Downloads
```

If you want to navigate “up”, to the directory that contains your current directory, you can use the special name `..`. From the `Documents` directory, this command will take us back up to the home directory.

```bash
cd ..
```

...And we're back home!

### Creating Files and Folders

The `touch` command creates a new file with the provided name. For example:

```bash
touch foo.js
```

Will create a new JavaScript file with the name `foo.js` in the current directory.

The `mkdir` command creates a new folder with the provided name. For example:

```bash
mkdir js
```

Will create a folder named `js`.

## Editing Files and Folders

- The `cp` command creates a copy of a file. For example:

```bash
cp bar foo
```

Will make an exact copy of `bar` and name it `foo`.

- The `mv` command will move a file to a different location or will rename a file. For example:

```bash
mv bar foo
```

Will rename the file `bar` to `foo`. `mv foo ~/Downloads` will move the file `foo` to the `Downloads` directory, but it will not rename it.

- The `rm` command removes a file. For example:

```bash
rm foo
```

Will remove a file named foo in the current directory.

- The `rmdir` command will delete an empty directory. To delete a directory and all of its contents recursively, use `rm -r` instead. Note that **this is extremely dangerous** to do for larger files. Only do it whan you really mean it!

- The mkdir command creates a new directory. For example:

```bash
mkdir music
```

will create a new directory called `Music`.

## Opening Files

To open a file and view its contents, type the name of the app you would like to use to open it. For example, we will use a text editor called **Visual Studio Code** to open a text file:

```bash
code foo.js
```
To open all files in a folder enter the following. 

```bash 
code .
```

The keyword **open** will open a file/folder in the Finder (on Mac) or the GUI-based file manager (on Linux).

## Tips

* Use tab to autocomplete. for example, if the current folder has subfolders titled `games`, `photos` and `photography`, typing `pho` and pressing the tab key will result in displaying `photo` and `photography`. If we then type the letter `g` to get `photog`,and press the tab key - the command will be autocomplete to `photography`.

* You can also use the up and down keys to step through the commands typed before.



