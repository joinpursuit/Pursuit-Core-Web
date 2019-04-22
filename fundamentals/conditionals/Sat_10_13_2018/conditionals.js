// 1 - Write a function that checks and returns whether params are equal or not.
function equality (param1, param2) {
  if (param1 === param2) {
    return true;
  }
  else {
    return false;
  }
}

const equality2 = function(param1, param2) {
  if (param1 === param2) {
    return true;
  }
  return false;
}

const equality3 = (param1, param2) => { 
  return param1 === param2;
}

const equality4 = (param1, param2) => param1 === param2;

console.log(equality4('101', 101));


// 2 - Write a function that returns which of two numbers is larger
function isBigger(num1, num2) {
  if (num1 > num2) { 
    return num1; 
  } else {
    return num2;
  }
}

const isBigger2 = (num1, num2) => {
  if (num1 > num2) return num1; 
  return num2;
}

// 3 - Write a function that returns whether a given number is even or odd.
const evenOrOdd = (num) => {
  if (num % 2 === 0) {
    return 'even';
  }
  else {
    return 'odd';
  }
}

const evenOrOdd2 = (num) => {
  if (num % 2 === 0) {
    return 'even';
  }
  return 'odd';
}

// 4 - Write a function that returns whether a number is negative, positive or zero.
const negativeOrPositive = (num) => {
  if (num < 0) { return 'negative'; }
  else if(num > 0) { return 'positive'; }
  return 'zero';
}

// 5 - Write a function that takes in a parameter with either of the three values (e.g. "english", "spanish", "german"). Return "Hello, World" in the given language. It should default to returning English.
function whatLanguage(input = 'english') {
  input = input.toLowerCase();
  if (input === 'english')  return 'Hello World';
  else if (input === 'spanish') return 'Hola Mundo';
  else if (input === 'german') return 'Hallo Welt';
  return 'Hello World';
}

whatLanguage('eNglisH');


// 6 - Write a function that takes in params animalName & numberOfAnimals. Return a string that says either in single or plural form. Eg. "5 cats" or "1 dog". What if we enter sheep, fish, or deer? How do we solve for these solutions?

function numAnimals (animalName, numberOfAnimals) {
  if (numberOfAnimals > 1) {
    return numberOfAnimals + ' ' + animalName + 's';
  } 
  else if (animalName === 'fish' || animalName === 'deer' || animalName === 'sheep') {
    return numberOfAnimals + ' ' + animalName;
  }
  else {
    return numberOfAnimals + ' ' + animalName;
  }
}

const numAnimals2 = (animalName, numberOfAnimals) => {
  let statement = numberOfAnimals + ' ' + animalName;
  
  if (numberOfAnimals !== 1 && (animalName !== 'fish' || animalName !== 'deer' || animalName !== 'sheep')) { statement += 's'; }

  return statement;
}

console.log(numAnimals('cat', 5)); // '5 cats'
console.log(numAnimals('dog', 1)); // '1 dog'
console.log(numAnimals('fish', 10)); // '10 fish'
console.log(numAnimals('sheep', 4)); // '4 sheep'
console.log(numAnimals('deer', 10)); // '2 deer'
