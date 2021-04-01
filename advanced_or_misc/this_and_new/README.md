# A First Lesson in Object Oriented JavaScript

Let's talk about how JavaScript objects, inherticance, and classes really work!

# Objectives
- Create constructor functions to solve problems
- Reliably predict `this` binding behavior in code snippets

# A Super Important Note

For this lesson, stick to good old `function` notation instead of using ES6 arrow functions. We'll talk about why this is important at the end of this README!

# The Secret Life of Functions

Every time you create a new JavaScript function, the JavaScript engine gives it a special property named `.prototype`. This property is just an empty object. How boring!

```js
function add(n, m) {
	return n + m
}

console.log(add.prototype) // {}
```

Each function's prototype is a separate object:

```js
function add(n, m) {
	return n + m
}

function subtract(n, m) {
	return n - m
}

console.log(add.prototype === subtract.prototype) // false
```

Only functions have a `.prototype` method:

```js
const name = 'Myra'
const temperatures = [61, 57, 72]

console.log(name.prototype) // undefined
console.log(temperatures.prototype) // undefined
```

# What is this?
`this` is a special JavaScript keyword. It's sort of like a special variable whose value depends entirely on context.
- *What is `this`*? It depend on the context.

Usually, you'll see `this` written inside a function definition:

```js
function Person(name, age) {
	this.name = name
	this.age = age
}
```
*Why is the function name capitalized?!?*
Hold that thought. We'll come right back to that.

There are a few ways for coders to determine what the value of `this` should be inside of a function definition.
One way is to use the `new` operator.

# A whole new world
Usually, when you see the `new` operator in JavaScript, it's in an expression like this:

```js
const myra = new Person('Myra', 27)
```

From the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new), the `new` operator does 4 things:
1. Creates a blank, plain JavaScript object.
1. Adds a property to the new object `.__proto__` that links to the constructor function's prototype object.
1. Binds the newly created object instance as the `this` context (i.e. all references to this in the constructor function now refer to the object created in the first step).
1. Returns `this` if the function doesn't return an object.

Let's walk through what that means for our code example.
1. The expression `new Person('Myra', 27)` starts off as an empty object.
2. This object is given a special property named `.__proto__` which is linked to `Person.prototype`. So `console.log(myra.__proto__ === Person.prototype)` will log `true`.
3. When `Person` is executed, `this` will refer to the empty object created by the `new` operator. Our `Person` function creates a `.name` property and a `.age` propterty on the new object.
4. Because `Person` doesn't return anything, the `new` operator will return `this` (i.e. our new object with `.name`, `.age`, and `.__proto__`). We decided to store this object in the variable named `myra`.

Let's mess around with this object we created:

```js
console.log(myra.name, 'is', myra.age, 'years old') // Myra is 27 years old
console.log(myra.__proto__) // {}
console.log(myra.__proto__ === Person.prototype) // true
```

# Construction sites require hard hats
A constructor function is a JavaScript function whose job is to create objects of a new 'type'. Our `Person` function, for example, creates people! To summarize, constructor functions:

- names are capitalized (this is just a convention, like camelCase for variables)
- are usually called after the `new` keyword
- use the `this` keyword in their definitions to configure a new object
- typically don't have a return value because they are meant to be used with `new`

If you forget to use the `new` keyword with a constructor, you might get burned:

```js
const sadMistake = Person('Oh boy', 0)
console.log(sadMistake) // undefined
console.log(this.name) // Oh boy
```

*Hold up, you just used `this` outside of a function definition. AND `this.name` is 'Oh boy'?!?* I know. This is weird. We'll get back to this, I promise.

# Digging into Arrays and Objects

We've seen some constructor functions already. They are an exciting cast of characters, including: `Array`, `Object`, `Number`, and more!

Don't believe that these are constructor functions? Come at me:

```js
console.log(typeof Object) // function
console.log(typeof Array) // function
console.log(Object.prototype) // Something funky looking that is NOT undefined
console.log(Array.prototype) // Something funky looking that is NOT undefined
```

So know we know at least two ways to create objects and arrays:

```js
// best practice in most cases:
let farenheitTemps = [51, 50, 63, 42]
// another way to create an array:
let celsiusTemps = new Array(15, 9, 2, 23)
console.log(farenheitTemps.__proto__ === Array.prototype) // true
console.log(celsiusTemps.__proto__ === Array.prototype) // true

// best practice in most cases:
let obj1 = {}
// another way to create an object:
let obj2 = new Object()
console.log(obj1.__proto__ === Object.prototype) // true
console.log(obj2.__proto__ === Object.prototype) // true
```

# How the JavaScript Engine Fails Forward

Have you ever wondered what happens inside the JavaScript engine when you call an array method like `.forEach()` ? Where is this function defined? We don't have to define the forEach method for every array we create, so where does it come from?

`.__proto__` holds the key. Here's what happens when we call `celsiusTemps.forEach`:
- JavaScript Engine checks if celsiusTemps has a property named forEach.
- Nope, it doesn't. But JavaScript engine doesn't give up. JavaScript engine checks if `celsiusTemps.__proto__` has a property named `.forEach`
- `celsiusTemps.__proto__` is really just another name for `Array.prototype`, and we know from the [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) that `Array.prototype` does have a `.forEach` property! This is the function that will be called.

The JavaScript engine Fails Forward. Be like the JavaScript engine.

Let's see how this works with a more difficult example:
```js
const myra = new Person('Myra', 27)
console.log(myra.hasOwnProperty('name')) // true
```

Where is the `.hasOwnProperty()` method defined? How does the JavaScript engine know what function to call? This is what happens underneath the hood:

- JS engine checks if `myra` has a method called `.hasOwnProperty`. None is found
- JS engine checks if `myra.__proto__` has a method called `.hasOwnProperty`. None is found
- JS engine checks if `myra.__proto__.__proto__` has a method called `.hasOwnProperty`, and it does! So the JS engine calls this function.

Hmmm... what is `myra.__proto__.__proto__`? Well, we know that `myra.__proto__` is just a different name for `Person.prototype` (because of how the `new` operator works). `Person.prototype` is just a plain old JavaScript object.
From example 2 in the [digging into arrays and objects](#digging-into-arrays-and-objects), we saw that the `.__proto__` property of a JavaScript object is really just `Object.prototype`.
So `myra.__proto__.__proto__` is just `Object.prototype`. 


```js
console.log(myra.__proto__.__proto__ === Object.prototype) // true
```

We know from the good old [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) that `Object.prototype` has a method named `.hasOwnProperty`.

# The __ proto __ chain

As we've seen, the JavaScript Engine attempts to resolve the value of properties and methods by searching sequentially throught the prototype chain. The prototype chain always brings us back to `Object.prototype` in a finite number of steps. This is the end of the line, since `Object.prototype.__proto__ === null`.

Since everything in the prototype chain is an object, and the prototype chain of every JavaScript value leads back to Object.prototype, sometimes people say 'Everything is an object'. This feature of JavaScript is called prototype-based programming, and it's pretty unique! Not very many other languages work this way.

We can use the prototype chain to define our own methods! Check this out:

```js
Person.prototype.greet = function() {
	console.log(`Hi, my name is ${this.name}!`)
}

myra.greet() // Hi, my name is Myra!
```

Did we create a method named `.greet()` on the `myra` object? No. We didn't need to, because `myra.__proto__` now has a `.greet()` method.

# What is this?

It's time to revisit `this`. We saw how it behaves with the `new` operator. Without the `new` operator, `this` will refer to whatever comes before the dot:

```js
const jimmy = new Person('Jimmy', 30)
jimmy.greet() // When greet is called on jimmy, this refers to jimmy
myra.greet() // When greet is called on myra, this refers to myra
```

Pretty neat! Remember our screw up before?

```js
const sadMistake = Person('Oh boy', 0)
console.log(sadMistake) // undefined
console.log(this.name) // Oh boy
```

Without the `new` keyword, `this` refers to whatever comes before the dot. But there is no dot before our call to `Person`. In this case, `this` refers to the global object. In a browser, this is the `window` object. In node it's the global node object.

# Okay what's up with Arrow Functions

Arrow functions are different from old school function expressions because they don't have their own bindings for `this`. What that means is inside an arrow function definition, `this` will refer to whatever `this` is in the surrounding variable scope. Let's look at an example:

```js
function Car(make, model) {
	this.make = make
	this.model = model
}

Car.prototype.honk = function() {
	console.log(`${this.make} ${this.model} says honk!!!`)
}

Car.prototype.beep = () => {
	console.log(`${this.make} ${this.model} says beep!!!`)
}

const myCar = new Car('Ford', 'Fusion')
myCar.honk() // Ford Fusion says honk!!!
myCar.beep() // undefined undefined says beep!!!
```

The arrow function doesn't work as desired here, because `this` will refer to the global object in our JavaScript environment, not the `myCar` object. This is a nuisance here, but sometimes the behavior of arrow functions will be quite useful - particularly when working with React.

# Quiz

## 1. What is logged?
```js
function Dog(name, noise) {
    this.name = name
    this.noise = noise
}

Dog.prototype.changeName(newName) = function() {
    this.name = newName
}

Dog.prototype.greet = function() {
    console.log(`${this.name} says ${this.noise}`)
}

const sullivan = new Dog('Sullivan', 'roof')
sullivan.changeName('Dylan')
sullivan.greet() // What is logged?
```

## 2. What is logged?

```js
function Counter() {
    this.count = 0
}

Counter.prototype.increment = function() {
    this.count++
}

Counter.prototype.decrement = () => {
    this.count--
}

const counter = new Counter()
counter.increment()
counter.increment()
counter.decrement()
console.log(counter.count)
```


## 3. What is logged?

```js
function Counter() {
    this.count = 0
}

Counter.prototype.increment = function() {
    this.count++
}

Counter.prototype.getter = function() {
    return () => {
        return this.count
    }
}

const counter = new Counter()
counter.increment()
const getCount = counter.getter()
console.log(getCount())
```

# Exercise

Let's clone the native Array type!

```js
function MyArray() {
	this.array = {}
	this.length = 0
}

/**
* Creates a new key/value pair inside the array and updates the length property
* @param {any} element - an element to push into the array
* @returns {number} - the updated length of the array
*/
MyArray.prototype.push = function(element) {
	
}

/**
* Removes the last element from the array and updates the length property.
* Edge case: What should happen if pop() is called on an empty array?
* @returns {any} - the value popped off the end of the array
*/
MyArray.prototype.pop = function() {
	
}

const temps = new MyArray()
temps.push(67)
temps.push(72)
temps.push(85)
temps.push(17)

const seventeen = temps.pop()
const eightyFive = temps.pop()
const two = temps.length
```

