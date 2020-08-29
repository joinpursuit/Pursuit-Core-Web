# Read and Write files with Node.js

## Objectives

Learn about the `fs` module and how it allow us to read, write and modify files, these files can contain text, binary or JSON data.

## Why
As developers we deal with files all the time but how could we do so programmatically? The answer is with the `fs` built-in module. 

The `fs` module allows to
* Create Command Line Application that interact with files
* Save application state to a file. Persist information from our application to the hard disk to load later. For example creating a CLI game where the user is able to save their progress.
* Parse information from file to, filter it, manipulate it or transform into a desired format to solve problems etc.
* Interact the file system in the hard drive of our computer or a server.

The `fs` module is used
* In the server side when saving files that a client uploads. For example the package [`multer`](https://www.npmjs.com/package/multer) uses the `fs` module internally.
* By Webpack on React Apps or by [`nodemon`](https://www.npmjs.com/package/nodemon) to watch for changes in files, so that our app is reloaded with the latest changes (aka hot reloading)
* If you want to feed input from a file to your programs

## Vocabulary

* File System
* `fs` module
* asynchronous
* synchronous
* callback
* promise
* JSON


## RTFM (Read The Manual)

1. [fs module documentation](https://nodejs.org/api/fs.html)

## Lesson

### Setup
* To follow along in this lesson clone the [file-system-exercises repo](https://github.com/Pursuit-Core-6-2/file-system-exercises)
* We don't need to install anything since the `fs` module is a Node.js built-in module

### Reading files

Let's learn how to read the content of a file and save into a variable. 

For this exercise `cd` into folder `lesson-examples/1.readingFile/` of the **file-system-exercise** repo you just cloned

```javascript
const fs = require('fs');

fs.readFile('./my-files.txt', (err, file) => {
  if (err) {
    throw err;
  }

  const content = file.toString();
  console.log(content)
});
```
Copy and paste this script into a file called `read.js` and execute it with node i.e. `node read.js`

### Writing files

In the example folder `lesson-examples/2.writingFile/` copy the following into a filed called `write.js`

```javascript
const fs = require('fs');

fs.writeFile('./message.txt', 'Hello World!', (err) => {
  if (err) {
    throw err;
  }
});
```

When you execute `node write.js` our script will create a file `message.txt` with our content inside. If the file already exists its content will be overwritten.

If I want to write more at the end of the file:

```javascript
// append.js
const fs = require('fs');

fs.appendFile(
  './message.txt',
  ' I\'m a Web Developer',
  (err) => {
    if (err) {
      throw err;
    }
  }
);
```

### Reading JSON files

One of the best ways to exchange information between applications written in different languages is to use the JSON (JavaScript Object Notation) format.
We read and write JSON files in the same way we do any other files, the only difference will be that when writing we want to save the data in the JSON format so we `JSON.stringify()`, and when reading we want to parse the JSON data into a JavaScript Object so we `JSON.parse()` it.

**Example:**

In the `lesson-examples/3.readingJSON/` folder of the exercises we have `student.json` file with the following content.

```JSON
{
    "name": "Sara",
    "age": 23,
    "gender": "Female",
    "department": "History",
    "car": "Honda"
}
```

To read this file we do

```javascript
const fs = require('fs');

fs.readFile('student.json', (err, data) => {  
    if (err) {
      throw err;
    }
    const student = JSON.parse(data);
    console.log(student);
});

console.log('This is after the read call, but executed FIRST!');
```

Another approach is to use the global require method to read and parse JSON files. This is the same method you use to load Node modules, but it can also be used to load JSON.

```javascript
var jsonData = require('./student.json');

console.log(jsonData);  
```

It works exactly like the readFile code above, but it is a globally available method that you can use anywhere, which has its advantages.

However there are a few drawbacks of require function:

* Require is _synchronous_ function and is called only once, which means the calls receive a cached result. If the file is updated you **can't re-read it** using this method
* Your file must have `'.json'` extension, so it can't be as flexible. Without the proper extension require doesn't treat the file as JSON file.


### Writing JSON files

```javascript
const fs = require('fs');

const student = {
  name: 'Mike',
  age: 23,
  gender: 'Male',
  department: 'English',
  car: 'Honda'
};

const data = JSON.stringify(student, null, 2);

fs.writeFile('mike-the-student.json', data, (err) => {
  if (err) {
    throw err;
  }
  console.log('Data written to file');
});

console.log('This is after the write call??');
```

Were we using `JSON.stringify(student);` we would see this in the file:

```json
{"name":"Mike","age":23,"gender":"Male","department":"English","car":"Honda"}
```

Although this is the data that we wanted to write, the data is in the form of one line of string, which is difficult for us to read. If you'd like the serialized JSON to be human readable, then change the `JSON.stringify` function as follows:

```javascript
const data = JSON.stringify(student, null, 2);  
```

Here we are telling the method to add newlines and a couple of indentations to the serialized JSON. Now if you open the file, you should see the text in following format:

```JSON
{
  "name": "Mike",
  "age": 23,
  "gender": "Male",
  "department": "English",
  "car": "Honda"
}
```

### Async vs Sync versions

Asynchronous means to execute in parallel. It relies on callbacks or promises to handle success or failure of the operation, once it is completed. Synchronous means to block the execution until the operation is finished.

#### Asynchronous API

##### Callback Style
```javascript
const fs = require('fs');

fs.readFile('./student.json', (err, data) => {
  if (err) {
    throw err;
  }
  const student = JSON.parse(data);
  console.log(student);
});

console.log('This is after the read call, but executed FIRST!');
```

##### Promise Style
Same as callback but return promises

```js
// async-await
const fsPromises = require('fs').promises;

// async-await (needs wrapper async function)
const main = async () => {
  try {
    const data = await fsPromises.readFile('./student.json')
    const student = JSON.parse(data)
    console.log('First Read of Student =>')
    console.log(student)
  } catch (err) {
    console.log(err)
  }
}

main()

// .then()-.catch()
fsPromises.readFile('./student.json')
  .then(data => {
    const student = JSON.parse(data)
    console.log('Second Read of Student =>')
    console.log(student)
  })
  .catch(err => {
    console.log(err)
  })

// Note that in asynchronous code the order in which things happens in not guaranteed
```

#### Synchronous API
```javascript
const fs = require('fs');

const content = fs.readFileSync('./student.json')
const student = JSON.parse(content);
console.log('Finished Reading');

console.log(student)

console.log('When does this happen?');
```

⚠️ Important ⚠️ 
* Always use asynchronous in production code, otherwise your program will be very slow.
* await needs to be wrapped in an async function like shown here or in a IIFE as shown [here](https://nodejs.org/api/fs.html#fs_promise_example)


## Other `fs` methods

Reading and writing to files is only the tip of the iceberg of what you can do with the `fs` module. Here are some others:

| Method         | Description                                                                                     | Docs                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `.unlink()`    | Delete a file                                                                                   | [Docs](https://nodejs.org/api/fs.html#fs_fs_unlink_path_callback)                |
| `.copyFile()`  | Copy a file                                                                                     | [Docs](https://nodejs.org/api/fs.html#fs_fs_copyfile_src_dest_mode_callback)     |
| `.open()`      | Open a file for writing, reading or executing. `.writeFile` and `.readFile` use this internally | [Docs](https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback)       |
| `.mkdir()`     | Create a directory                                                                              | [Docs](https://nodejs.org/api/fs.html#fs_fs_mkdir_path_options_callback)         |
| `.rmdir()`     | Delete a directory                                                                              | [Docs](https://nodejs.org/api/fs.html#fs_fs_rmdir_path_options_callback)         |
| `.watchFile()` | Watch for changes on a file                                                                     | [Docs](https://nodejs.org/api/fs.html#fs_fs_watchfile_filename_options_listener) |
| `.chmod()`     | Change the file access permissions for an existing file.                                        | [Docs](https://nodejs.org/api/fs.html#fs_fs_chmod_path_mode_callback)            |

📑 Learn more in the [`fs` module docs](https://nodejs.org/api/fs.html)


## Putting it all together
Give a list of all files like the one in `my-files.txt` with the the following content
```
total 7256
drwxr-xr-x   15 alejandro  staff   480B Aug 29 01:33 .
drwx------@ 125 alejandro  staff   3.9K Aug 29 00:57 ..
-rw-r--r--@   1 alejandro  staff   3.5K Aug 28 20:22 Example1.zip
-rw-------@   1 alejandro  staff    74K Aug 28 20:23 Lab_Results.pdf
-rw-r--r--@   1 alejandro  staff   247K Aug 28 20:23 Pursuit_Fellowship_Hack-Week.jpeg
-rw-r--r--@   1 alejandro  staff   2.0M Aug 28 20:23 Pursuit_Fellowship_Hack-Week.jpg
-rw-r--r--@   1 alejandro  staff   5.6K Aug 28 20:21 README.md
-rw-r--r--@   1 alejandro  staff   376B Aug 28 20:23 es6_object_keys_order.js
-rw-r--r--    1 alejandro  staff     0B Aug 28 20:25 hello
-rw-r--r--@   1 alejandro  staff   361K Aug 28 20:21 k1.png
-rw-r--r--@   1 alejandro  staff   386K Aug 28 20:21 k2.png
-rw-r--r--@   1 alejandro  staff   378K Aug 28 20:21 k3.png
drwxr-xr-x   17 alejandro  staff   544B Aug 28 20:21 photos
-rw-------@   1 alejandro  staff    74K Aug 28 20:24 resume.pdf
-rw-r--r--    1 alejandro  staff     0B Aug 29 01:33 sample album.mp3
```

### v1 Console.log only the filenames
So that you get this
```
Example1.zip
Lab_Results.pdf
Pursuit_Fellowship_Hack-Week.jpeg
Pursuit_Fellowship_Hack-Week.jpg
README.md
es6_object_keys_order.js
hello
k1.png
k2.png
k3.png
photos
resume.pdf
app.js
sample album.mp3
```

### v2 Group by extension
We want to group the files by file extension and save it in `files-ext-map.json` like so:

```json
{
  "zip": [
    "Example1.zip"
  ],
  "pdf": [
    "Lab_Results.pdf",
    "resume.pdf"
  ],
  "jpeg": [
    "Pursuit_Fellowship_Hack-Week.jpeg"
  ],
  "jpg": [
    "Pursuit_Fellowship_Hack-Week.jpg"
  ],
  "md": [
    "README.md"
  ],
  "js": [
    "es6_object_keys_order.js"
  ],
  "png": [
    "k1.png",
    "k2.png",
    "k3.png"
  ],
  "mp3": [
    "sample album.mp3"
  ]
}
```

<details>

<summary> Solution </summary>

```js
const fs = require('fs')

fs.readFile('./my-files.txt', (err, data) => {
  if (err) throw err
  let list = data.toString()
  let files = list.split('\n')

  let extensions = {}
  for (let file of files) {
    let fileSplit = file.split(' ')
    let ext = fileSplit[fileSplit.length - 1].split('.')[1]
    if (ext) {
      extensions[ext] = []
    }
  }

  for (let file of files) {
    let fileSplit = file.split(' ').filter(elem => elem !== '') // More elegant and simpler with regex file.split(/\s+/)
    let fileName = fileSplit.slice(8).join(' ') // The 9th column is where the name starts
    let ext = fileName.split('.')[1]

    if (ext) {
      extensions[ext].push(fileName)
    }
  }

  fs.writeFile('./files-ext-map.json', JSON.stringify(extensions, null, 1), (err, data) => {
    if (err) throw err
    console.log('Finished Writing File')
  })
})
```
</details>

## Exercises

Complete all exercises in [file-system-exercises](https://github.com/Pursuit-Core-6-2/file-system-exercises)
