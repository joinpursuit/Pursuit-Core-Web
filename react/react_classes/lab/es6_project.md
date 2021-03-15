# Creating a Universe

* Create ES6 classes for the following items. **Each class should inherit from the class preceding it** using the `extends` keyword.
  - Universe
  - Galaxy
  - Star
  - Planet
  - Continent
  - Land
  - Village
  - Family
  - Person
  - Organ
  - Cell
  - Molecule
  - Atom
* For each of these classes, create an attribute or two. For example, your Universe class might look like this:

```js
class Universe {
  constructor(universeName, universeSize) {
    this.universeName = universeName;
    this.universeSize = universeSize;
  }
};
```
* For each of these classes, utilize `super` and add arguments to the constructor function to make sure that (for example) a Planet belongs to a Star, Galaxy, and Universe with each of their attributes.
* Create an instance of the Atom class. Make sure you can refer to any attribute from any class it inherits from. For example, with an Atom called myAtom belonging to a Universe called "My Big Universe":

```js
console.log(myAtom.universeName);

// => "My Big Universe"
```
* Create a class method on the Atom class called `tellStory`. The Atom should utilize all of its attributes to describe what molecule it belongs to, what cell it's in, what organ, what person, and so on. For example:

```js
console.log(myAtom.tellStory());

// => "This is a positively-charged atom in a carbon molecule. It lives in a muscle cell in the stomach of Peter. Peter belongs to the Peterson family in the village of Troy. The village of Troy is in a green land on the continent of Tropico. The continent of Tropico is on a hot planet orbiting a star that's 3 billion years old. This star is part of the Root Beer Galaxy in My Big Universe."
```
