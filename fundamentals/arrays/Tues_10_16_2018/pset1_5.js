/* 5
    @func getRandomItem
    @param {array} arr1
    @returns {object} 
    @desc - given an array, return one random
            item from the array.
    @example - getRandomItem([1,2,3,4,5,6,7,8]);  // 7
*/

const getRandomItem = arr1 => {
  return arr1[ Math.floor(Math.random() * arr1.length) ];
}

const getRandomItem1 = arr1 => {
  const randomIndex = Math.floor(Math.random() * arr1.length);
  return arr1[randomIndex];
}