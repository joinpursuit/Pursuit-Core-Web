/* 1
    @func longestArr
    @param {array} arr1
    @param {arrar} arr2
    @returns {array}
    @desc - given two arrays return the longest array
    @example - longestArr([1,2,3,4], ['dog', 'cat']);  // [1, 2, 3, 4]
*/

const longestArr = (arr1, arr2) => {
  const lengthArr1 = arr1.length;
  const lengthArr2 = arr2.length;

  if (lengthArr1 > lengthArr2) {
    return arr1;
  }
  else arr2;
}

const longestArr1 = (arr1, arr2) => arr1.length > arr2.length ? arr1 : arr2;