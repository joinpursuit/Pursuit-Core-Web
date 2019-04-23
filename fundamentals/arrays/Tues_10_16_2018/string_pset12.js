/* 12
    @func strMasher
    @param {string} str1
    @param {string} str2
    @returns {string}
    @desc - given two strings, str1 and str2, return a new string
            with str2 mashed into the middle of str1
    @example - strMasher('help', 'me'); // "hemelp"
    @example - strMasher('hello', 'wrold'); // "helwroldlo"
*/

const strMasher = (str1, str2) => {
  const middleIndex = Math.ceil(str1.length / 2);

  const firstHalf = str1.slice(0, middleIndex);
  const secondHalf = str1.slice(middleIndex, str1.length);

  return firstHalf + str2 + secondHalf;
}


console.log(strMasher('help', 'me'), 'hemelp');
console.log(strMasher('hello', 'wrold'), 'helwroldlo');

// console.log('help'.slice(0,2));