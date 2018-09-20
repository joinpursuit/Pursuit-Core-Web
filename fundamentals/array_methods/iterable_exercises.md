# Exercises

__NOTE:__ DO NOT USE THE BUILT IN METHODS WHEN ASKED TO MAKE THEM! 

1. Using Array.prototype add a new method `myForEach` that mimics the behaivor of the built in `forEach`.

2. Use your `myForEach` to add `myMap` to the Array prototype. `myMap` should behave the same as regular `map`. 

3. Write a 'myFilter` that behave's the same as `filter`. 

4. Write a `myEvery`. 

5. Write a `myReduce`. It should use the first element in the array if none is given. 

6. Write a `myTranspose`. This function should transpose a matrix. Exp:
```js
let mtx = [
            [1, 2],
            [3, 4],
            [5, 6]
          ]

mtx.myTranspose();

// => [
        [1, 3, 5],
        [2, 4, 6]
       ]
```

7. Use `myMap` to build a new array where every element is incremented by 10.
8. Use `myMap` to build a new array where every non-string element is converted to an empty string. 
9. Use `myFilter` to get only the even elements in an array.
10. Use `myEvery` to check if all elements in the array are the same. 
11. Use `myReduce` to return the sum of every element in an array. 
12. Use `myMap` to build a new array that doubles each element. Then chain `myReduce` to find the product of all the elements. 
13. Use `myReduce` to find the largest number in an array. 
14. Write a function `elementDivisibleBy` with parameters `divisor` and `arr`.
Use `myFilter` to return a new array of every element of arr that can be evenly divided by divisor.
14. Write a `myJoin` function. 
15. Write a `mySlice` function.
16. Write a function `countZeroes`, which takes an array of numbers as its argument and returns the amount of zeroes that occur in it.
Use reduce.
17. Write a `numberTimesIdx` that uses `map` and multiples each number in the array by it's index. 

Bonus: Write a `myFlatten`. This should take a multi-dimensional array and return it as one array. 
```js
let arr = [1, 2, [3, 4, 5, [6, 7, 8]]]
  arr.myFlatten();
  // => [1, 2, 3, 4, 5, 6, 7, 8]
```
