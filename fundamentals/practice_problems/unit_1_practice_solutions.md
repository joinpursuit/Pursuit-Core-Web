1. 
```js
function equalTo(arg1, arg2) {
  return arg1 === arg2
}
```
2. 
```js
function or(arg1, arg2) {
  return !!(arg1 || arg2)
}
```
3.
```js
function and(arg1, arg2) {
  return (!!arg1 && !!arg2)
}
```

4. 
```js
function printAGrade(numGrade) {
  if(numGrade >= 90) {
    return "A";
  } else if(numGrade >= 80 ) {
    return "B";
  } else if(numGrade >= 70) {
    return "C";
  } else if(numGrade >= 60) {
    return "D";
  } else {
    return "F";
  }
}

```

5. 
```js
function fizzBuz() {
  for(let i = 1; i <= 100; i++) {
    if(i % 3 === 0 && i % 5 ===0) {
      console.log("FizzBuzz")
    } else if(i % 3 === 0) {
      console.log("Fizz")
    } else if(i % 5 === 0) {
      console.log("Buzz")
    } else {
      console.log(i)
    }
  }
}

```
6. 
```js
function getEvens(arr) {
  return arr.filter(el => el % 2 === 0)
}
```

7. 
```js
const sort = arr => {
  return arr.sort((a, b) => a - b)
}

const middleElemnt = arr => {
  if(arr.length % 2) {
    return arr[Math.floor(arr.length / 2)];
  } else {
    let midIdx = arr.length / 2;
     return (arr[midIdx - 1] + arr[midIdx]) / 2
  }
}

const median = arr => (
  middleElemnt(sort(arr))
)
```

8. 
```js
const switchCase = (str) => {
  let output = ""
  for(let i = 0; i < str.length; i++) {
    if(i % 2 === 0) {
      output += str[i].toUpperCase()
    } else {
      output += str[i].toLowerCase()
    }
  }
  return output;
}

switchCase("hello")
```

9. 
```js
function counter(str) {
  let output = {};
  for (let i = 0; i < str.length; i++) {
    let temp = str[i].toLowerCase();
    if(temp === " ") {
      continue;
    }
    if(output[temp]) {
      output[temp]++
    } else {
      output[temp] = 1;
    }
  }
  return output;
}
```

10. 
```js

let arr = [1, 2, 5, 4, 0];

function countZeros(arr) {
  return arr.reduce((acc, el) => {
    if(el === 0) {
      acc++
    } 
    return acc
  }, 0)
}

countZeros(arr)
```

11. 
```js
const isPalindrome = (str) => {
  if (str.length < 2) return false;
  return  str === str.split("").reverse().join("")
}
```
12. 
```js
function includes(arr, target) {
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] === target) {
      return true;
    }
  }
  return false;
}
```
13. 
```js
function getMiddle(str) {
  if (str.length % 2) {
    return str[Math.floor(str.length / 2)]
  } else {
    return str[(str.length / 2) - 1] + str[str.length / 2]
  }
};
```

14. 
```js
const isPalindrome = (str) => {
  if (str.length < 2) return false;
  return str === str.split("").reverse().join("")
}

const palindromeSubstrings = str => {
  let output = [];
  for(let i = 0; i < str.length; i++) {
    for(let j = 0; j <= str.length; j++) {
      let temp = str.slice(i, j)
      if(isPalindrome(temp)) {
        output.push(temp)
      }
    }
  }
  return output
}

```
15. 
```js
function disemvowel(str) {
  let result = "";
  let vowels = ["a", "e", "i", "o", "u"];
  for(let i = 0; i < str.length; i++) {
    if(!vowels.includes(str[i])) {
      result += str[i];
    }
  }
  return result;
}
```
16. 
```js
const targetIndices = (arr, target) => {
  for(let i = 0; i < arr.length; i++) {
    for(let j = i + 1; j < arr.length; j++) {
      if((arr[i] + arr[j]) === target) {
        return [i, j]
      }
    }
  }
}

targetIndices([1, 2, 3, 0, 5, -1], 0)
```

17. 
```js
const rangeWithStep = (min, max, step = 1) => {
  let output = [];
  for(let i = min; i < max; i += step) {
    output.push(i);
  }
  return output;
}

rangeWithStep(4, 33, 5)
```
18. 
```js
function doubler(array) {
  let result = [];
  for(let i = 0; i < array.length; i++) {
    result.push(array[i] * 2);
  };
  return result;
}

```
19. 
```js
const largest = (arr) => {
  return arr.reduce((acc, el) => {
    if(el > acc) {
      return el
    } else {
      return acc
    }
  })
}
```
20. 
```js
const secondLargest = (arr) => {
  let largest = Number.NEGATIVE_INFINITY;
  let second = Number.NEGATIVE_INFINITY;
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] > largest ) {
      second = largest;
      largest = arr[i];
    } else if (arr[i] > second) {
      second = arr[i];
    }
  }
  return second
}
```

21. 
```js
const factors = num => {
  let output = [];
  for(let i = 0; i < num; i++) {
    if(num % i === 0) {
      output.push(i)
    }
  }
  return output
}

factors(15)
```

22. 
```js
const sum = arr => {
  let total = 0;
  for(let i = 0; i < arr.length; i++) {
    total += arr[i]
  }
  return total
}
```

23.
```js
function product(arr) {
  if(arr.length === 0) {
    return 0;
  }
  let product = 1;
  for(let i = 0; i < arr.length; i++) {
    product *= arr[i];
  }
  return product;
}
```

24. 
```js
const getProps = obj => {
  return Object.keys(obj)
}

```
25. 
```js
const getValues = obj => {
  return Object.values(obj)
}

```
26. 
```js
function getAverageAge(arrOfObj) {
  let sum = 0;
  for (let i = 0; i < arrOfObj.length; i++) {
    sum += arrOfObj[i].age;
  }
  return Math.round(sum / arrOfObj.length);
};
```
27. 
```js
  let dummy = arr.slice(0);
  if(amt > 0) {
    for(let i = 0; i < amt % dummy.length; i++) {
      let move = dummy.shift();
      dummy.push(move);
    }
  } else {
    for(let i = 0; i < Math.abs(amt) % dummy.length; i++) {
      let move = dummy.pop();
      dummy.unshift(move)
    }
  }
  return dummy
}
```

28.
```js
const repeat = (str, numberOfTimes = 2) => {
  for(let i = 0; i < numberOfTimes; i++) {
    console.log(str)
  }
}
```
29. 
```js
function noDups(arr) {
  let set1 = new Set(arr)
  return new Array(...set1)
}

```
30.
```js
const removeDupes = (arr) => {
  let set1 = new Set(arr);
  return [... set1]
}

const concatAndRemoveDupes = (arr1, arr2) => {
  return removeDupes([...arr1, ...arr2])
}
```
31. 
```js
function elementDivisibleBy(divisor, arr) {
  return arr.myFilter((el) => {
    return el % divisor === 0
  })
}
```

32. 
```js
function numberTimesIdx(arr) {
  return arr.map((el, i) => {
    return el * i
  })
}
```
33. 
```js
Array.prototype.myFlatten = function() {
  let output = [];
  for(let i = 0; i < this.length; i++) {
    if(Array.isArray(this[i])) {
      output =  output.concat(this[i].myFlatten())
    } else {
      output.push(this[i])
    }
  }
  return output
}
```

34.
```js
Array.prototype.myEach = function (callback) {
  for(let i = 0; i < this.length; i++) {
    callback(this[i]);
  }
  return this;
}
```
35. 
```js
Array.prototype.myMap = function(callback) {
  let output = [];
  this.forEach(el => {
    output.push(callback(el))
  })
  return output
}

```

36. 
```js
Array.prototype.myReduce = function(callback, initialValue) {
    let counter = 0;
    let accumulator;
    if (initialValue === undefined) {
        accumulator = this[0];
        counter = 1;
    } else {
        accumulator = initialValue;
    }
    for (let i = counter; i < this.length; i++) {
        accumulator = callback(accumulator, this[i])
    }

    return accumulator;
}
```
37. 
```js
Array.prototype.myEvery = function(callback) {
  for(let i = 0; i < this.length; i++) {
    if(!callback(this[i])) {
      return false;
    }
  }
  return true;
}
```

38. 
```js
Array.prototype.mySome = function(callback) {
  for(let i = 0; i < this.length; i++) {
    if(callback(this[i])) {
      return true;
    }
  }
  return false; 
}
```
39. 
```js
Array.prototype.myFilter = function(callback) {
  let output = [];
  for(let i = 0; i < this.length; i++) {
    if(callback(this[i])) {
      output.push(this[i])
    }
  }
  return output
}
```
40. 
```js
Array.prototype.myTranspose = function() {
  let grid = [];
  for(let col = 0; col < this[0].length; col++) {
    grid[col] = [];
    for(let row = 0; row < this.length; row++) {
      grid[col][row] = this[row][col]
    }
  }
  return grid
}
```
41. 
```js
Array.prototype.myJoin = function(joiner = ""){
  output = "";
  for(let i = 0; i < this.length; i++) {
    output += this[i]
    if(i !== this.length - 1) {
      output += joiner
    }
  }
  return output
}
```

42. 
```js
String.prototype.mySlice = function(start, end) {
  let slice = "";

  if (typeof end === 'undefined') {
    end = this.length;
  }

  for (let i = start; i < end && i < this.length; i++) {
    slice += this[i];
  }
  return slice;
};
```


