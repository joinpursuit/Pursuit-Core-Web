/* 3
    @func arrSwap
    @param {array} arr
    @returns {array}
    @desc - given an array, swap the last and first items
            using array methods ONLY (not by index)
            otherwise return string
    @example - arrSwap([1,2,3,4]);  // [4,2,3,1]
*/

const arrSwap = (arr) => {
  const firstItem = arr[0];
  const lastItem = arr[arr.length - 1];

  arr.shift(); // We are removing first item
  arr.unshift(lastItem); // We are adding the last item to the beginning
  arr.pop(); // We are removing the last item
  arr.push(firstItem); // We are adding the first item to the end

  return arr;
}

const arrSwap2 = (arr) => {
  const lastItem = arr.pop(); // We are removing the last item, then assigning it
  const firstItem = arr.shift(); // We are removing first item, then assigning it

  arr.unshift(lastItem); // We are adding the last item to the beginning
  arr.push(firstItem); // We are adding the first item to the end

  return arr;
}