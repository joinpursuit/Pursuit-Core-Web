# Intro to NPM

# Topics
- What is NPM?
- Package Dependencies

# Lesson

## What is NPM?

One of the most powerful features of NodeJS is its package management system. You've seen how easy it is to create modules. Thousands of people have taken advantage of this by creating their own modules and sharing them with the world via npm.

npm (which stands for node package manager) is the best way to install, share and distribute those modules (aka packages). You can checkout the [npm website here](https://www.npmjs.com/) and a list of some of the [most popular packages here](https://www.npmjs.com/browse/star).

## Package Dependencies

Often times you will need to install many 3rd Party modules from NPM. There is a special file called `package.json` which will hold all your dependencies. There's two ways package.json can be created.

### npm init

To use npm, begin by creating a new folder and navigating to it with the terminal. Now run the command `npm init`, which will create a `package.json` file in the current folder. The `package.json` file keeps track of all of the packages you have installed. 

### npm install

To install a package, you need to enter `npm install <name-of-package> --save`, where you replaced <name-of-package> with the specific package you want to install. You can find the package names on the npm website.

This install action will also create your `package.json` if it doesn't exist already.

Let's check out a few npm packages:

* [chalk](https://www.npmjs.com/package/chalk)
* [figlet](https://www.npmjs.com/package/figlet)

## package.json file

The `package.json` file is automatically created when you run the  `npm init` command. The `package.json` file basically just keeps track of all of the node modules that you've installed. When you run the `npm install` command with the special `--save` arguement those modules will automatically be saved in your `package.json` file.

## Exercises

* [NPM Exercises](exercise.md)

## Project

* [Create a module](project.md)

## Resources

* [EJS: Installing with NPM](http://eloquentjavascript.net/20_node.html#h_J6hW/SmL/a)
* [NPM - Official Docs](https://docs.npmjs.com/)
