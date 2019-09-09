# Common, *NON-React* patterns

Here are some common, generic javascript design patterns. These are useful to know / flaunt especially during job interviews. It should be noted that a lot of these patterns are not specific to javascript - but to software engineering in general. However, the examples presented below will be discussed specifically in relation to javascript and its capabilities.

## The Constructor Pattern

The constructor pattern is used to create and extend new javascript objects.

```js

class MyObject {
	constructor() {
		this.instanceVar1 = 1;
	}
	someMethod() {
		console.log('hi')
	}
}

class YourObject extends MyObject {
	someMethod() {
		super.someMethod();
		console.log('hello');
	}
}

const o = new MyObject();
o.someMethod(); // hi

const p = new YourObject();
p.someMethod(); // hi hello
```

**PROS**

* Memory conservation: when we create objects with the constructor pattern, we are populating the **prototype**. As such, methods are created once **regardless** of how many instances are defined (essentially when the object is defined).
* If the prototype is updated, instances of the object defined **prior** to prototype mutation will still be able to reflect the updated prototype

**CONS**

* Must used **new** keyword to instantiate, with grave consequences upon failure
* Not super functional

**[More Info](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#constructorpatternjavascript)**

## The Module Pattern

The module pattern is a popular pattern in javascript that allows us to achieve encapsulation and namespacing for a collection of variables and functions. It is worth noting that the module pattern is similar to the Factory pattern with the main distinction that the Factory pattern will return new instances of an object whereas the Module pattern will always return a single instance of an object (that will be leveraged for the remaining lifecycle of the app).

Let's begin by diving into an example:

```js
const NotificationsManager = (function() {
	const _notifications = []; // this is a private variable
	const _getNumNotifs = () => {
		return _nofitications.filter(n => {
			return n.unread === true
		}).length;
	};
	
	
	return {
		markNotifRed(index) {
			if (_notifications[index]) {
				_notifications[index].unread = false;
			}
		},
		hasNotifications() {
			return _getNumNotifs() > 0;
		}
})();

// ^^^ NOTE how we are wrapped within an IIFE: 
// immediately invoked function expression

// usage
NotificationsManager.hasNotifications();
```


In this example above, our **NotificationsManager** is implemented as a **module**, meaning there is simply **ONE** object that is leveraged to maintain state of the notifications on say, a user's facebook profile. It's worth noting that we cannot create *instances* of the **NotificationsManager** - this is by design and also the reason why we decided to implement the Module pattern and not the Factory pattern; we have no need for multiple instances of the **NotificationsManager**.

Note also that because there is only one **NotificationsManager** object, we do not need to instantiate anything. Instead, it is sufficient for us to wrap the private/public variables and methods into an **IIFE** such that scope is established; then we can simply use the manager as if it were a regular object (since the **IIFE** in this case does return a singular object).

**PROS**

* Provides an interface for protecting private variables and publishing public ones

**CONS**

* Public methods / properties added after instantiation cannot leverage the existing private variables that were established on module definition
* Testing private methods / variables is not possible 

**[More Info](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)**

## Final thoughts

So far, we have reviewed 4 common javascript patterns: the **Factory** pattern, the **Facade** pattern, the **Constructor** pattern, and the **Module** pattern. In reality, there are many more common design patterns that exist - and even the ones discussed above have many variations that are commonly used. It is not necessary to memorize and know about every single different pattern or variable of a pattern - however, it **is** super important to grok what patterns are and why they are useful.

If you are curious, consider Addy Osamni's excellent textbook: **[Essential JS Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/)**.
