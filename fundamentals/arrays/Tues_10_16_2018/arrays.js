// Why arrays?
// - A set of information
// You're grouping some things in common


let names = ['Mo', 'Taq'];
names.push('John');

console.log(typeof names);
console.log('Length of my array: ', names.length);
console.log('The first Element: ', names[0]);
console.log('The second Element: ', names[1]);
console.log('The third Element: ', names[2]);

const firstElement = names[0];
console.log('First letter of first element', names[0][0] );

const numbers = [];
console.log('Length Righ Now: ', numbers.length);
numbers.push(5);
numbers.push(10);
console.log('Length Righ Now: ', numbers.length);
console.log(numbers);

// Pop removes the LAST element of the array. And returns it 
numbers.pop();
console.log(numbers);
numbers[0] = 9;
console.log(numbers);
numbers.unshift(7);
console.log(numbers);
numbers.shift();
console.log(numbers);

// Javascript Arrays can contain different datatypes
const arr = [ 1, 2, 5, 'Hello', 'World', 4.5 ];
console.log(arr);

arr[10] = 'omg';
console.log(arr);
arr[7] = 'lol';
console.log(arr);
arr.push(100);
console.log(arr);
console.log(arr[6]);
console.log(arr.length);

arr.push(function sayLol(lol) {
  console.log(lol);
})

console.log(arr);

arr[12]('LOL ;]');


// Comparing Arrays
const num1 = [ 1, 2, 3, 4, 5];
const num2 = [ 1, 2, 3, 4, 5];
console.log(num1 === num2);
console.log([ 1, 2, 3] === [ 1, 2, 3]);


// Slicing Arrays
console.log(num1.slice(2, num1.length)); // 3, 4, 5
console.log(num1);

