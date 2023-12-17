/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
    let num = numbers[0];
    console.log(num);
    numbers.map( (n) => {
        if(n > num ) {
            num = n;
        }
        return num;
    })
    console.log(num);
    return num;
}



findLargestElement([-3, -7, -2, -9, -1]);

module.exports = findLargestElement;    