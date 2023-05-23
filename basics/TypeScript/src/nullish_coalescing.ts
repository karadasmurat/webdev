// The nullish coalescing operator is an alternative to ||
// which returns the right-side expression if the left-side is falsy (null, undefined, '', 0, false)

// first || second - if first is "falsy", the second
// 0 || 30 = 30

// first ?? second - if first is "null/undefined", the second
// 0 ?? 30 = 0
// null ?? 30 = 30
// undefined ?? 30 = 30

// speed is a variable of type number, or null, with initial null value:
let speed: number | null = null;

// Option 1 - explicit null check
speed = speed !== null ? speed : 30;
console.log(speed); // 30

let input_0 = 0;
let input_null = null;
let input_undefined = undefined;

// Option 2 - use shortcut ||
speed = input_0 || 30; // since 0 is falsy, speed is now 30!!
console.log(`${input_0} || 30 = `, speed); // 30

// Option 3 - null coalescing operator ??
speed = input_0 ?? 30; // since 0 is not null or undefined, speed is now 0.
console.log(`${input_0} ?? 30 = `, speed); // 0

speed = input_null ?? 30;
console.log(`${input_null} ?? 30 = `, speed); // 30

speed = input_undefined ?? 30;
console.log(`${input_undefined} ?? 30 = `, speed); // 30
