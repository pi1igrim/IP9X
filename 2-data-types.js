'use strict';

// Hoisting

function hoist() {
  /* eslint-disable no-use-before-define */
  console.log(x);
  /* eslint-enable no-use-before-define */

  /* eslint-disable no-var */
  var x = 1;
  /* eslint-enable no-var */
}
hoist();

// Scalar value vs Reference

function inc(n) {
  return parseInt(n);
}
const a = 5;
const b = inc(a);
console.log({ a, b });

function inc2(num) {
  num.n = 1;
}
const obj = { n: 5 };
inc2(obj);
console.dir(obj);

// Types

const arr = [true, 'hello', 5, 12, -200, false, false, 'word',
  { name: 'Marcus' }, new Date(), Date.now(),
  undefined, null, NaN];
console.log(arr);


const hash = { number: 0, string: 0, boolean: 0, object: 0, undefined: 0 };

for (const item of arr) {
  const type = typeof(item);
  hash[type]++;
}
console.log(hash);

const hash2 = {};
for (const item of arr) {
  const key = typeof(item);
  /* eslint-disable no-prototype-builtins */
  hash2[key] = hash2.hasOwnProperty(key) ?
    hash2[key] + 1 :
    1;
  /* eslint-enable no-prototype-builtins */
}
console.log(hash2);
