# Object Oriented Programming

## Objectives

- Review Classes and Constructor functions
- Understand what Object Oriented Programming is
- Use Object Oriented Programming to build applications

## Resources
- [Mozilla](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS)
- [Scoth.io](https://scotch.io/tutorials/object-oriented-programming-in-javascript)

# 1. Introduction

In previous lessons, we've seen that we can use constructor functions and classes to create objects:

```js
function Dog(name, breed, weight) {
    this.name = name;
    this.breed = breed;
    this.weight = weight;
    this.bark = () => console.log("Woof!")
}
```

```js
class Dog {
  constructor(name, breed, weight) {
    this.name = name;
    this.breed = breed;
    this.weight = weight;
  }
  bark() {
    console.log("Woof!")
  }
}
```

If we need to be making a lot of Dogs for an application that we are building, using either of the methods above will save us time.

# 2. Object Oriented Programming

Object Oriented Programming is the process of using classes to organize code.  Somewhat confusingly, the "object" in Object Oriented Programming refers to a `class` or `constructor function`, not to a JavaScript object.  

We use classes `encapsulate` functionality, which means hiding things that we don't want other people to be able to access easily.  By using classes, we can also modularize our code, and make it so that every class is responsible for its own functionality.  Not using classes to do this can means that your logic becomes distributed over your whole application which can make it harder to read and maintain.


# 3. Creating a simple shopping using Object Oriented Programming

By using Object Oriented Programming, we can compartmentalize functionality into classes that we write to make our code cleaner.  '

Here, we'll put together a shopping app that makes use of a `GroceryItem` class and a `ShoppingCart` class.

We will be able to add and remove items from our cart, see the total price of all of our items, and reset our cart during checkout.

Let's start by putting together a `GroceryItem` class that represents an item.  We have properties for the `name` and the `price`


```js
class GroceryItem {
    constructor(name, price) {
        this.name = name
        this.price = price
    }
}
```

Next, we need a `ShoppingCart` that holds all of our `GroceryItem`s.

```js
class ShoppingCart {
    constructor(items = []) {
        this.items = items
    }
}

```

Now, let's make our cart able to add and remove items:

```js
class ShoppingCart {
    constructor(items = []) {
        this.items = items
    }
    addItem(groceryItem) {
        this.items.push(groceryItem)
    }
    removeItemsWithName(name) {
        this.items = this.items.filter((item) => item.name !== name)
    }
}
```

Then, we can add the ability to log the cart's contents and price:

```js
class ShoppingCart {
    constructor(items = []) {
        this.items = items
    }
    addItem(groceryItem) {
        this.items.push(groceryItem)
    }
    removeItemsWithName(name) {
        this.items = this.items.filter((item) => item.name !== name)
    }
    getTotalSum() {
        let sum = 0
        for (let item of this.items) {
            sum += item.price
        }
        return sum
    }
    logCartContents() {
        console.log("Current Cart Contents:")        
        for (let i = 0; i < this.items.length; i++) {
            console.log(i + 1 + ". " + this.items[i].name)
        }
        console.log(`The total is: $${this.getTotalSum()}`)
    }
}
```

And finally we can add a *method* to checkout:

```js
class ShoppingCart {
    constructor(items = []) {
        this.items = items
    }
    addItem(groceryItem) {
        this.items.push(groceryItem)
    }
    removeItemsWithName(name) {
        this.items = this.items.filter((item) => item.name !== name)
    }
    getTotalSum() {
        let sum = 0
        for (let item of this.items) {
            sum += item.price
        }
        return sum
    }
    logCartContents() {
        console.log("Current Cart Contents:")        
        for (let i = 0; i < this.items.length; i++) {
            console.log(i + 1 + ". " + this.items[i].name)
        }
        console.log(`The total is: $${this.getTotalSum()}`)
    }
    checkout() {
        this.logCartContents()        
        this.items = []
        console.log(`Thank you for shopping!  Your cart has been emptied`)
        console.log()
    }
}
```

We have now built a scaffold that we can use to simulate a store.  Note that our `ShoppingCart` has methods of its own.  
As you write larger programs, it's good to be able to interact with classes in a controlled way.  Having the methods inside the class makes it easy to build onto further, and easier to read.

# 4. Using our Classes to write code

Now that we have our `GroceryItem` and `ShoppingCart` classes, we can write a small function that simulates a shopping experience:

```js
function goShopping() {
    let myCart = new ShoppingCart()
    let apple = new GroceryItem("apple", 1.00)
    let banana = new GroceryItem("banana", 10.00)
    let corn = new GroceryItem("corn", 0.47)
    let donut = new GroceryItem("donut", 2.25)
    myCart.addItem(apple)    
    myCart.addItem(banana)
    myCart.addItem(corn)
    myCart.addItem(donut)
    myCart.removeItemsWithName("donut")
    myCart.checkout()
    myCart.logCartContents()
}

goShopping()
```

Because we built our classes out above, our `goShopping` method is very readable and easy to understand.
