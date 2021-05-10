/*
  Warmup Questions & Tasks
  ------------------------
  Answer the following questions and/or complete the tasks.

  - Is the `.push()` method destructive or non-destructive? Why?
  - Before running the code, what do you expect the `coffee` and `prices` variables to be when logged to the console?
  - Right now the price is being reduced from the `prices` array but not the coffee array. Update the code so that the related price in `coffee` is also changed.
*/

let coffee = [
  ["Ethiopia", "Desta Gola"],
  ["Peru", "Espíritu Cusco"],
  ["Ethiopia", "Wolde Hirbe Natural"],
  ["Colombia", "Yomar Quinlindo Micro Lot 2"],
];
let prices = [9.99, 13.5, 11.99, 10.99];

coffee[0].push(prices[0]);
coffee[1].push(prices[1]);
coffee[2].push(prices[2]);
coffee[3].push(prices[3]);

// Reduce the price by $1.
prices[0] -= 1;

console.log(coffee, prices);
