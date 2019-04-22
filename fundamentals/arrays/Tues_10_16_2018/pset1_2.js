/* 2
    @func arrSwapIndex
    @param {array} arr
    @returns {array}
    @desc - given an array, swap the last and first items
            using INDEX only (not using array methods)
            otherwise return string error
    @example - arrSwapIndex([1,2,3,4]);  // [4,2,3,1]
*/

const arrSwapIndex = (arr) => {
  if (arr.length === 0) { return 'This array empty'; }
  const firstElement = arr[0];
  const lastElement = arr[arr.length - 1];

  arr[0] = lastElement;
  arr[arr.length - 1] = firstElement;
  
  return arr;
}

console.log(arrSwapIndex([1,2,3,4]), '[4,2,3,1]');
console.log(arrSwapIndex([1]), '1');
console.log(arrSwapIndex([]), '');