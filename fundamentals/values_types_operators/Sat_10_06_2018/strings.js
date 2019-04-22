// Multi Variable Declaration
let a, b, c = 4;
console.log(a, b, c);


// Twitter Handle url example
let twitter_handle = 'realdonaldtrump'
const twitter_url = 'https://twitter.com/';
console.log(twitter_url + twitter_handle);

const someString = 'Hello, '+ twitter_handle + ', get off twitter.';

console.log(someString);
const lebrons_height_feet = 6;
const lebrons_height_inches = 8; 

const lebrons_height = lebrons_height_feet + ' ft ' + lebrons_height_inches + ' in';
console.log(lebrons_height);

// String Interpolation
const to = 'Dad';
const from = 'Mo';

const letter = `Dear `+ to + `,


I am writing from Pursuit. I hope you're well.

Sincerely,` + from;

console.log(letter);


const letter2 = `Dear ${to},


I am writing from Pursuit. I hope you're well.

Sincerely,
${from}`;

console.log(letter2);


// -----------------

const x = 300 * 45 + 22;

// -----------------

let message = 'Hello';

message = message + ' world';

console.log(message);
