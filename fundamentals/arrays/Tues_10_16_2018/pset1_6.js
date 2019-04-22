/* 6
    @func getMiddleItem
    @param {array} arr
    @returns {object} 
    @desc - given an array, return the middle element.
            If the array is even in length, return the 
            first "middle item"
    @example - getMiddleItem([1,2,3,4,5,6,7]);  // 4
    @example - getMiddleItem([1,2,3,4,5,6,7,8]);  // 4
*/

const getMiddleItem = (arr) => {
  let middleIndex = Math.floor(arr.length / 2);

  if (arr.length % 2 === 0) {
    middleIndex -= 1;
  }

  return arr[middleIndex];
}

const getMiddleItem1 = (arr) => {
  let middleIndex = Math.floor(arr.length / 2);

  if (arr.length % 2 === 0) {
    return arr[middleIndex - 1];
  } 
  else {
    return arr[middleIndex];
  }

}

console.log(getMiddleItem([1,2,3,4,5,6,7]), '4');
console.log(getMiddleItem([1,2,3,4,5,6,7,8]), '4');