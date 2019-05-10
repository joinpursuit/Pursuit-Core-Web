/* 7
    @func getMedianItem
    @param {array} arr
    @returns {object} 
    @desc - given an array, return the middle element.
            If the array is even in length, return the 
            average of the middle two.
    @example - getMedianItem([1,2,3,4,5,6,7]);  // 4
    @example - getMedianItem([1,2,3,4,5,6,7,8]);  // 4.5
*/

// TOGETHER IN CLASS ATTEMPT WITH EVERYONE'S INPUT
const getMedianItem = (arr) => {
  const middleUp = (arr.length / 2) - 1;
  const middleDown = (arr.length / 2);
  console.log('Middle Up: ', middleUp);
  console.log('Middle Bottom: ', middleDown);

  if (arr.length % 2 === 0) {
    return (arr[middleUp] + arr[middleDown]) / 2;
  }

  return arr[Math.ceil(middleUp)];
}

// console.log(getMedianItem([1,2,3,4,5,6,7]), '4');
// console.log(getMedianItem([1,2,3,4,5,6,7,8]), '4.5');

// SOLUTION
const getMedian = (arr) => {
  const middleIndex = Math.floor(arr.length / 2);

  if (arr.length % 2 === 0) {
    // Even Case
    return (arr[middleIndex - 1] + arr[middleIndex]) / 2;
  }
  else {
    // Odd Case
    return arr[middleIndex];
  }
}

console.log(getMedian([1,2,3,4,5,6,7]), '4');
console.log(getMedian([1,2,3,4,5,6,7,8]), '4.5');



