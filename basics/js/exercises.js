/*
Write a program that uses console.log to print all the numbers from 1 to 100, with two exceptions. 
For numbers divisible by 3, print "Fizz" instead of the number, and for numbers divisible by 5 (and not 3), print "Buzz" instead.
print "FizzBuzz" for numbers that are divisible by both 3 and 5.
*/

function fizzBuzz() {
  for (let i = 1; i < 101; i++) {
    if (i % 15 == 0) {
      console.log("FizzBuzz");
    } else if (i % 3 == 0) {
      console.log("Fizz");
    } else if (i % 5 == 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
}

/*
Write a program that creates a chessboard, an N×N grid, using newline characters to separate lines. 
At each position of the grid there is either a space or a "#" character. 
*/
function printRow(size, rowNum = 0, fill, space) {
  const evenPattern = space + fill;
  const oddPattern = fill + space;

  let rowStr = "";
  if (rowNum % 2 == 0) {
    // console.log("evenRow");
    // for (let i = 0; i < size; i++) {
    //   rowStr += i % 2 == 0 ? emptyCell : filledCell;
    // }
    for (let i = 0; i < size / 2; i++) {
      rowStr += evenPattern;
    }
    console.log(rowStr);
  } else {
    // console.log("oddRow");
    // for (let i = 0; i < size; i++) {
    //   rowStr += i % 2 == 0 ? filledCell : emptyCell;
    // }
    for (let i = 0; i < size / 2; i++) {
      rowStr += oddPattern;
    }
    console.log(rowStr);
  }
}

function printBoard(size, fill = "◻︎", space = " ") {
  for (let i = 0; i < size; i++) {
    printRow(size, i, fill, space);
  }
}

/*
Write a range function that takes two arguments, start and end, and returns an array containing all the numbers from start up to (and including) end.
Next, write a sum function that takes an array of numbers and returns the sum of these numbers.
*/
function range(start, end) {
  if (start > end) {
    throw "start slowly!";
  }

  let nums = [];
  for (let i = start; i <= end; i++) {
    nums.push(i);
  }

  return nums;
}

function sum(nums) {
  return nums.reduce((acc, curr) => acc + curr, 0);
}

/*
For this exercise, write two functions. 
1 - reverseArray, takes an array as argument and produces a new array that has the same elements in the inverse order.
2 - reverseArrayInPlace, does what the reverse method does: it modifies the array given as argument by reversing its elements. 

Neither may use the standard reverse method.
*/

function reverseArray(arr) {
  if (arr.length == 0) {
    return [];
  }

  let tmp = [];
  len = arr.length;
  for (let i = 0; i < len; i++) {
    tmp[i] = arr[len - 1 - i];
  }

  return tmp;
}

function reverseArrayInPlace(arr) {
  if (arr.length == 0) {
    return arr;
  }

  let start = 0;
  let end = arr.length - 1;

  while (start < end) {
    let temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;

    ++start;
    --end;
  }
}

/*
Use the reduce method in combination with the concat method to “flatten” an array of arrays into a single array that has all the elements of the original arrays.

let arrays = [[1, 2, 3], [4, 5], [6]];
*/

function flatten(arr) {
  return arr.reduce((acc, curr) => {
    return [...acc, ...curr]; // or acc.concat(curr);
  }, []);
}

/*

    *    
   ***
  *****
 *******   
********* 



*/

function drawTriangle(h) {
  let lastRow = 2 * h - 1;
  let e = Math.floor(lastRow / 2);
  let f = 1;
  for (let level = 0; level < h; level++) {
    let rowStr = "";

    let partial = "";
    for (let i = 0; i < e; i++) {
      partial += " ";
    }
    rowStr += partial;

    partial = "";
    for (let i = 0; i < f; i++) {
      partial += "*";
    }
    rowStr += partial;

    partial = "";
    for (let i = 0; i < e; i++) {
      partial += " ";
    }
    rowStr += partial;

    console.log(rowStr);
    --e;
    f += 2;
  }
}

/******* CALLS *******/
/*********************/

// fizzBuzz();

// printBoard(10);

// console.log(sum(range(1, 3)));

// console.log(reverseArray([1, 3, 5, 7, 9]));
// const evens = [2, 4, 6, 8];
// reverseArrayInPlace(evens);
// console.log(evens);

// let arrays = [[1, 2, 3], [4, 5], [6]];
// console.log(flatten(arrays));

drawTriangle(10);

// find the most frequent letter in a string
function mostFrequentLetter(str) {
  str = str.toLowerCase();
  const mostFreqEntry = { letter: "", count: 0 };
  const letterFrequencies = new Map();

  for (const letter of str) {
    // Check if the character is already in the map
    if (letterFrequencies.has(letter)) {
      newFreq = letterFrequencies.get(letter) + 1;
      if (newFreq > mostFreqEntry.count) {
        mostFreqEntry.letter = letter;
        mostFreqEntry.count = newFreq;
      }
      letterFrequencies.set(letter, newFreq);
    } else {
      letterFrequencies.set(letter, 1);
    }
  }
  console.log(letterFrequencies);
  console.log(mostFreqEntry);
}

mostFrequentLetter("ABCDE");
