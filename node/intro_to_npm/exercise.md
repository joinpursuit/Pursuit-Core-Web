# Intro to NPM - Exercises

## Chalk

### Setup

- In a new folder `trychalk`, create an `app.js` file.
- In the command line, enter `npm init`, which will begin setting up a `package.json` file. Keep on pressing `<enter>` until it stops asking questions. You should now see a `package.json` file in your folder.
- Enter `npm install --save chalk`. This will install the `chalk` module.
  - In your `package.json`, under `dependecies`, you should see `chalk` followed by a version number.
  - A `node_modules` folder should be created, with a number of sub-folders. These should include the folder for the `chalk` module and a folder for each module that chalk depends on.
- In your `app.js` file, require the `chalk` module. With npm modules, like with the core node modules, you can just enter the name of the module as the string for `require`. You do not need to enter the entire path.
- Read the [chalk module documentation](https://www.npmjs.com/package/chalk)

### Exercises

1. Write a function called `helloBlue` that will console.log the string 'Hello world' in blue.
2. Write a function called `helloRed` that will console.log the string 'Hello world' in red.
3. Write a function called `stringToColor`. It should take two arguments: a string and a color. The function should log the string to the console in the given color. For example, `stringToColor('this is a test', 'red')` woll log  `"this is a test` in red.
4. Write a function called `evensBlueOddsYellow` that takes a string as an argument. It should log all even words in blue and all odd words in yellow. For example, `evensBlueOddsYellow('this is a test')` will log `'this'` in yellow, `'is'` in blue, `'a'` in yellow, and `'test'` in blue.
5. Write a function called `angryText` that takes a string as an argument. It should log that string in red, underlined, and bold capital letters.
6. Write a function called `backgroundCyan` that takes a string as an argument, and logs that string in white font color and cyan background-color (check the chalk documentation to see how to change background colors).
7. Write a function called `boldFirstUnderlineLast` that takes a string as an argument and logs the string, with the first word in bold and the last word underlined.
8. Write a function called `commandLineChalk` that takes the arguments entered in the command line. The function should log out whatever was entered into the terminal, in a color of your choice. Try adding more command line argument options so you can specify the color, background color, etc. **hint**: use `process.argv`.