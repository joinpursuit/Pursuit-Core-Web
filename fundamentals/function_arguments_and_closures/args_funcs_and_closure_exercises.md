# Exercises 

1. Create two functions: `double` and `square`. 
`double` should take a number and return the number times two. 
`square` should take a number and return the number squared. 

 * Create a third function `doubleSquare` that uses both of the functions to return a number that is first doubled and then squared.
 
2. Create a function `classyGreeting` that takes as input the strings `firstName`  and `lastName`,
and returns a string with a greeting using the two. 

  * Create a second function `yell`  that takes string as input and returns the string in all capitalized letters.
  * Create a third function  `yellGreeting`  that will take the `firstName`  and `lastName`  as inputs and yell a greeting using the two.
  
3. The [concat](https://www.w3schools.com/jsreF/jsref_concat_array.asp) array method is used to merge two (or more) arrays. 
Write a `removeDupes` function that takes an array as an argument and returns a copy without any duplicate elements. 
Then, write a function `concatAndRemoveDupes`  that combines two arrays and removes any duplicates.

  _Hint:_ Use the array method `includes`, an object, or a Set. Or the spread operator instead of concat.  

4. Given a list of grades, we can get the median grade by sorting the list and taking the middle element, or the average of the two middle elements. 
Create the functions `sort` and `middleElement`, and then use them to create the functions `median`.

let grades = [91, 85, 100, 92, 88];

console.log(median(grades)); // Should log 91

5. Write a function called `repeat` that takes in a string and numberOfTimes. The function should log to the screen the string however 
many times as numberOfTimes. If the user does not enter a numberOfTimes it should default to 2. 

6. Using the spread operator, write a function that can take any number of arguments and return the sum of all of them. 

7. Write a function called `adder` takes in one number and returns a function that will add that number with another number. 
Using `adder` create an `add5` and an `add9` function. Hint: Closures!
