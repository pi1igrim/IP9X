'use strict';

// Hoisting

function hoist() {
  console.log(x);
  var x = 1;
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

var arr = [true, 'hello', 5, 12, -200, false, false, 'word', { name: 'Marcus' }, new Date(), Date.now(), undefined, null];
console.log(arr);

var hash = { number: 0, string: 0, boolean: 0, object: 0, undefined: 0 };

for (const item of arr) {
  const type = typeof (item);
  hash[type]++;
}
console.log(hash);

var hash2 = {};
for (const item of arr) {
  const key = typeof (item);
  hash2[key] = hash2.hasOwnProperty(key) ?
    hash2[key] + 1 :
    1;
}
console.log(hash2);