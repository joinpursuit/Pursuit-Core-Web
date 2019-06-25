// Ternary Operator
// (Conditional) ? True Case : False Case;
const legalBeverage = (age) => {
  let beverage = '';

  if (age >= 21) {
    beverage = 'Beer';
  }
  else {
    beverage = 'Juice';
  }

  return beverage;
}

const legalBeverage2 = (age) => {
  let beverage = age >= 21 ? 'Beer' : 'Juice';
  return beverage;
}

const legalBeverage3 = (age) => {
  return age >= 21 ? 'Beer' : 'Juice';
}

const legalBeverage4 = (age) => age >= 21 ? 'Beer' : 'Juice';


console.log(legalBeverage(15));
console.log(legalBeverage(45));


// --------------

console.log(true ? 'This is true' : 'This is false');
console.log(false ? 'This is true' : 'This is false');

// 1 - Write a function that checks and returns whether params are equal or not.
function equality (param1, param2) {
  if (param1 === param2) {
    return true;
  }
  else {
    return false;
  }
}

const equality2 = (a,b) => a === b ? true : false;

// 2 - Write a function that returns which of two numbers is larger

const largerNum = (a,b) => a > b ? a : b; 


// 3 - Write a function that returns whether a given number is even or odd.
const evenOrOdd = num => num % 2 === 0 ? 'even' : 'odd';

console.log(evenOrOdd(98));

// 4 - Write a function that returns whether a number is negative, positive.
const negativeOrPositive = (num) => num >= 0 ? 'positive' : 'negative';


// -----------------

const sayHello = (username) => {
  username = username ? username : 'Unknown';
  return `Hello my name is ${username}`;
}

console.log(sayHello('Mo'));
console.log(sayHello());

// if ('') {
//   console.log('This is true');
// } else {
//   console.log('This is false')
// }



