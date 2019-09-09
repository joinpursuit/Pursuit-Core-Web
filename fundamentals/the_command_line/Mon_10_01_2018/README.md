### Describe for me, what a computer is

1. Machine that processes different commands
2. It has a motherboard - a place where essential parts live
3. Takes in input, gives us outputs
4. storage of data
5. displays data


### Terminal

A way for humans / programmers / etc to directly run commands on a computer without an peripherals.

- anything you can do with a mouse or with human interactions, you can do on the terminal
	* opening a file
	* copying a file

### Common Terminal commands

#### List all your files in folder

```
> ls
```

This will list all the files and sub folders in your current directory.

```
> ls -l
```

Display the files/folders in a list

```
> ls -al
```

Alphabetize

```
> ls -ahl
```

Also show sizes in human readable form. **NOTE**: the order does not matter, therefore:

```
> ls -ahl
> ls -hal
```

are exactly the same.

### What folder are you in, anyways?

```
> pwd
```

For example if I have:

```
/Users/taqkarim/Desktop
```

This means:
**Desktop** is *inside* a folder called **taqkarim** which is *inside* a folder called **Users** which is *inside* a folder called **/**, or our **ROOT** folder/directory

### How to change folders tho?

```
> cd
```

```
> cd ..
``` 

means go **UP** to the parent folder.

```
> cd someFolderName
```

means go **INTO** that folder


### Clearing terminal

Press Ctrl+L

### Create a new folder

```
> mkdir [name of folder]
```

This will create a folder in the **present working directory**.

It will **not** transport you inside the new directory

```
> mkdir [folder1] [folder2] ... [folderN]
```

### Create a new file

```
> touch [filename]
```

Please note that you can literally make up any extension that you want. Terminal will create it...however, your **computer** may not know what to do with such a file.

Additionally, ```touch``` will create an **EMPTY** file. BYOC.

### Moving files

```
> mv [fileName] [newName]
```

This will **RENAME** the file

```
> mv [fileName] [FOLDER_NAME/]
```

Note the **/**, this will **MOVE** *fileName* into *FOLDER_NAME/*

### Copying files

```
> cp [fileName] [copiedFileName]
```

This is how we copy an existing file into a new file

```
> cp [fileName] [folderName/copiedFileName]
```

This is how we copy a file into a NEW folder 

```
> cp [folderName/*] [anotherFolderName]
```

This is how we copy ALL the contents of a folder into another **already existing** folder

```
> mkdir someNewFolder
> cp [folderName/*] [someNewFolder]
```

To create a new folder and then copy contents, use `mkdir` in conjunction with `cp`

```
> cp -r [folderName/*] [someOtherFolderName]
```

the `-r` argument will copy **everything**, including subfolders and even *their* subfolders


### removing files/folders (exercise caution tho)

```
> rm [fileName]
```

removes a file

```
> rm -rf [foldername]
```

removes a folder, using the `*` will actually delete **everything** in your current working directory


